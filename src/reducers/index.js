import {
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED,
  ADD_PROGRAMARE_SUCCESS,
  ADD_PROGRAMARE_STARTED
} from "../constants/action-types";

const initialState = {
  added: true,
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
    case ADD_PROGRAMARE_STARTED: {
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
      const oldState = state.selectedProgramare;
      console.log(state.selectedProgramare);
      const newState = Object.assign({}, oldState, action.payload);
      console.log(newState);

      return Object.assign({}, state, { selectedProgramare: newState });
    }

    case SELECT_DATE: {
      return Object.assign({}, state, action.payload);
    }

    case FETCH_PROGRAMARI_SUCCESS: {
      return Object.assign({}, state, action.payload, { loading: false });
    }

    case FETCH_PROGRAMARI_STARTED: {
      return Object.assign({}, state, { loading: true });
    }

    case ADD_PROGRAMARE_SUCCESS: {
      return state;
    }

    default:
      return state;
  }
}
export default rootReducer;
