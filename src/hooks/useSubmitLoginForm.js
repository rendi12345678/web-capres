function useSubmitLoginForm({
  setIsAuthorizedAction,
  setIsLoadingAction,
  namaRef,
  passwordRef,
  setCookie,
  postData,
  setErrorsAction,
  recaptchaRef,
}) {
  const submitLoginForm = async () => {
    try {
      setIsLoadingAction(true);
      const recaptchaValue = recaptchaRef.current.getValue();

      const data = await postData("/login", {
        nama: namaRef.current?.value,
        password: passwordRef.current?.value,
        recaptchaValue,
      });

      const expirationTimeToken = new Date();
      expirationTimeToken.setMinutes(expirationTimeToken.getMinutes() + 10);

      const expirationTimeRefreshToken = new Date();
      expirationTimeRefreshToken.setDate(
        expirationTimeRefreshToken.getDate() + 7
      );

      if (data.success) {
        setCookie("token", data.token, {
          path: "/",
          expires: expirationTimeToken,
        });
        setCookie("refreshToken", data.refreshToken, {
          path: "/",
          expires: expirationTimeRefreshToken,
        });
        setIsAuthorizedAction(true);
      } else {
        setErrorsAction(data.errors);
      }
    } finally {
      recaptchaRef.current.reset();
      setIsLoadingAction(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    submitLoginForm();
  };

  return { handleLoginSubmit };
}

export default useSubmitLoginForm;
