import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useState } from 'react';
import { FeatureUnavailable } from './components/FeatureUnavailable';

function App() {
  const [noSupport, setNoSupport] = useState(null);

  window.onresize = () => {
    const width = window.innerWidth;

    if (width <= 739) {
      setNoSupport(true);
    } else if (width >= 740 && width <= 1024) {
      setNoSupport(true);
    } else if (width >= 1025) {
      setNoSupport(false);
    }
  };

  return !noSupport ? (
    <div className="App grid">
      <RouterProvider router={router} />
    </div>
  ) : (
    <FeatureUnavailable title="The screen is not assisted. Please switching to PC screen!" />
  );
}

export default App;
