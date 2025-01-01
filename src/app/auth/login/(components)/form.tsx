"use client";

import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import { JWT_TOKEN_STORAGE_KEY } from "@src/utils/api/api";
import { IR_PHONE_NUMBER_REGEX } from "@src/utils/regex";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { sendOTPAPI, validateOTPAPI } from "../(api)/apis";

export interface LoginFormData {
  phoneNumber: string;
  otp: string;
}

export enum LoginStep {
  PhoneNumber,
  OTP,
}

const LoginForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(LoginStep.PhoneNumber);

  const sendOTPMutation = useMutation({
    mutationFn: sendOTPAPI,
  });

  const validateOTPMutation = useMutation({
    mutationFn: validateOTPAPI,
    onSuccess(data) {
      localStorage.setItem(JWT_TOKEN_STORAGE_KEY, data.data.token);
      router.push("/app");
    },
  });

  const form = useForm<LoginFormData>({
    defaultValues: { otp: "", phoneNumber: "" },
  });

  const submitHandler = form.handleSubmit((values) => {
    if (step === LoginStep.PhoneNumber) {
      sendOTPMutation.mutate(
        { phoneNumber: values.phoneNumber.trim() },
        {
          onSuccess() {
            toast.success("رمز یکبار مصرف با موفقیت ارسال شد");
            setStep(LoginStep.OTP);
          },
        }
      );
      return;
    }

    validateOTPMutation.mutate({
      phoneNumber: values.phoneNumber.trim(),
      otp: values.otp.trim(),
    });
  });

  const resendOTP = () => {
    sendOTPMutation.mutate(
      { phoneNumber: form.getValues("phoneNumber").trim() },
      {
        onSuccess() {
          toast.success("رمز یکبار مصرف با موفقیت ارسال شد");
        },
      }
    );
  };

  return (
    <form onSubmit={submitHandler} className="w-full mt-10">
      <div className="flex flex-col gap-4 items-center">
        {step === LoginStep.PhoneNumber && (
          <Controller
            name="phoneNumber"
            control={form.control}
            rules={{
              required: "شماره موبایل خود را وارد کنید",
              pattern: {
                value: IR_PHONE_NUMBER_REGEX,
                message: "فرمت شماره تلفن نادرست است",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                label="شماره موبایل"
                placeholder="09121234567"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        )}

        {step === LoginStep.OTP && (
          <Controller
            name="otp"
            control={form.control}
            rules={{
              required: "رمز یکبار مصرف را وارد کنید",
              minLength: {
                value: 6,
                message: "رمز یکبار مصرف باید 6 رقم باشد",
              },
            }}
            render={({ field }) => (
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                onPaste={(e) =>
                  form.setValue("otp", e.clipboardData.getData("text"))
                }
                shouldAutoFocus
                numInputs={6}
                inputType="number"
                containerStyle={{ direction: "ltr" }}
                renderSeparator={<span className="lg:mx-2" />}
                inputStyle={{
                  fontSize: "1.5rem",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="rounded-lg border border-regal-blue-500 outline-regal-blue-500 min-w-10 min-h-10 sm:min-w-12 sm:min-h-12 lg:min-w-14 lg:min-h-14 mx-1 py-1"
                  />
                )}
              />
            )}
          />
        )}

        {step === LoginStep.OTP && (
          <Button
            type="button"
            variant="outlined"
            onClick={resendOTP}
            className="w-full mt-10"
            loading={sendOTPMutation.isPending}
            disabled={validateOTPMutation.isPending}
          >
            ارسال مجدد
          </Button>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={sendOTPMutation.isPending || validateOTPMutation.isPending}
        >
          {step === LoginStep.OTP ? "ورود" : "ارسال رمز یکبار مصرف"}
        </Button>

        {step === LoginStep.OTP && (
          <IconButton
            className="text-regal-blue-500 absolute top-6 left-4"
            onClick={() => {
              setStep(LoginStep.PhoneNumber);
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </IconButton>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
