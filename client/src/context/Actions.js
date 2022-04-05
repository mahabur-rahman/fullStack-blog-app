// login start

export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

// success

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

// failure
export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

// logout

export const Logout = () => ({
  type: "LOGOUT",
});
