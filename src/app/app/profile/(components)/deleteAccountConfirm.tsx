import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import Modal, { ModalProps } from "@src/components/ui/modal/modal";
import { falsyString } from "@src/utils/empty";
import { logout } from "@src/utils/logout";
import { useMutation } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { deleteUserAPI } from "../(api)/apis";

interface DeleteAccountConfirmProps
  extends Pick<ModalProps, "isOpen" | "onClose"> {
  phoneNumber: string;
}

const DeleteAccountConfirm: FC<DeleteAccountConfirmProps> = ({
  isOpen,
  onClose,
  phoneNumber,
}) => {
  const form = useForm<{ phoneNumber: string }>({
    defaultValues: { phoneNumber: "" },
  });

  const closeModal = () => {
    onClose();
    form.reset();
  };

  const deleteAccountMutation = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess() {
      toast.success("حساب کاربری شما با موفقیت حذف شد");
      logout();
    },
  });

  const submitHandler = form.handleSubmit(() => {
    if (!phoneNumber) return;

    deleteAccountMutation.mutate();
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      classname="flex items-center justify-center"
    >
      <form
        onSubmit={submitHandler}
        className="bg-white rounded-lg px-4 py-8 min-w-80 lg:w-[50rem] mx-4"
      >
        <div className="flex justify-between items-center mb-4 lg:mb-8">
          <span></span>
          <p className="font-bold">حذف حساب کاربری</p>

          <IconButton className="text-black" onClick={closeModal} type="button">
            <X />
          </IconButton>
        </div>

        <div className="grid grid-cols-1 gap-x-2 gap-y-4 lg:gap-y-6 mt-4 lg:mt-8">
          <div>
            <p className="text-lg font-bold mb-1">
              آیا از حذف حساب کاربری خود مطمئن هستید؟
            </p>
            <p className="text-red-500 text-sm mb-4">
              *** در صورت حذف حساب کاربری خود اطلاعات شما به هیچ عنوان قابل
              بازیابی نخواهد بود!
            </p>

            <p className="text-sm">
              برای حذف حساب کاربری شماره تلفن {falsyString(phoneNumber)} خود را
              وارد کنید
            </p>
          </div>

          <Controller
            name="phoneNumber"
            control={form.control}
            rules={{
              validate: (value) => {
                if (value !== phoneNumber) {
                  return "مقدار شماره تلفن اشتباه است";
                }
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  error={fieldState.error?.message}
                  placeholder="شماره تلفن خود را وارد کنید"
                />
              );
            }}
          />

          <div className="flex items-center gap-2">
            <Button
              isDanger
              type="button"
              variant="outlined"
              onClick={closeModal}
              className="lg:max-w-40"
              loading={deleteAccountMutation.isPending}
            >
              انصراف
            </Button>
            <Button
              isDanger
              type="submit"
              className="lg:max-w-40"
              loading={deleteAccountMutation.isPending}
            >
              حذف
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteAccountConfirm;
