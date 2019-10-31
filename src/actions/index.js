import axios from "axios";
import {
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  SELECT_EDIT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED,
  FETCH_EDIT_PROGRAMARI_SUCCESS,
  FETCH_EDIT_PROGRAMARI_STARTED,
  ADD_PROGRAMARE_STARTED,
  ADD_PROGRAMARE_SUCCESS,
  DELETE_PROGRAMARE_STARTED,
  DELETE_PROGRAMARE_SUCCESS,
  TOGGLE_ADD_MODAL,
  ADD_HOURS_ARRAY,
  USER_LOGGING_STARTED,
  USER_LOGGING_SUCCESS,
  USER_LOGGING_ERROR,
  LOGGING_OUT
} from "../constants/action-types";
import moment from "moment";
import setAuthToken from "../Components/LoginPage/setAuthToken";
import jwt_decode from "jwt-decode";

export function userLogging(payload) {
  return dispatch => {
    dispatch({ type: USER_LOGGING_STARTED });
    axios
      .post("http://localhost:3001/api/users/login", payload)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch({ type: USER_LOGGING_SUCCESS, payload: decoded });
      })
      .catch(err =>
        dispatch({ type: USER_LOGGING_ERROR, payload: err.response.data })
      );
  };
}

export function setUser(payload) {
  return { type: USER_LOGGING_SUCCESS, payload };
}

export function loggingOut(payload) {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  return { type: LOGGING_OUT, payload };
}

export function toggleAddModal(payload) {
  return { type: TOGGLE_ADD_MODAL, payload };
}

export function selectEditDate(payload) {
  return { type: SELECT_EDIT_DATE, payload };
}

export function deleteProgramare(payload) {
  const collection = moment(payload.selectedDate).format("DDMMY");
  return dispatch => {
    dispatch({ type: DELETE_PROGRAMARE_STARTED });
    const url = `http://localhost:3001/database/${collection}`;
    axios({
      method: "delete",
      url: url,
      data: { id: payload.id }
    }).then(dispatch({ type: DELETE_PROGRAMARE_SUCCESS }));
  };
}

export function addProgramare(payload) {
  const collection = moment(payload.selectedDate).format("DDMMY");
  return dispatch => {
    dispatch({ type: ADD_PROGRAMARE_STARTED });
    const url = `http://localhost:3001/database/${collection}`;
    axios({
      method: "post",
      url: url,
      data: payload
    }).then(res => {
      dispatch({ type: ADD_PROGRAMARE_SUCCESS, payload: res.data });
    });
  };
}

export function selectProgramare(payload) {
  return { type: SELECT_PROGRAMARE, payload };
}

export function handleFormChange(payload) {
  return { type: HANDLE_FORM_CHANGE, payload };
}

export function selectDate(payload) {
  return { type: SELECT_DATE, payload };
}

export function addHoursArray(payload) {
  return { type: ADD_HOURS_ARRAY, payload };
}

export function fetchProgramari(payload) {
  return dispatch => {
    dispatch({ type: FETCH_PROGRAMARI_STARTED });
    const collection = moment(payload).format("DDMMY");
    const url = `http://localhost:3001/database/${collection}`;
    axios.get(url).then(res => {
      dispatch({ type: FETCH_PROGRAMARI_SUCCESS, payload: res.data });
    });
  };
}

export function fetchEditProgramari(payload) {
  return dispatch => {
    dispatch({ type: FETCH_EDIT_PROGRAMARI_STARTED });
    const collection = moment(payload).format("DDMMY");
    const url = `http://localhost:3001/database/${collection}`;
    axios.get(url).then(res => {
      dispatch({ type: FETCH_EDIT_PROGRAMARI_SUCCESS, payload: res.data });
    });
  };
}
