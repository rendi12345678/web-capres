import { useReducer, createContext } from "react";
import "./App.css";
import "./styles/reset.css";
import ListCapres from "./components/ListCapres";
import Header from "./components/Header";
import ListSuara from "./components/ListSuara";
import ListAlasan from "./components/ListAlasan";
import UserAuthentication from "./components/UserAuthentication";

export const AppContext = createContext();

const initialState = {
  isAuthenticated: false,
  formType: "login",
  formValues: {
    nama: "",
    password: "",
  },
};

const actionTypes = {
  SET_IS_AUTHENTICATED: "SET_IS_AUTHENTICATED",
  SET_FORM_TYPE: "SET_FORM_TYPE",
  SET_FORM_VALUES: "SET_FORM_VALUES",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case actionTypes.SET_FORM_TYPE:
      return { ...state, formType: action.payload };
    case actionTypes.SET_FORM_VALUES:
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.payload,
        },
      };
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

const setFormValuesAction = value => ({
  type: actionTypes.SET_FORM_VALUES,
  payload: value,
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, formType, formValues } = state;

  const handleOnchange = e => {
    dispatch(setFormValuesAction({[e.target.name]: e.target.value}))
  }

  const contextValue = {
    dispatch,
    setIsAuthenticatedAction,
    isAuthenticated,
    formType,
    setFormTypeAction,
    formValues,
    setFormValuesAction,
    handleOnchange
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
