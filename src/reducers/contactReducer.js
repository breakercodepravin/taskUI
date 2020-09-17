import {
  CONTACT_LOADING,
  DELETE_CONTACT,
  GET_ALL_CONTACT,
  GET_CONTACT_BY_ID,
  POST_CONTACT,
} from "../actions/types";

const initialState = {
  contacts: [],
  contact: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case GET_CONTACT_BY_ID:
      return {
        ...state,
        contact: action.payload,
        loading: false,
      };
    case POST_CONTACT:
      return {
        ...state,
        contact: action.payload,
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        loading: false,
      };
    case CONTACT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
