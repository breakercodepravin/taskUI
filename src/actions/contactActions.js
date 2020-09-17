import axios from 'axios';

import {
    GET_ALL_CONTACT,
    CLEAR_ERRORS,
    CONTACT_LOADING, GET_ERRORS, GET_CONTACT_BY_ID, DELETE_CONTACT
  } from './types';

export const getAllContacts = () => (dispatch) => {
    dispatch(setContactLoading());
   axios.get('http://localhost:5000/api/contacts')
    .then(res => {
        dispatch({
            type:GET_ALL_CONTACT,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    })
};
export const getContactById = (id) => dispatch => {
  dispatch(setContactLoading());
  axios.get(`http://localhost:5000/api/contacts/${id}`)
    .then(res => {
        dispatch({
            type:GET_CONTACT_BY_ID,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    })
}

export const updateContact = (id, data, history) => dispatch => {
  dispatch(setContactLoading());
  axios.put(`http://localhost:5000/api/contacts/${id}`, data)
  .then(res => {history.push('/contacts')})
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const deleteContact = (id, history) => dispatch => {
  dispatch(setContactLoading());
  axios.delete(`http://localhost:5000/api/contacts/${id}`)
  .then(res => {
    history.push('/contacts')
    dispatch({
      type: DELETE_CONTACT,
      payload: res
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

export const postContact = (data, history) => dispatch => {
  dispatch(setContactLoading());
  axios.post('http://localhost:5000/api/contacts', data)
  .then(res => {history.push('/contacts')})
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
}

// Set loading state
export const setContactLoading = () => {
    return {
      type: CONTACT_LOADING
    };
  };
  
  // Clear errors
  export const clearErrors = () => {
    return {
      type: CLEAR_ERRORS
    };
  };