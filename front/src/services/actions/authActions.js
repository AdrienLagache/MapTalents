export const CHANGE_SETTINGS_FIELD = 'CHANGE_SETTINGS_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const HANDLE_SUCCESSFUL_LOGIN = 'HANDLE_SUCCESSFUL_LOGIN';
export const DISCONNECT = 'DISCONNECT';

export const changeSettingsField = (value, name) => ({
  type: CHANGE_SETTINGS_FIELD,
  name,
  value,
});
export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const handleSuccessfulLogin = (name, role, id) => ({
  type: HANDLE_SUCCESSFUL_LOGIN,
  name,
  role,
  id,
});
export const disconnect = () => ({
  type: DISCONNECT,
});
