import React, { lazy, Suspense } from "react";
import useContextHook from "../hooks/useContextHook";
import useForm from "../hooks/useForm";
import Button from "./Button";
const ReCAPTCHA = lazy(() => import("react-google-recaptcha"));

function Form({ onSubmit, children }) {
  const {
    setIsOpenUserAuthAction,
    renderNavigationForm,
    renderSubmitButtonText,
    recaptchaRef,
  } = useForm();
  const { errors } = useContextHook();
  const siteKey = process.env.REACT_APP_SITE_KEY;

  function onChangeHandler(value) {}

  return (
    <form onSubmit={onSubmit}>
      {children}{" "}
      <Suspense fallback={<p>Loading...</p>}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
          onChange={onChangeHandler}
          style={{ transform: "scale(.7)" }}
        />
      </Suspense>
      {errors &&
        errors.map(
          ({ path, msg }, index) =>
            path === "recaptchaValue" && (
              <p
                key={index}
                className="error-msg"
                style={{
                  textAlign: "center",
                  marginBottom: "5px",
                  marginTop: "0",
                }}
              >
                {msg}
              </p>
            )
        )}
      <div>
        <Button
          type="button"
          className="close-btn"
          handleClick={() => setIsOpenUserAuthAction(false)}
        >
          Keluar
        </Button>
        <Button type="submit">{renderSubmitButtonText()}</Button>
      </div>
      {renderNavigationForm()}
    </form>
  );
}

export default Form;
