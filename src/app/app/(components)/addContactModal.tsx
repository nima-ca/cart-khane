import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import Modal, { ModalProps } from "@src/components/ui/modal/modal";
import { checkEmptyString } from "@src/utils/empty";
import { EMAIL_REGEX, IR_PHONE_NUMBER_REGEX } from "@src/utils/regex";
import { useMutation } from "@tanstack/react-query";
import { Plus, XIcon } from "lucide-react";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { addContactAPI } from "../(api)/apis";
import AvatarSelection from "./avatarSelection";

export interface AddContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  avatarId: number;
}

export interface AddContactModalProps
  extends Pick<ModalProps, "isOpen" | "onClose"> {
  refetch: () => void;
}

const AddContactModal: FC<AddContactModalProps> = ({
  isOpen,
  onClose,
  refetch,
}) => {
  const form = useForm<AddContactFormData>({
    defaultValues: { email: "", name: "", phoneNumber: "", avatarId: 36 },
  });

  const addContactMutation = useMutation({
    mutationFn: addContactAPI,
  });

  const submitHandler = form.handleSubmit((values) => {
    addContactMutation.mutate(
      {
        name: values.name,
        email: checkEmptyString(values.email),
        phoneNumber: checkEmptyString(values.phoneNumber),
        avatarId: values.avatarId,
      },
      {
        onSuccess() {
          refetch();
          onClose();
          form.reset();
        },
      }
    );
  });

  const selectedAvatarId = form.watch("avatarId");
  const handleSelectAvatar = (id: number) => {
    form.setValue("avatarId", id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classname="flex items-center justify-center p-4"
    >
      <form
        noValidate
        onSubmit={submitHandler}
        className="bg-white w-full p-6 rounded-md flex flex-col gap-4 main-container"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">افزودن مخاطب</p>

          <IconButton className="text-black" onClick={onClose} type="button">
            <XIcon />
          </IconButton>
        </div>

        <div className="grid grid-cols-4 lg:grid-cols-8 place-items-center gap-4 p-1">
          <AvatarSelection
            id={36}
            onClick={() => handleSelectAvatar(36)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={43}
            onClick={() => handleSelectAvatar(43)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={37}
            onClick={() => handleSelectAvatar(37)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={57}
            onClick={() => handleSelectAvatar(57)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={97}
            onClick={() => handleSelectAvatar(97)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={94}
            onClick={() => handleSelectAvatar(94)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={80}
            onClick={() => handleSelectAvatar(80)}
            selectedAvatarId={selectedAvatarId}
          />
          <AvatarSelection
            id={48}
            onClick={() => handleSelectAvatar(48)}
            selectedAvatarId={selectedAvatarId}
          />
        </div>

        <Controller
          name="name"
          control={form.control}
          rules={{
            required: "نام را وارد کنید",
            maxLength: {
              value: 100,
              message: "نام نباید بیشتر از 100 حرف باشد",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                required
                label="نام"
                error={fieldState.error?.message}
                placeholder="نام مخاطب را وارد کنید"
              />
            );
          }}
        />
        <Controller
          name="email"
          control={form.control}
          rules={{
            maxLength: {
              value: 320,
              message: "ایمیل نباید بیشتر از 320 حرف باشد",
            },
            pattern: {
              value: EMAIL_REGEX,
              message: "فرمت ایمیل نادرست است",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                type="email"
                label="ایمیل"
                error={fieldState.error?.message}
                placeholder="ایمیل مخاطب را وارد کنید (اختیاری) "
              />
            );
          }}
        />
        <Controller
          name="phoneNumber"
          control={form.control}
          rules={{
            maxLength: {
              value: 15,
              message: "شماره همراه نباید بیشتر از 15 حرف باشد",
            },
            pattern: {
              value: IR_PHONE_NUMBER_REGEX,
              message: "فرمت شماره همراه نادرست است",
            },
          }}
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                label="شماره همراه"
                error={fieldState.error?.message}
                placeholder="شماره همراه مخاطب را وارد کنید (اختیاری) "
              />
            );
          }}
        />

        <Button type="submit" loading={addContactMutation.isPending}>
          افزودن
          <Plus className="w-5 h-5" />
        </Button>
      </form>
    </Modal>
  );
};

export default AddContactModal;
