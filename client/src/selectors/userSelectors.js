export const selectUserData = (state) => state.userReducer;

export const selectIsLoggedIn = (state) => {
  const userData = selectUserData(state);
  return userData.loggedIn;
};

export const selectUser = (state) => {
  const userData = selectUserData(state);
  return userData.user;
};

export const selectIsManager = (state) => {
  const user = selectUser(state);
  return user.isManager;
};
