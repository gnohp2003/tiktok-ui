import { useState, createContext, useContext, useRef } from 'react';

const context = createContext();

function StoreProvider({ children }) {
  const [displayForm, setDisplayForm] = useState(false);

  const [videoData, setVideoData] = useState(null);

  // ref
  const headerRef = useRef();
  const uploadHeaderRef = useRef();

  const handleDisplayForm = () => {
    const htmlElement = document.querySelector('html');
    const bodyElement = document.querySelector('body');

    bodyElement.setAttribute('change-overflow', '');
    htmlElement.setAttribute('change-scrollbar-color', '');
    headerRef?.current?.setAttribute('add-padding', '');
    setDisplayForm(true);
  };

  const handleDisplayModal = () => {
    const htmlElement = document.querySelector('html');
    const bodyElement = document.querySelector('body');

    bodyElement.setAttribute('change-overflow', '');
    htmlElement.setAttribute('change-scrollbar-color', '');

    uploadHeaderRef.current.setAttribute('add-padding', '');
  };

  const handleCloseModal = () => {
    const htmlElement = document.querySelector('html');
    const bodyElement = document.querySelector('body');

    htmlElement.removeAttribute('change-scrollbar-color');
    bodyElement.removeAttribute('change-overflow');
  };

  const store = {
    displayForm: [displayForm, setDisplayForm],
    headerRef,
    uploadHeaderRef,
    handleDisplayForm,
    handleDisplayModal,
    handleCloseModal,
    videoData,
    setVideoData,
  };

  return <context.Provider value={store}>{children}</context.Provider>;
}

const useStore = () => useContext(context);

export default StoreProvider;
export { useStore };
