import { useParams } from 'react-router-dom';

import { UserProfile } from '~/components/UserProfile';
import { createContext, useState } from 'react';
import { PageNotFound } from '~/components/PageNotFound';

export const ProfileContext = createContext(null);
function Profile() {
  const { nickname } = useParams();
  const [userData, setUserData] = useState(null);
  // loading of heading
  const [userLoading, setUserLoading] = useState(false);
  // loading of body
  const [loading, setLoading] = useState(true);
  // toggle popup
  const [showUserPopup, setShowUserPopup] = useState(false);

  const value = {
    nickname,
    userData,
    setUserData,
    userLoading,
    setUserLoading,
    loading,
    setLoading,
    showUserPopup,
    setShowUserPopup,
  };

  return nickname.startsWith('@') ? (
    <ProfileContext.Provider value={value}>
      <UserProfile />
    </ProfileContext.Provider>
  ) : (
    <PageNotFound />
  );
}

export default Profile;
