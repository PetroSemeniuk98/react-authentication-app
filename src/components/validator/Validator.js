const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_.@]{3,24}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export { USER_REGEX, PASSWORD_REGEX };
