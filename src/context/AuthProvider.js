import { createContext, useContext, useEffect, useState } from 'react';
import * as userService from '~/services/userServices';

const AuthContext = createContext({});

const { token: userToken } = JSON.parse(localStorage.getItem('site')) || '';

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(userToken || '');

  useEffect(() => {
    // if (!isAuth) {
    // }
    (async () => {
      if (token) {
        try {
          const response = await userService.currentUser();
          if (response) {
            setAuth(response);
            setIsAuth(true);
          }
        } catch (error) {
          console.log(error.response);
        }
      } else {
        setIsAuth(false);
        setAuth({});
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        token,
        setToken,
        // getCurrentUser,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default AuthProvider;
export { useAuth };
