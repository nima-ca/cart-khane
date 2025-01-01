import LoginForm from "./(components)/form";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-4 lg:p-8 rounded-xl border border-gray-300 w-full max-w-[40rem] relative">
        <h1 className="text-xl lg:text-2xl font-bold">ورود به کارت خانه</h1>
        <p className="text-sm lg:text-base font-medium mt-2">
          برای ادامه، شماره موبایل خود را وارد کنید. رمز یکبار مصرف برای شما
          ارسال خواهد شد.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
