import React, { Suspense, useReducer, useRef } from "react";
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
import useCheckIsUserAuthorized from "./hooks/useCheckIsUserAuthorized.js";
import useDispatchActions from "./hooks/useDispatchActions.js";
import useFetchs from "./hooks/useFetchs.js";
import useGetLocalStorage from "./hooks/useGetLocalStorage.js";
import useRefreshToken from "./hooks/useRefreshToken.js";
import useRemoveCookieToken from "./hooks/useRemoveCookieToken.js";
import useSetLocalStorage from "./hooks/useSetLocalStorage.js";
import useSignUpForm from "./hooks/useSignUpForm.js";
import useSubmitLoginForm from "./hooks/useSubmitLoginForm.js";
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
  const namaRef = useRef();
  const passwordRef = useRef();
  const recaptchaRef = useRef();
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

  const {
    setIsAuthorizedAction,
    setAlasanAction,
    setCapresIdAction,
    setErrorsAction,
    setUserDetailAction,
    setIsOpenUserAuthAction,
    setIsLoadingAction,
    setFormTypeAction,
  } = useDispatchActions({ dispatch, actionTypes });

  const { removeCookieToken } = useRemoveCookieToken({
    removeCookie,
    setCapresIdAction,
    setIsAuthorized,
    setUserDetail,
  });

  const { postData, getData } = useFetchs({ cookies });
  useRefreshToken({ postData, cookies, setCookie });

  useCheckIsUserAuthorized({
    cookies,
    setIsAuthorized,
    setIsAuthorizedAction,
    localIsAuthorizedValue,
    localUserDetailValue,
    getData,
    setIsOpenUserAuthAction,
    setUserDetail,
    setUserDetailAction,
  });

  const { handleLoginSubmit } = useSubmitLoginForm({
    setIsAuthorizedAction,
    setIsLoadingAction,
    namaRef,
    passwordRef,
    setCookie,
    postData,
    setErrorsAction,
    recaptchaRef,
  });
  const { handleSignUpSubmit } = useSignUpForm({
    setIsLoadingAction,
    setErrorsAction,
    namaRef,
    passwordRef,
    postData,
    setFormTypeAction,
    recaptchaRef,
  });

  const contextValue = {
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
    setCapresIdAction,
    setAlasanAction,
    alasan,
    recaptchaRef,
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
