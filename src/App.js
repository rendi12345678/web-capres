import { useReducer, createContext, useEffect } from "react";
import "./App.css";
import "./styles/reset.css";
import ListCapres from "./components/ListCapres";
import Header from "./components/Header";
import ListSuara from "./components/ListSuara";
import ListAlasan from "./components/ListAlasan";
import UserAuthentication from "./components/UserAuthentication";
import { useCookies } from "react-cookie";
import axios from "axios";

export const AppContext = createContext();

const initialState = {
  isAuthorized: false,
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
    users,
  } = state;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const localServerUrl = "http://localhost:5000";
  const productionServerUrl = "https://lovely-tan-dove.cyclic.app";

  const handleOnchange = (e) => {
    dispatch(setFormValuesAction({ [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
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
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const data = await postData("/sign-up", formValues);

    if (data.success) {
      dispatch(setFormTypeAction(data.redirect));
      dispatch(setFormValuesAction({ nama: "", password: "" }));
    } else {
      dispatch(setErrorsAction(data.errors));
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
      const data = await getData("/users");
      dispatch(setUsersAction(data.users));
    };

    getAllUsersData();
  }, []);

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
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app-container">
        <Header />
        <main>
          <ListCapres />
          <ListSuara />
          <ListAlasan />
        </main>
        <UserAuthentication />
      </div>
    </AppContext.Provider>
  );
}

export default App;
