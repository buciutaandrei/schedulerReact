import {
  SELECT_PROGRAMARE,
  HANDLE_FORM_CHANGE,
  SELECT_DATE,
  SELECT_EDIT_DATE,
  FETCH_PROGRAMARI_SUCCESS,
  FETCH_PROGRAMARI_STARTED,
  ADD_PROGRAMARE_SUCCESS,
  ADD_PROGRAMARE_STARTED,
  DELETE_PROGRAMARE_STARTED,
  DELETE_PROGRAMARE_SUCCESS,
  TOGGLE_ADD_MODAL
} from "../constants/action-types";

const initialState = {
  modalState: false,
  deleting: false,
  adding: false,
  loading: true,
  selectedDate: new Date(),
  formChange: {},
  selectedProgramare: { pacient: "" },
  programari: []
};

function rootReducer(state = initialState, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {
    case SELECT_EDIT_DATE: {
      return Object.assign({}, state, action.payload);
    }

    case TOGGLE_ADD_MODAL: {
      return Object.assign(
        {},
        state,
        { selectedProgramare: action.payload },
        { modalState: !state.modalState }
      );
    }
    case DELETE_PROGRAMARE_STARTED: {
      console.log("started delete");
      return Object.assign({}, state, { deleting: true });
    }
    case DELETE_PROGRAMARE_SUCCESS: {
      console.log(action.payload);
      return Object.assign({}, state, { deleting: false });
    }
    case ADD_PROGRAMARE_STARTED: {
      return Object.assign({}, state, { adding: true });
    }
    case SELECT_PROGRAMARE: {
      return Object.assign({}, state, {
        selectedProgramare: action.payload
      });
    }
    case HANDLE_FORM_CHANGE: {
      const oldState = state.selectedProgramare;
      const newState = Object.assign({}, oldState, action.payload);

      return Object.assign({}, state, { selectedProgramare: newState });
    }

    case SELECT_DATE: {
      return Object.assign({}, state, { selectedDate: action.payload });
    }

    case FETCH_PROGRAMARI_SUCCESS: {
      return Object.assign({}, state, action.payload, { loading: false });
    }

    case FETCH_PROGRAMARI_STARTED: {
      console.log("fetch start");
      return Object.assign({}, state, { loading: true });
    }

    case ADD_PROGRAMARE_SUCCESS: {
      return Object.assign({}, state, {
        adding: false
      });
    }

    default:
      return state;
  }
}
export default rootReducer;
