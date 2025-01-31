import React from 'react'
import languages from '../../../../common/languages/languages'
import cockerelLogo from "../../../../images/logo.png";
import CustomButton from "../../../../common/customComponents/CustomButton";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../../../RouteConstants";
import { useForm } from 'react-hook-form';
import "../../signup/styles/signup.scss";


const ResetPassword = () => {
    const langs = languages("useraccount");

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            emailPhoneNumber: "",

        }
    });

    const onResetPassword = (data) => {
        console.log(data);
    }

    return (
        <div className='reset__password'>
            <div className="reset__password__logo">
                <img src={cockerelLogo} alt="cockerelLogo" width={40} height={40} />
                <p>{langs.cockerel}</p>
            </div>
            <div className='reset__password__body'>
                <div className='reset__password__body__info'>
                    <p>{langs.resetPasswordTitle}</p>
                    <p>{langs.resetPasswordText}</p>

                </div>
                <form onSubmit={handleSubmit((data) => onResetPassword(data))} >
                    <div className="inputs">
                        <input type="tel" placeholder={langs.emailOrPhone} {...register("emailPhoneNumber", {
                            required: "Enter email ID or phone number",
                            minLength: { value: 5, message: "Enter a valid email id or phone number" },
                        })} />
                        {errors?.emailPhoneNumber && <p className="error">{errors?.emailPhoneNumber?.message}</p>}
                    </div>


                    <CustomButton title={langs.resetPassword} className="btn" />
                </form>

            </div>

        </div>
    )
}

export default ResetPassword