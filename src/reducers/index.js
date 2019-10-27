import {
  ADD_PROGRAMARE,
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED
} from "../constants/action-types";

const initialState = {
  loading: true,
  selectedDate: new Date(),
  formChange: {},
  selectedProgramare: [],
  programari: []
};

function rootReducer(state = initialState, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case ADD_PROGRAMARE: {
      return Object.assign({}, state, {
        programari: state.programari.concat(action.payload)
      });
    }
    case SELECT_PROGRAMARE: {
      return Object.assign({}, state, {
        selectedProgramare: action.payload
      });
    }
    case HANDLE_FORM_CHANGE: {
      return Object.assign({}, state, {
        selectedProgramare: action.payload
      });
    }

    case SELECT_DATE: {
      return Object.assign({}, state, action.payload);
    }

    case FETCH_PROGRAMARI_SUCCESS: {
      return Object.assign({}, state, action.payload, {loading: false});
    }

    case FETCH_PROGRAMARI_STARTED: {
      return Object.assign({}, state, { loading: true})
    }

    default:
      return state;
  }
}
export default rootReducer;
