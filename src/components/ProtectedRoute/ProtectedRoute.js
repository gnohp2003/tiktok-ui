import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/context';
import config from '~/config';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token === '') {
      return navigate(config.routes.home, { replace: true });
    }
  }, [navigate, token]);

  return children;
}

export default ProtectedRoute;
