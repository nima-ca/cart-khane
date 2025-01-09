import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

export const INTERNAL_SERVER_ERROR_MESSAGE =
  "متأسفانه، خطایی در سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.";
export const NETWORK_ERROR_MESSAGE =
  "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید.";

export const apiErrorHandler = (
  errors: AxiosError<{ message: string | string[] }>
): void => {
  const statusCode = errors.response?.status;

  if (!errors.response) {
    toast.error(NETWORK_ERROR_MESSAGE);
    return;
  }

  if (statusCode === 400) {
    const messages = errors.response.data.message;

    if (typeof messages === "string") {
      toast.error(messages);
      return;
    }

    if (Array.isArray(messages)) {
      messages.forEach((msg) => {
        toast.error(msg);
      });
      return;
    }

    return;
  }

  if (statusCode === 401) {
    // logout();
    toast.error("لطفا دوباره وارد شوید");
    return;
  }

  if (statusCode === 500) {
    toast.error(INTERNAL_SERVER_ERROR_MESSAGE);
    return;
  }

  if (
    statusCode === 501 ||
    statusCode === 502 ||
    statusCode === 503 ||
    statusCode === 504
  ) {
    toast.error(INTERNAL_SERVER_ERROR_MESSAGE);
    return;
  }
};

export const badRequestExceptionHandler = (err: Error, message: string) => {
  if (isAxiosError(err)) {
    if (err.status === 400) {
      toast.error(message);
    }
  }
};

export const unprocessableExceptionHandler = (err: Error, message: string) => {
  if (isAxiosError(err)) {
    if (err.status === 422) {
      toast.error(message);
    }
  }
};
