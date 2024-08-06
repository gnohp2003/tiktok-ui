import * as httpRequest from '~/utils/httpRequest';

const { token } = JSON.parse(localStorage.getItem('site')) || '';

const likeVideo = async (uuid) => {
  try {
    const response = httpRequest.default.post(`videos/${uuid}/like`, [], {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const unlikeVideo = async (uuid) => {
  try {
    const response = httpRequest.default.post(`videos/${uuid}/unlike`, [], {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const likeComment = async (id) => {
  try {
    const response = await httpRequest.default.post(`comments/${id}/like`, [], {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const unlikeComment = async (id) => {
  try {
    const response = await httpRequest.default.post(
      `comments/${id}/unlike`,
      [],
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export { likeVideo, unlikeVideo, likeComment, unlikeComment };
