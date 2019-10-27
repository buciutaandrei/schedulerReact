import axios from "axios";
import {
  ADD_PROGRAMARE,
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED

} from "../constants/action-types";

export function addProgramare(payload) {
  return { type: ADD_PROGRAMARE, payload };
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

export function fetchProgramari() {
  return dispatch => {
    dispatch(fetchProgramariStarted)
  axios.get("http://localhost:3001").then(res => {dispatch(fetchProgramariSuccess(res.data))})
}}

const fetchProgramariSuccess = (data) => ({
  type: FETCH_PROGRAMARI_SUCCESS,
  payload: {
    programari: [...data]
  }
})

const fetchProgramariStarted = () => ({
  type: FETCH_PROGRAMARI_STARTED
})
