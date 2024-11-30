import { axiosInstance } from '~/utils/axiosInstance';

///////////////// Auth API ///////////////////


export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/Auth/register', userData);
    // const response = await axios.post('https://localhost:7294/api/Auth/login', userData);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

///////////// User API ////////////////
export const fetchUserInfo = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/User/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchGroupInfo = async (groupId) => {
  try {
    const response = await axiosInstance.get(`/api/Group/${groupId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/api/User/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}


export const getLikeUser = async (postId) => {
  try {
    const response = await axiosInstance.get(`/api/Post/likeuser?postId=${postId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}

export const getLikeCount = async (postId) => {
  try {
    const response = await axiosInstance.get(`/api/Post/likes?postId=${postId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}
export const LikePost = async (postId) => {
  try {
    const response = await axiosInstance.post(`/api/Post/like?postId=${postId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}
export const UnlikePost = async (postId) => {
  try {
    const response = await axiosInstance.post(`/api/Post/delete?postId=${postId}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
}