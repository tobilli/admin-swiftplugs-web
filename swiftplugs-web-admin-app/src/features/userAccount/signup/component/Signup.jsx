import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import languages from "../../../../common/languages/languages";
import cockerelLogo from "../../../../images/logo.png";
import CustomButton from "../../../../common/customComponents/CustomButton";
import { AUTH } from "../../../../RouteConstants";
import "../styles/signup.scss"
import { usePostSignupMutation } from "../../services/userAccountApi";
import { CustomDropdown } from "../../../../common/customComponents/CustomSelect";
import CustomInput from "../../../../common/customComponents/CustomInput";

const Signup = () => {
    const langs = languages('useraccount');
    const [postSignup, postSignupProps] = usePostSignupMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        defaultValues: {
            fullName: "",
            userType: "",
            phoneNumber: "",
            email: "",
            password: "",
            currentPassword: "",
        },
    });

    const navigate = useNavigate();

    const onSignIn = async (data) => {
        const payload = {
            fullName: data.fullName,
            userType: data.userType,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password
        }
        console.log("payload...", payload);
        try {
            const response = await postSignup(payload).unwrap()
            console.log("response...", response);
            // navigate(AUTH.SIGNIN);

        } catch (error) {
            console.log("error..", error)
        }
        console.log(data);
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value.replace(/\D/g, "");
        setValue("phoneNumber", value);
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setValue("email", value);
    };

    const handleFullNameChange = (event) => {
        const value = event.target.value;
        setValue("fullName", value);
    };
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setValue("password", value);
    };
    const handleRetypePasswordChange = (event) => {
        const value = event.target.value;
        setValue("currentPassword", value);
    };

    const userOptions = [{ id: "MANAGER", label: "MANAGER" }, { id: "USER", label: "USER" }]
    const userHandler = (event, data) => {
        event.preventDefault();
        setValue('userType', data.label);
    }
    const selectedUserType = watch("userType");

    return (
        <div className="signup">
            <div className="signup__logo">
                <img src={cockerelLogo} alt="cockerelLogo" width={40} height={40} />
                <p>{langs.cockerel}</p>
            </div>
            <div className="signup__body">
                <p className="title">{langs.signup}</p>
                <form onSubmit={handleSubmit((data) => onSignIn(data))} className="signup__form">
                    <CustomInput
                        type="name"
                        placeholder={langs.fullName}
                        register={register}
                        name="fullName"
                        errors={errors}
                        minLength={3}
                        onChange={handleFullNameChange}
                    />
                    <div className="dropdown">
                        <CustomDropdown
                            value={selectedUserType}
                            placeholder={selectedUserType ? selectedUserType : langs.selectUser}
                            OnChange={userHandler}
                            options={userOptions}
                            searchPlaceholder="Search user"
                            style={{ height: "48px", whiteSpace: "nowrap", marginTop: "8px" }}
                            upward={false} floating />

                        {errors?.user && <p className="error">{errors?.user?.message}</p>}
                    </div>

                    <CustomInput
                        type="tel"
                        placeholder={langs.phone}
                        register={register}
                        name="phoneNumber"
                        errors={errors}
                        minLength={11}
                        maxLength={11}
                        onChange={handlePhoneNumberChange}
                    />
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
                        placeholder={langs.createPassword}
                        register={register}
                        name="password"
                        errors={errors}
                        minLength={4}
                        onChange={handlePasswordChange}
                    />
                    <CustomInput
                        type="password"
                        placeholder={langs.retypePassword}
                        register={register}
                        name="currentPassword"
                        errors={errors}
                        minLength={4}
                        onChange={handleRetypePasswordChange}
                    />

                    <p className="terms_condition">{langs.agreeTC} <span>{langs.termsCondition}</span></p>
                    <CustomButton title={langs.signup} className="btn" isBusy={postSignupProps?.isLoading} />
                </form>
                <div className="footer">
                    <p>{langs.haveAccount}</p>
                    <p style={{ cursor: "pointer" }} onClick={() => navigate(AUTH.SIGNIN)}>{langs.signin}</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
