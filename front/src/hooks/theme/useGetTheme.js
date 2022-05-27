import { selectCurrentTheme } from 'features/theme/themeSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useGetTheme = () => {
  const theme = useSelector(selectCurrentTheme);
  return useMemo(() => ({ theme }), [theme]);
};
