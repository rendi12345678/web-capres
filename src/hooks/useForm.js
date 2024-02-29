import React from "react";
import Button from "../components/Button";
import useContextHook from "./useContextHook";

function useForm() {
  const { setIsOpenUserAuthAction, setFormTypeAction, formType, recaptchaRef } =
    useContextHook();

  const handleLinkChange = () => {
    const changedFormType = formType === "/login" ? "/sign-up" : "/login";
    setFormTypeAction(changedFormType);
  };

  const renderSubmitButtonText = () => {
    return formType !== "/login" ? "Daftar" : "Masuk";
  };

  const renderLinkButtonText = () => {
    return formType === "/login" ? "Daftar" : "Masuk";
  };

  const renderNavigationForm = () => {
    return (
      <p>
        <span>
          {formType === "/login" ? "Belum punya akun?" : "Sudah punya akun?"}
        </span>{" "}
        <Button
          type="button"
          className="change-form-type-btn"
          handleClick={handleLinkChange}
        >
          {renderLinkButtonText()}
        </Button>
      </p>
    );
  };

  return {
    setIsOpenUserAuthAction,
    renderNavigationForm,
    renderSubmitButtonText,
    recaptchaRef,
  };
}

export default useForm;
