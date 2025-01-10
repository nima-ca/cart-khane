"use client";

import { Spinner } from "@src/components/icons/spinner";
import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import { QueryKeys } from "@src/constants/queryKeys";
import { minutes } from "@src/utils/time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getUserProfileAPI } from "../(api)/apis";
import AvatarSelection from "../../contact/create/(components)/avatarSelection";
import { editUserAPI } from "./(api)/apis";

export interface EditProfileFormData {
  firstName: string;
  lastName: string;
  avatarId: number;
}

const EditProfilePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const redirectToProfilePage = () => {
    router.push("/app/profile");
  };

  const defaultAvatarId = 36;

  const form = useForm<EditProfileFormData>({
    defaultValues: { avatarId: defaultAvatarId, firstName: "", lastName: "" },
  });

  const { data, isFetching, isError } = useQuery({
    queryKey: [QueryKeys.Profile],
    queryFn: getUserProfileAPI,
    gcTime: minutes(1),
    staleTime: minutes(10),
  });

  useEffect(() => {
    if (isError) {
      router.replace("/app");
      toast.error("مشکلی در دریافت اطلاعات کاربر بوجود آمده است");
    }
  }, [isError]);

  useEffect(() => {
    if (data?.data) {
      form.reset({
        avatarId: data.data.avatarId ?? defaultAvatarId,
        firstName: data.data.firstName ?? "",
        lastName: data.data.lastName ?? "",
      });
    }
  }, [data]);

  const editProfileMutation = useMutation({
    mutationFn: editUserAPI,
  });

  const submitHandler = form.handleSubmit((values) => {
    editProfileMutation.mutate(
      {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        avatarId: values.avatarId,
      },
      {
        onSuccess() {
          form.reset();
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Profile] });
          redirectToProfilePage();
          toast.success("پروفایل با موفقیت ویرایش شد");
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
            <p className="font-bold">ویرایش پروفایل</p>

            <IconButton
              className="text-black"
              onClick={redirectToProfilePage}
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
              name="firstName"
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
                    placeholder="نام خود را وارد کنید"
                  />
                );
              }}
            />
            <Controller
              name="lastName"
              control={form.control}
              rules={{
                required: "نام خانوادگی را وارد کنید",
                maxLength: {
                  value: 100,
                  message: "نام خانوادگی نباید بیشتر از 100 حرف باشد",
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    label="نام خانوادگی"
                    error={fieldState.error?.message}
                    placeholder="نام خانوادگی را وارد کنید"
                  />
                );
              }}
            />

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outlined"
                className="lg:max-w-40"
                onClick={redirectToProfilePage}
                loading={editProfileMutation.isPending}
              >
                بازگشت
              </Button>
              <Button
                type="submit"
                loading={editProfileMutation.isPending}
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

export default EditProfilePage;
