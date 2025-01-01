import Button from "@src/components/ui/button/button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 px-4">
      <h1 className="text-xl lg:text-2xl font-bold text-center">
        404 | صفحه مورد نظر یافت نشد
      </h1>
      <Button href="/" className="w-full max-w-80">
        صفحه اصلی
      </Button>
    </div>
  );
};

export default NotFoundPage;
