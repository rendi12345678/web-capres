import { useReducer, createContext, useEffect } from "react";
import "./App.css";
import "./styles/reset.css";
import ListCapres from "./components/ListCapres";
import Header from "./components/Header";
import ListSuara from "./components/ListSuara";
import ListAlasan from "./components/ListAlasan";
import UserAuthentication from "./components/UserAuthentication";
import axios from 'axios';

export const AppContext = createContext();

const initialState = {
  isAuthenticated: false,
  formType: "login",
  formValues: {
    nama: "",
    password: "",
  },
  isOpenUserAuth: false,
};

const actionTypes = {
  SET_IS_AUTHENTICATED: "SET_IS_AUTHENTICATED",
  SET_FORM_TYPE: "SET_FORM_TYPE",
  SET_FORM_VALUES: "SET_FORM_VALUES",
  SET_IS_OPEN_USER_AUTH: "SET_IS_OPEN_USER_AUTH",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case actionTypes.SET_FORM_TYPE:
      return { ...state, formType: action.payload, isOpenUserAuth: true };
    case actionTypes.SET_FORM_VALUES:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
    case actionTypes.SET_IS_OPEN_USER_AUTH:
      return { ...state, isOpenUserAuth: action.payload };
    default:
      return state;
  }
};

const setIsAuthenticatedAction = (value) => ({
  type: actionTypes.SET_IS_AUTHENTICATED,
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

const setIsOpenUserAuthAction = (value) => ({
  type: actionTypes.SET_IS_OPEN_USER_AUTH,
  payload: value,
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, formType, formValues, isOpenUserAuth } = state;

  const handleOnchange = (e) => {
    dispatch(setFormValuesAction({ [e.target.name]: e.target.value }));
  };

  const postData = async (endpoint, data) => {
    const localServerUrl = "http://localhost:5000";
    const fullUrlString = `${localServerUrl}/api/${endpoint}`;

    const response = await axios.post(fullUrlString, {
      data
    })

    console.log("Response :", response.data.msg)

  }

  useEffect(() => {
   
    return () => postData("login", "empty")

  }, [])

  const contextValue = {
    dispatch,
    setIsAuthenticatedAction,
    isOpenUserAuth,
    isAuthenticated,
    formType,
    setFormTypeAction,
    formValues,
    setFormValuesAction,
    handleOnchange,
    setIsOpenUserAuthAction
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
