import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectCurrentUser } from '../../features/auth/authSlice';

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole);
  return useMemo(() => ({ user, role }), [user, role]);
};
