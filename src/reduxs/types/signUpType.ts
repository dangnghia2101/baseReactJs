export interface ResponseSignUpAPI {
  statusCode: number;
  data: string;
}

export interface ParamBodySignUp {
  body: {
    password: string;
    email: string;
    fullName: string;
    phone?: string;
    gender?: 'male' | 'female';
    dateOfBirth?: string;
  };
}
export interface ParamVerify {
  id: string;
  code: string;
}
