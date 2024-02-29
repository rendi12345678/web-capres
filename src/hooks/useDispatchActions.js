function useDispatchActions({ dispatch, actionTypes }) {
  const setIsAuthorizedAction = (value) => {
    dispatch({
      type: actionTypes.SET_IS_AUTHORIZED,
      payload: value,
    });
  };

  const setErrorsAction = (value) => {
    dispatch({
      type: actionTypes.SET_ERRORS,
      payload: value,
    });
  };

  const setCapresIdAction = (value) => {
    dispatch({
      type: actionTypes.SET_ID,
      payload: value,
    });
  };

  const setAlasanAction = (value) => {
    dispatch({
      type: actionTypes.SET_ALASAN,
      payload: value,
    });
  };

  const setIsLoadingAction = (value) => {
    dispatch({
      type: actionTypes.SET_IS_LOADING,
      payload: value,
    });
  };

  const setFormTypeAction = (value) => {
    dispatch({
      type: actionTypes.SET_FORM_TYPE,
      payload: value,
    });
  };

  const setUserDetailAction = (value) => {
    dispatch({
      type: actionTypes.SET_USER_DETAIL,
      payload: value,
    });
  };

  const setIsOpenUserAuthAction = (value) => {
    dispatch({
      type: actionTypes.SET_IS_OPEN_USER_AUTH,
      payload: value,
    });
  };

  return {
    setIsAuthorizedAction,
    setAlasanAction,
    setCapresIdAction,
    setErrorsAction,
    setUserDetailAction,
    setIsOpenUserAuthAction,
    setIsLoadingAction,
    setFormTypeAction,
  };
}

export default useDispatchActions;
