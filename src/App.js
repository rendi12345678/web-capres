import React, { useReducer, createContext, useEffect, useMemo, lazy, Suspense } from "react";
import "./App.css";
import "./styles/reset.css";
import { useCookies } from "react-cookie";
import axios from "axios";

const MemoizedListCapres = React.memo(lazy(() => import("./components/ListCapres")));
const MemoizedHeader = React.memo(lazy(() => import("./components/Header")));
const MemoizedListSuara = React.memo(lazy(() => import("./components/ListSuara")));
const MemoizedListAlasan = React.memo(lazy(() => import("./components/ListAlasan")));
const MemoizedUserAuthentication = React.memo(lazy(() => import("./components/UserAuthentication")));

export const AppContext = createContext();

const initialState = {
  isAuthorized: false,
  isLoading: false,
  formType: "login",
  formValues: {
    nama: "",
    password: "",
  },
  isOpenUserAuth: false,
  userDetail: {
    nama: "",
    pilihanCapresId: "",
    alasan: "",
  },
  errors: [],
  users: [],
};

const actionTypes = {
  SET_IS_AUTHORIZED: "SET_IS_AUTHORIZED",
  SET_FORM_TYPE: "SET_FORM_TYPE",
  SET_FORM_VALUES: "SET_FORM_VALUES",
  SET_IS_OPEN_USER_AUTH: "SET_IS_OPEN_USER_AUTH",
  HANDLE_LOGIN_SUBMIT: "HANDLE_LOGIN_SUBMIT",
  SET_USER_DETAIL: "SET_USER_DETAIL",
  SET_ERRORS: "SET_ERRORS",
  SET_USERS: "SET_USERS",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_AUTHORIZED:
      return { ...state, isAuthorized: action.payload };
    case actionTypes.SET_USER_DETAIL:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          ...action.payload,
        },
      };
    case actionTypes.SET_FORM_TYPE:
      return {
        ...state,
        formType: action.payload,
        isOpenUserAuth: true,
        errors: [],
      };
    case actionTypes.SET_ERRORS:
      return { ...state, errors: action.payload };
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_FORM_VALUES:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    case actionTypes.SET_USERS:
      return { ...state, users: action.payload };
    case actionTypes.SET_IS_OPEN_USER_AUTH:
      return { ...state, isOpenUserAuth: action.payload };
    default:
      return state;
  }
};

const setIsAuthorizedAction = (value) => ({
  type: actionTypes.SET_IS_AUTHORIZED,
  payload: value,
});

const setErrorsAction = (value) => ({
  type: actionTypes.SET_ERRORS,
  payload: value,
});

const setUsersAction = (value) => ({
  type: actionTypes.SET_USERS,
  payload: value,
});

const setIsLoadingAction = (value) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: value,
});

const setFormTypeAction = (value) => ({
  type: actionTypes.SET_FORM_TYPE,
  payload: value,
});

const setFormValuesAction = (value) => ({
  type: actionTypes.SET_FORM_VALUES,
  payload: value,
});

const setUserDetailAction = (value) => ({
  type: actionTypes.SET_USER_DETAIL,
  payload: value,
});

const setIsOpenUserAuthAction = (value) => ({
  type: actionTypes.SET_IS_OPEN_USER_AUTH,
  payload: value,
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isAuthorized,
    formType,
    formValues,
    isOpenUserAuth,
    userDetail,
    errors,
    isLoading,
    users,
  } = state;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const productionServerUrl = "https://lovely-tan-dove.cyclic.app";

  const handleOnchange = (e) => {
    dispatch(setFormValuesAction({ [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoadingAction(true));
      const data = await postData("/login", formValues);

      if (data.success) {
        setCookie("token", data.token, {
          path: "/",
        });
        dispatch(setFormValuesAction({ nama: "", password: "" }));
        window.location.reload();
      } else {
        dispatch(setErrorsAction(data.errors));
      }
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setIsLoadingAction(true));
      const data = await postData("/sign-up", formValues);

      if (data.success) {
        dispatch(setFormTypeAction(data.redirect));
        dispatch(setFormValuesAction({ nama: "", password: "" }));
      } else {
        dispatch(setErrorsAction(data.errors));
      }
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

  const removeCookieToken = () => {
    removeCookie("token", { path: "/" });
    window.location.reload();
  };

  const postData = async (endpoint, data) => {
    const fullUrlString = `${productionServerUrl}/api${endpoint}`;
    try {
      const response = await axios.post(fullUrlString, data);
      return response.data;
    } catch (e) {
      return [];
    }
  };

  const getData = async (endpoint) => {
    const token = cookies.token;
    const fullUrlString = `${productionServerUrl}/api${endpoint}`;

    try {
      const response = await axios.get(fullUrlString, {
        headers: {
          authorization: token,
        },
      });

      return response.data;
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    const getAllUsersData = async () => {
      try {
        dispatch(setIsLoadingAction(true));
        const data = await getData("/users");
        dispatch(setUsersAction(data.users));
      } finally {
        dispatch(setIsLoadingAction(false));
      }
    };

    getAllUsersData();
  }, []);

  const contextValue = useMemo(() => ({
    dispatch,
    setIsAuthorizedAction,
    isOpenUserAuth,
    isAuthorized,
    cookies,
    setCookie,
    formType,
    removeCookieToken,
    handleLoginSubmit,
    getData,
    handleSignUpSubmit,
    setFormTypeAction,
    formValues,
    setFormValuesAction,
    handleOnchange,
    setIsOpenUserAuthAction,
    setUserDetailAction,
    userDetail,
    errors,
    setErrorsAction,
    postData,
    users,
    setIsLoadingAction,
    isLoading,
  }), [dispatch, isOpenUserAuth, isAuthorized, cookies, setCookie, formType, formValues, handleOnchange, handleLoginSubmit, getData, handleSignUpSubmit, removeCookieToken, userDetail, errors, postData, users, isLoading]);

  return (
    <>
      <Suspense fallback={<span className="loader"></span>}>
        <AppContext.Provider value={contextValue}>
          <div className="app-container">
            {isLoading ? <span className="loader"></span> : null}
            <MemoizedHeader />
            <main>
              <MemoizedListCapres />
              <MemoizedListSuara />
              <MemoizedListAlasan />
            </main>
            <MemoizedUserAuthentication />
          </div>
        </AppContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
