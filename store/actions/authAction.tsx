import { SET_TOKEN, CLEAR_TOKEN } from './actionType';

export const setToken = (token: any) => ({
  type: SET_TOKEN,
  payload: token,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});

// Modify your loginUser function to use setToken

import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './actionType';
import axiosConfig from '@/axios-config'; // Adjust path if needed

export const loginUser = (username: any, password: string): ThunkAction<Promise<any>, any, unknown, Action<string>> => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axiosConfig.post('/auth/login', { username, password });
      const data = response.data;

      if (response.status === 200) {
        if (data.mfaRequired) {
          return { mfaRequired: true, mfaMethod: data.mfaMethod };
        } else {
          await localStorage.setItem('token', data.token);
          dispatch(setToken(data.token));
          return { success: true };
        }
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: data.message });
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      return { success: false, message: error.message };
    }
  };
};


export const logoutUser = () => {
  return async (dispatch: (arg0: { type: string; }) => void) => {
    await localStorage.removeItem('token');
    dispatch(clearToken()); // Use clearToken action
  };
};

// Load token from AsyncStorage
export const loadToken = () => {
  return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    const token = await localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token)); // Use setToken action
    }
  };
};
