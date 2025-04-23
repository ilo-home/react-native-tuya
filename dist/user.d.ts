export declare function loginOrRegisterWithUid(params: LoginOrRegisterAccountWithUidParams): Promise<any>;
export declare function registerAccountWithEmail(params: RegisterAccountParams): Promise<any>;
export declare function loginWithEmailPassword(params: LoginWithPasswordParams): Promise<any>;
export declare function getValidateCode(params: GetValidateCodeParams): Promise<any>;
export declare function checkValidateCode(params: CheckValidateCodeParams): Promise<any>;
export declare function resetEmailPassword(params: ResetPasswordParams): Promise<any>;
export declare function logout(): Promise<string>;
export declare function getCurrentUser(): Promise<User | null>;
export declare function cancelAccount(): Promise<string>;
export declare enum ValidateCodeType {
    REGISTER = 1,
    LOGIN = 2,
    RESET_PASSWORD = 3
}
export declare type User = {
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
export declare type LoginOrRegisterAccountWithUidParams = {
    countryCode: string;
    id: string;
    password: string;
};
export declare type RegisterAccountParams = {
    countryCode: string;
    id: string;
    validateCode: string;
    password: string;
};
export declare type GetValidateCodeParams = {
    countryCode: string;
    region: string;
    id: string;
    type: ValidateCodeType;
};
export declare type CheckValidateCodeParams = {
    countryCode: string;
    region: string;
    id: string;
    validateCode: string;
    type: ValidateCodeType;
};
export declare type LoginWithPasswordParams = {
    id: string;
    password: string;
    countryCode: string;
};
export declare type ResetPasswordParams = {
    id: string;
    countryCode: string;
    validateCode: string;
    newPassword: string;
};
