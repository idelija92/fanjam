import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRole = () => {
  const { roles = [] } = useContext(AuthContext);

  const hasRole = (targetRole) => roles.includes(targetRole);
  const hasAnyRole = (roleList) => roleList.some(role => roles.includes(role));
  const isAdmin = () => hasRole('ADMIN');
  const isUser = () => hasRole('USER');
  const isBand = () => hasRole('BAND');
  const isVenue = () => hasRole('VENUE');

  return {
    roles,
    hasRole,
    hasAnyRole,
    isAdmin,
    isUser,
    isBand,
    isVenue,
  };
};

export default useRole;
