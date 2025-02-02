"use client";

import { Spinner } from "@src/components/icons/spinner";
import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import { QueryKeys } from "@src/constants/queryKeys";
import { checkEmptyString } from "@src/utils/empty";
import { EMAIL_REGEX, IR_PHONE_NUMBER_REGEX } from "@src/utils/regex";
import { minutes } from "@src/utils/time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getContactAPI } from "../(api)/apis";
import AvatarSelection from "../../create/(components)/avatarSelection";
import { editContactAPI } from "./(api)/apis";

export interface AddContactFormData {
  name: string;
  email: string;
  phoneNumber: string;
  avatarId: number;
}

const EditContactPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = +(params.id as string);

  const queryClient = useQueryClient();

  const redirectToContactPage = () => {
    router.push(`/app/contact/${id}`);
  };

  const form = useForm<AddContactFormData>({
    defaultValues: { email: "", name: "", phoneNumber: "", avatarId: 36 },
  });

  const { data, isFetching, isError } = useQuery({
    queryKey: [QueryKeys.Contact, id],
    queryFn: () => getContactAPI(id),
    enabled: !!id,
    gcTime: minutes(1),
    staleTime: minutes(10),
  });

  useEffect(() => {
    if (isError) {
      router.replace("/app");
      toast.error("مشکلی در دریفات اطلاعات مخاطب بوجود آمده است");
    }
  }, [isError]);

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name ?? "",
        email: data.data.email ?? "",
        avatarId: data.data.avatarId,
        phoneNumber: data.data.phoneNumber ?? "",
      });
    }
  }, [data]);

  const editContactMutation = useMutation({
    mutationFn: editContactAPI,
  });

  const submitHandler = form.handleSubmit((values) => {
    editContactMutation.mutate(
      {
        id,
        name: values.name,
        email: checkEmptyString(values.email),
        phoneNumber: checkEmptyString(values.phoneNumber),
        avatarId: values.avatarId,
      },
      {
        onSuccess() {
          form.reset();
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Contact, id] });
          redirectToContactPage();
          toast.success("مخاطب با موفقیت ویرایش شد");
        },
      }
    );
  });

  const selectedAvatarId = form.watch("avatarId");
  const handleSelectAvatar = (id: number) => {
    form.setValue("avatarId", id);
  };

  return (
    <>
      {!isFetching && data && (
        <form
          noValidate
          onSubmit={submitHandler}
          className="w-full p-6 rounded-md flex flex-col gap-4 main-container"
        >
          <div className="flex justify-between items-center mb-4 lg:mb-8">
            <span></span>
            <p className="font-bold">ویرایش مخاطب</p>

            <IconButton
              className="text-black"
              onClick={redirectToContactPage}
              type="button"
            >
              <ChevronLeft />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4 lg:gap-y-6 mt-4 lg:mt-8">
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
                    classNames={{ base: "lg:col-span-2" }}
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

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outlined"
                className="lg:max-w-40"
                onClick={redirectToContactPage}
                loading={editContactMutation.isPending}
              >
                بازگشت
              </Button>
              <Button
                type="submit"
                loading={editContactMutation.isPending}
                className="lg:max-w-40"
              >
                ویرایش
                <Pencil className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>
      )}

      {isFetching && (
        <div className="flex items-center justify-center my-20">
          <Spinner className="w-16 h-16 text-regal-blue-500" />
        </div>
      )}
    </>
  );
};

export default EditContactPage;
