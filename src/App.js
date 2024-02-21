import axios from "axios";
import React, { Suspense, useEffect, useReducer, useRef } from "react";
import { useCookies } from "react-cookie";
import { SkeletonTheme } from "react-loading-skeleton";
import { createContext } from "use-context-selector";
import "./App.css";
import {
  Header,
  ListAlasan,
  ListCapres,
  ListSuara,
  UserAuthentication,
} from "./components/lazyLoadComponents.js";
import useGetLocalStorage from "./hooks/useGetLocalStorage.js";
import useSetLocalStorage from "./hooks/useSetLocalStorage.js";
import "./styles/reset.css";

export const AppContext = createContext(null);

const initialState = {
  isAuthorized: false,
  isLoading: false,
  formType: "/login",
  isOpenUserAuth: false,
  userDetail: {
    nama: "",
    pilihanCapresId: "",
    alasan: "",
  },
  errors: [],
  id: "",
  alasan: "",
};

const actionTypes = {
  SET_IS_AUTHORIZED: "SET_IS_AUTHORIZED",
  SET_FORM_TYPE: "SET_FORM_TYPE",
  SET_IS_OPEN_USER_AUTH: "SET_IS_OPEN_USER_AUTH",
  HANDLE_LOGIN_SUBMIT: "HANDLE_LOGIN_SUBMIT",
  SET_USER_DETAIL: "SET_USER_DETAIL",
  SET_ERRORS: "SET_ERRORS",
  SET_IS_LOADING: "SET_IS_LOADING",
  SET_ID: "SET_ID",
  SET_ALASAN: "SET_ALASAN",
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
    case actionTypes.SET_ID:
      return { ...state, id: action.payload };
    case actionTypes.SET_ALASAN:
      return { ...state, alasan: action.payload };
    case actionTypes.SET_ERRORS:
      return { ...state, errors: action.payload };
    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
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

const setIdAction = (value) => ({
  type: actionTypes.SET_ID,
  payload: value,
});

const setAlasanAction = (value) => ({
  type: actionTypes.SET_ALASAN,
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
    isOpenUserAuth,
    userDetail,
    errors,
    isLoading,
    id,
    alasan,
  } = state;
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "refreshToken",
  ]);
  const productionServerUrl = "https://lovely-tan-dove.cyclic.app";
  const localServerUrl = "http://localhost:5000";
  const namaRef = useRef();
  const passwordRef = useRef();
  const localStorageUserDetail = useGetLocalStorage("user-detail") || {};
  const localStorageIsAthorized = useGetLocalStorage("is-authorized") || {
    isAuthorized: false,
  };
  const [localUserDetailValue, setUserDetail] = useSetLocalStorage(
    "user-detail",
    localStorageUserDetail
  );
  const [localIsAuthorizedValue, setIsAuthorized] = useSetLocalStorage(
    "is-authorized",
    localStorageIsAthorized
  );

  const setId = (value) => {
    dispatch(setIdAction(value));
  };

  const setAlasan = (value) => {
    dispatch(setAlasanAction(value));
  };

  const submitLoginForm = async () => {
    try {
      dispatch(setIsLoadingAction(true));

      const data = await postData("/login", {
        nama: namaRef.current?.value,
        password: passwordRef.current?.value,
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
        dispatch(setIsAuthorizedAction(true));
      } else {
        dispatch(setErrorsAction(data.errors));
      }
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    submitLoginForm();
  };

  const submitSignUpForm = async () => {
    try {
      dispatch(setIsLoadingAction(true));
      const data = await postData("/sign-up", {
        nama: namaRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (data.success) {
        dispatch(setFormTypeAction(data.redirect));
      } else {
        dispatch(setErrorsAction(data.errors));
      }
    } finally {
      dispatch(setIsLoadingAction(false));
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    submitSignUpForm();
  };

  const removeCookieToken = () => {
    removeCookie("token", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
    setId("");
    setIsAuthorized({ isAuthorized: false });
    setUserDetail({});
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
    const option = {
      headers: {
        authorization: token,
      },
    };

    try {
      const response = await axios.get(fullUrlString, option);

      return response.data;
    } catch (e) {
      return [];
    }
  };

  const refreshTokenValue = async () => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return;

    const data = await postData("/token", { token: refreshToken });
    const expirationTimeToken = new Date();
    expirationTimeToken.setMinutes(expirationTimeToken.getMinutes() + 10);

    setCookie("token", data.token, {
      path: "/",
      expires: expirationTimeToken,
    });
  };

  useEffect(() => {
    const token = cookies.token;
    const refreshToken = cookies.refreshToken;
    if (!token && !refreshToken) return;
    if (!refreshToken) return;
    if (!token && refreshToken) refreshTokenValue();
  }, [cookies.token, cookies.refreshToken]);

  useEffect(() => {
    const checkIsUserAuthorized = async () => {
      const token = cookies.token;
      if (!token) {
        dispatch(setIsAuthorizedAction(false));
        return;
      }

      try {
        const {
          isAuthorized = localIsAuthorizedValue.isAuthorized,
          userDetail = localUserDetailValue,
        } = await getData(`/isAuthorized/${token}`);

        if (isAuthorized) {
          setIsAuthorized({ isAuthorized: true });
          dispatch(setIsAuthorizedAction(true));
          dispatch(setIsOpenUserAuthAction(false));
          setUserDetail(userDetail);
          dispatch(setUserDetailAction(userDetail));
        } else {
          setIsAuthorized({ isAuthorized: false });
          setUserDetail({});
          dispatch(setIsAuthorizedAction(false));
        }
      } catch (err) {
        dispatch(setIsAuthorizedAction(true));
      }
    };

    checkIsUserAuthorized();
  }, [cookies.token]);

  const contextValue = {
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
    namaRef,
    passwordRef,
    setIsOpenUserAuthAction,
    setUserDetailAction,
    userDetail,
    errors,
    setErrorsAction,
    postData,
    setIsLoadingAction,
    isLoading,
    id,
    setId,
    setAlasan,
    alasan,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <SkeletonTheme baseColor="var(--secondary-color)" highlightColor="#444">
          <Suspense fallback={null}>
            <div className="app-container">
              {isLoading ? <span className="loader"></span> : null}
              <Header />
              <main>
                <ListCapres />
                <ListSuara />
                <ListAlasan />
              </main>
              <UserAuthentication />
            </div>
          </Suspense>
        </SkeletonTheme>
      </AppContext.Provider>
    </>
  );
}

export default App;
