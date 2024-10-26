import { loginStart, loginSuccess, loginFailure } from '../Slices/AuthSlice';
import { loginUser } from '~/apis';

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const userData = await loginUser(email, password);
    dispatch(loginSuccess(userData));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};