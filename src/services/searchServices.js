import * as httpRequest from '~/utils/httpRequest';

const search = async (q, type = 'less') => {
  try {
    const response = await httpRequest.get('users/search', {
      params: {
        q,
        type,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { search };
