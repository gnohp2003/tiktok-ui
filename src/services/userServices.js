import * as httpRequest from '~/utils/httpRequest';

const { token } = JSON.parse(localStorage.getItem('site')) || '';

const login = async (data) => {
  const response = await httpRequest.default.post(
    'auth/login',
    JSON.stringify(data),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return response.data;
};

const signup = async (data) => {
  const response = await httpRequest.default.post(
    'auth/register',
    JSON.stringify(data),
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return response.data;
};

const currentUser = async () => {
  const response = await httpRequest.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

const following = async (page = '') => {
  try {
    const response = await httpRequest.default.get(page || 'me/followings', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const follow = async (uid) => {
  try {
    const response = await httpRequest.default.post(`users/${uid}/follow`, [], {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (uid) => {
  try {
    const response = await httpRequest.default.post(
      `users/${uid}/unfollow`,
      [],
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const user = async (nickname) => {
  try {
    const response = await httpRequest.get(`users/${nickname}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (data) => {
  try {
    const response = await httpRequest.default.post(
      'auth/me?_method=PATCH',
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  login,
  signup,
  currentUser,
  following,
  follow,
  unfollow,
  user,
  update,
};
