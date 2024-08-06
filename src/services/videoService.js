import * as httpRequest from '~/utils/httpRequest';

const { token } = JSON.parse(localStorage.getItem('site')) || '';

const create = async (data) => {
  try {
    const response = await httpRequest.default.post('videos', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const update = async (videoId, data) => {
  try {
    const response = await httpRequest.default.post(
      `videos/${videoId}?_method=PATCH`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const deleteVideo = async (videoId) => {
  try {
    const response = await httpRequest.default.delete(`videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const videoList = async (type = '', page = '') => {
  try {
    const response = await httpRequest.default.get('videos', {
      params: {
        type: type,
        page: page,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const userVideos = async (uid) => {
  try {
    const response = await httpRequest.get(`users/${uid}/videos`);
    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const userLikedVideos = async (uid, next) => {
  try {
    const response = await httpRequest.default.get(
      next || `users/${uid}/liked-videos`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const getAVideo = async (uuid) => {
  try {
    const response = await httpRequest.get(`videos/${uuid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export {
  create,
  update,
  deleteVideo,
  videoList,
  userVideos,
  userLikedVideos,
  getAVideo,
};
