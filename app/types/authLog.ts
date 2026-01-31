// app/types/authLog.ts

export enum AuthEvent {
  LOGIN_SUCCESS = "login_success",
  LOGIN_FAILURE = "login_failure",
  LOGOUT = "logout",
  PASSWORD_RESET_REQUEST = "password_reset_request",
  PASSWORD_RESET_SUCCESS = "password_reset_success",
}

export interface AuthLogPayload {
  userId?: string;        // optional (e.g. failed login)
  event: AuthEvent;
}
