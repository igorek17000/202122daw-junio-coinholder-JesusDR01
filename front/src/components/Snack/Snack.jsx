import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export function Snack({
  initialState = {
    status: '',
    msg: '',
  },
  severity,
  msgShown,
  setMsgShown,
}) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Stack
      spacing={2}
      width="100%"
    >
      <Snackbar
        open={Boolean(msgShown)}
        autoHideDuration={6000}
        onClose={() => setMsgShown(initialState)}
      >
        <Alert
          onClose={() => setMsgShown(initialState)}
          severity={severity || 'error'}
        >
          {msgShown}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default Snack;
