import React, { useEffect } from "react";
import languages from "../../../../common/languages/languages";
import swiftplugLogo from "../../../../images/SwiftPlugIcon.png";
import "../styles/signin.scss";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../common/customComponents/CustomButton";
import { useNavigate } from "react-router-dom";
import { AUTH, DASHBOARD } from "../../../../RouteConstants";
import { usePostSigninMutation } from "../../services/userAccountApi";
import CustomInput from "../../../../common/customComponents/CustomInput";
import { removeAccessToken, saveAccessToken } from "../../../../common/session/cookies";
import toaster from "../../../../common/utils/toaster";
import { setUserProfile } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";


const Signin = () => {
    const langs = languages('useraccount');
    const [postSignIn, postSigninProps] = usePostSigninMutation();
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();

    const onSignIn = async (data) => {
        const payload = {
            email: data?.email,
            password: data?.password,
        }

        try {
            const response = await postSignIn(payload).unwrap();
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refresh_token;
            saveAccessToken({accessToken, refreshToken});
            dispatch(setUserProfile(response?.data))
            toaster("success",{
                content: response?.message
            });
            navigate(DASHBOARD.HOME);
        } catch (error) {
            toaster("error",{
                content: error?.data?.message
            })
            console.log("error..", error?.data)
        }
    }

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setValue("email", value);
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setValue("password", value);
    };

    useEffect(()=>{
        removeAccessToken()
    },[])



    return (
        <div className="signin">
            <div className="signin__logo">
            <img src={swiftplugLogo} alt="cockerelLogo" width={300} height={100} />
            </div>
            <div className="signin__body">
                <p className="title">{langs.signin}</p>
                <form onSubmit={handleSubmit((data) => onSignIn(data))} >
                <CustomInput
                        type="email"
                        placeholder={langs.email}
                        register={register}
                        name="email"
                        errors={errors}
                        onChange={handleEmailChange}
                    />

                    <CustomInput
                        type="password"
                        placeholder={langs.password}
                        register={register}
                        name="password"
                        minLength={3}
                        errors={errors}
                        onChange={handlePasswordChange}
                    />
                    <div className="forgotPassword">
                    <p onClick={()=> navigate(AUTH.RESETPASSWORD)}>{langs.forgotPassword}?</p>
                    </div>
                    
                    <CustomButton title={langs.signIn} className="btn" isBusy={postSigninProps.isLoading} />
                </form>
                <div className="donthaveAcct">
                    <p>{langs.dontHaveAccount}</p>
                    <p style={{ cursor: "pointer" }} onClick={() => navigate(AUTH.SIGNUP)}>{langs.registerHere}</p>
                </div>
            </div>
        </div>)
};

export default Signin;