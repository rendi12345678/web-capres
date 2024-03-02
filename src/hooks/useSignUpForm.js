function useSignUpForm({
  setIsLoadingAction,
  setErrorsAction,
  namaRef,
  passwordRef,
  postData,
  setFormTypeAction,
  recaptchaRef,
}) {
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const submitSignUpForm = async () => {
    try {
      setIsLoadingAction(true);
      const recaptchaValue = recaptchaRef.current.getValue();

      const data = await postData("/sign-up", {
        nama: namaRef.current?.value,
        password: passwordRef.current?.value,
        recaptchaValue,
        category: "sign-up",
      });

      if (isEmptyObject(data)) return;

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
