// contexts/AuthState.ts
import { AuthUser } from './AuthContextContext';

let loginHandler: (_user: AuthUser) => void;
let logoutHandler: () => void;

export const setAuthHandlers = (login: typeof loginHandler, logout: typeof logoutHandler) => {
  loginHandler = login;
  logoutHandler = logout;
};

export const triggerLogin = (_user: AuthUser) => {
  if (loginHandler) loginHandler(_user);
};

export const triggerLogout = () => {
  if (logoutHandler) logoutHandler();
};
