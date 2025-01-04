export interface sendOTPAPIBody {
  phoneNumber: string;
}

export interface validateOTPAPIBody {
  otp: string;
  phoneNumber: string;
}

export interface validateOTPAPIResponse {
  data: {
    token: string;
  };
}
