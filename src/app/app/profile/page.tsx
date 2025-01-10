"use client";

import Confirm from "@src/components/confirm/confirm";
import { Spinner } from "@src/components/icons/spinner";
import Button from "@src/components/ui/button/button";
import { QueryKeys } from "@src/constants/queryKeys";
import { logout } from "@src/utils/logout";
import { minutes } from "@src/utils/time";
import { concatName, getAvatarUrl } from "@src/utils/user";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserProfileAPI } from "./(api)/apis";
import DeleteAccountConfirm from "./(components)/deleteAccountConfirm";

const ProfilePage = () => {
  const router = useRouter();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isDeleteAccountConfirmOpen, setIsDeleteAccountConfirmOpen] =
    useState(false);

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

  const userInfo = data?.data;
  const fullName = concatName(userInfo?.firstName, userInfo?.lastName);
  const avatarUrl = getAvatarUrl(fullName, userInfo?.avatarId);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center my-20">
        <Spinner className="w-16 h-16 text-regal-blue-500" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col px-4 gap-4">
        <div className="flex flex-col bg-white rounded-lg border border-gray-300 p-4 gap-10">
          <div className="flex items-center gap-4">
            <Image
              src={avatarUrl}
              alt={fullName ?? ""}
              className="w-12 h-12 lg:h-16 lg:w-16"
              width={64}
              height={64}
            />
            <div className="flex flex-col gap-2 mt-4">
              {fullName && <p className="text-sm">{fullName}</p>}
              {userInfo?.phoneNumber && (
                <p className="text-sm">{userInfo?.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="border rounded-lg border-gray-300 flex flex-col items-start p-4 gap-2">
            <button
              onClick={() => router.push("/app/profile/edit")}
              className="hover:bg-gray-100 px-2 font-medium text-sm lg:text-base transition-all w-full py-2 text-right flex items-center justify-between rounded-lg"
            >
              ویرایش پروفایل
              <Pencil className="w-5 h-5" />
            </button>

            <span className="border-t border-gray-300 w-full" />

            <button
              onClick={() => setIsDeleteAccountConfirmOpen(true)}
              className="hover:bg-red-100 px-2 font-medium text-sm lg:text-base transition-all w-full text-right py-2 text-red-500 flex items-center justify-between rounded-lg"
            >
              حذف حساب کاربری
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <Button
            isDanger
            variant="outlined"
            onClick={() => setIsLogoutConfirmOpen(true)}
          >
            خروج از کارت خانه
          </Button>
        </div>
      </div>

      <Confirm
        isCancelDanger
        isConfirmDanger
        confirmText="خروج"
        title="خروج از کارت خانه"
        subTitle="آیا مطمئن هستید که میخواهید از کارت خانه خارج شوید؟"
        isOpen={isLogoutConfirmOpen}
        onClose={() => setIsLogoutConfirmOpen(false)}
        onCancelClick={() => setIsLogoutConfirmOpen(false)}
        onConfirmClick={() => logout()}
      />

      <DeleteAccountConfirm
        isOpen={isDeleteAccountConfirmOpen}
        phoneNumber={userInfo?.phoneNumber ?? ""}
        onClose={() => setIsDeleteAccountConfirmOpen(false)}
      />
    </>
  );
};

export default ProfilePage;
