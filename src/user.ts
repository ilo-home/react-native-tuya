import { NativeModules } from 'react-native';

const tuya = NativeModules.TuyaUserModule;

export function loginOrRegisterWithUid(
  params: LoginOrRegisterAccountWithUidParams
): Promise<any> {
  return tuya.loginOrRegisterWithUid(params);
}

export function registerAccountWithEmail(
  params: RegisterAccountParams
): Promise<any> {
  return tuya.registerAccountWithEmail(params);
}

export function loginWithEmailPassword(params: LoginWithPasswordParams): Promise<any> {
  return tuya.loginWithEmailPassword(params);
}

export function getValidateCode(
  params: GetValidateCodeParams
): Promise<any> {
  return tuya.getValidateCode(params);
}

export function checkValidateCode(
  params: CheckValidateCodeParams
): Promise<any> {
  return tuya.checkValidateCode(params);
}

export function resetEmailPassword(
  params: ResetPasswordParams
): Promise<any> {
  return tuya.resetEmailPassword(params);
}

export function logout(): Promise<string> {
  return tuya.logout();
}

export async function getCurrentUser(): Promise<User | null> {
  const user = await tuya.getCurrentUser();
  // The iOS SDK returns an empty user model but the Android one doesn't.
  return user && user.email ? user : null;
}

export function cancelAccount(): Promise<string> {
  return tuya.cancelAccount();
}

export enum ValidateCodeType {
  REGISTER = 1,
  LOGIN = 2,
  RESET_PASSWORD = 3
}

export type User = {
  email: string;
  username: string;
  sid: string;
  timezoneId: string;
  uid: string;
  userType: number;
  headPic: string;
  mobile: string;
  nickName: string;
  phoneCode: string;
};

export type LoginOrRegisterAccountWithUidParams = {
  countryCode: string;
  id: string; // This can be an email address, phone number, generated uid
  password: string; // This should match id
};

export type RegisterAccountParams = {
  countryCode: string;
  id: string; // This can be an email address, phone number, generated uid
  validateCode: string;
  password: string;
};

export type GetValidateCodeParams = {
  countryCode: string;
  region: string;
  id: string; // Email address or phone number
  type: ValidateCodeType;
};

export type CheckValidateCodeParams = {
  countryCode: string;
  region: string;
  id: string; // Email address or phone number
  validateCode: string;
  type: ValidateCodeType;
};

export type LoginWithPasswordParams = {
  id: string;
  password: string;
  countryCode: string;
};

export type ResetPasswordParams = {
  id: string;
  countryCode: string;
  validateCode: string;
  newPassword: string;
};
