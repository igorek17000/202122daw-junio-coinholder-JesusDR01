export const handleRequestErrors = (err, setErrShown) => {
    const loginError = err?.data?.message;
    const loginErrors = err?.data?.errors;
    const msgState = {
      status: 'error',
      msg: '',
    };
    if (loginError?.length > 0) {
      msgState.msg = loginError;
    } else if (loginErrors) {
      msgState.msg = Object.values(loginErrors[0])[0];
    } else {      
      msgState.msg = 'Something went wrong. Try again.';
    }
    setErrShown(msgState);
  }
  