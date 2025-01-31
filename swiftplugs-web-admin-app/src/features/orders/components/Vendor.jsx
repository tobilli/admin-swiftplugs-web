import React from 'react';
import "../styles/vendor.scss";
import { useForm } from "react-hook-form";
import CustomInput from '../../../common/customComponents/CustomInput';
import { CustomDropdown } from '../../../common/customComponents/CustomSelect';
import CustomButton from '../../../common/customComponents/CustomButton';
import languages from '../../../common/languages/languages';

function Vendor() {
    const langs = languages("vendor")
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
        },
    });

    const onCreateVendor = async (data) => {
        const payload = {
            fullName: data.fullName,
            userType: data.userType,
            email: data.email,
            phoneNumber: data.phoneNumber,
        }
        console.log("payload...", payload);
        try {
            const response = await postSignup(payload).unwrap()
            console.log("response...", response);


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

    const userOptions = [{ id: "MANAGER", label: "MANAGER" }, { id: "VENDOR", label: "VENDOR" }]
    const userHandler = (event, data) => {
        event.preventDefault();
        setValue('userType', data.label);
    }

    const selectedUserType = watch("userType");

  return (
    <div className='vendor'>
            <div className="vendor__body">
                <p className="title">{langs.addVendor}</p>
                <form onSubmit={handleSubmit((data) => onSignIn(data))} className="vendor__form">
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

                    <CustomButton title={langs.addVendor} className="btn"  />
                </form>
               
            </div>
        
    </div>
  )
}

export default Vendor