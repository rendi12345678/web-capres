function useSignUpForm({
  setIsLoadingAction,
  setErrorsAction,
  namaRef,
  passwordRef,
  postData,
  setFormTypeAction,
  recaptchaRef,
}) {
  const submitSignUpForm = async () => {
    try {
      setIsLoadingAction(true);
      const recaptchaValue = recaptchaRef.current.getValue();

      const data = await postData("/sign-up", {
        nama: namaRef.current?.value,
        password: passwordRef.current?.value,
        recaptchaValue,
      });

      if (data.success) {
        setFormTypeAction(data.redirect);
      } else {
        setErrorsAction(data.errors);
      }
    } finally {
      recaptchaRef.current.reset();
      setIsLoadingAction(false);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    submitSignUpForm();
  };

  return { handleSignUpSubmit };
}

export default useSignUpForm;
