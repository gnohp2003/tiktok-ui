import * as httpRequest from '~/utils/httpRequest';

const { token } = JSON.parse(localStorage.getItem('site')) || '';

const getCommentList = async (uuid, next) => {
  try {
    const response = await httpRequest.default.get(
      next ? next : `/videos/${uuid}/comments`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const createComment = async (uuid, data) => {
  try {
    const response = await httpRequest.default.post(
      `/videos/${uuid}/comments`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const deleteComment = async (id) => {
  try {
    const response = await httpRequest.default.delete(`/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export { getCommentList, createComment, deleteComment };
