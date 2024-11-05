import { loginUser } from '~/apis';

export const login = (values) => async (dispatch) => {
  try {
    await dispatch(loginUser(values));
  } catch (error) {
    console.error("Login failed: ", error);
  }
};
