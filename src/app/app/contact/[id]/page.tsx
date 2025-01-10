"use client";

import Confirm from "@src/components/confirm/confirm";
import CopyButton from "@src/components/copyButton/copyButton";
import { Spinner } from "@src/components/icons/spinner";
import IconButton from "@src/components/ui/iconButton/iconButton";
import { QueryKeys } from "@src/constants/queryKeys";
import { Card } from "@src/types/card.types";
import { minutes } from "@src/utils/time";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteContactAPI, getContactAPI } from "./(api)/apis";
import CardForm from "./(components)/cardForm";
import CardList from "./(components)/cardList";

interface CardFormModal {
  isOpen: boolean;
  selectedCard: Card | null;
}

const ContactPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = +(params.id as string);

  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [cardFormState, setCardFormState] = useState<CardFormModal>({
    isOpen: false,
    selectedCard: null,
  });

  const queryClient = useQueryClient();
  const deleteContactMutation = useMutation({
    mutationFn: deleteContactAPI,
    onSuccess() {
      toast.success("مخاطب با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ContactList] });
      setConfirmDeleteOpen(false);
      router.replace("/app");
    },
  });

  const openCardForm = (card: Card | null) => {
    setCardFormState({
      isOpen: true,
      selectedCard: card,
    });
  };

  const closeCardForm = () => {
    setCardFormState({
      isOpen: false,
      selectedCard: null,
    });
  };

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
      toast.error("مشکلی در دریافت اطلاعات مخاطب بوجود آمده است");
    }
  }, [isError]);

  const contactInfo = data?.data;
  const avatarUrl = contactInfo?.avatarId
    ? `https://avatar.iran.liara.run/public/${contactInfo.avatarId}`
    : `https://avatar.iran.liara.run/username?username=${contactInfo?.name}`;

  return (
    <>
      {!isFetching && data && (
        <div className="flex flex-col px-4 gap-4">
          <div className="flex flex-col bg-white rounded-lg border border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <Image
                src={avatarUrl}
                alt={contactInfo?.name ?? ""}
                className="w-12 h-12 lg:h-16 lg:w-16"
                width={64}
                height={64}
              />

              <div className="flex items-center gap-2">
                <IconButton
                  className="text-black"
                  onClick={() => router.push(`/app/contact/${id}/edit`)}
                >
                  <Pen className="w-5 h-5" />
                </IconButton>

                <IconButton
                  className="text-red-500"
                  onClick={() => setConfirmDeleteOpen(true)}
                >
                  <Trash className="w-5 h-5" />
                </IconButton>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm">
                <span className="font-bold ml-2">نام:</span>
                {contactInfo?.name}
              </p>
              {contactInfo?.email && (
                <div className="flex justify-between items-center flex-wrap">
                  <p className="text-sm">
                    <span className="font-bold ml-2">ایمیل:</span>
                    {contactInfo?.email}
                  </p>
                  <CopyButton textToCopy={contactInfo?.name} />
                </div>
              )}
              {contactInfo?.phoneNumber && (
                <div className="flex justify-between items-center flex-wrap">
                  <p className="text-sm">
                    <span className="font-bold ml-2">شماره همراه:</span>
                    {contactInfo?.phoneNumber}
                  </p>
                  <CopyButton textToCopy={contactInfo?.name} />
                </div>
              )}
            </div>
          </div>

          <CardList contactId={id} openCardForm={openCardForm} />
        </div>
      )}

      {isFetching && (
        <div className="flex items-center justify-center my-20">
          <Spinner className="w-16 h-16 text-regal-blue-500" />
        </div>
      )}

      <CardForm
        contactId={id}
        onClose={closeCardForm}
        isOpen={cardFormState.isOpen}
        cardInfo={cardFormState.selectedCard}
      />

      <Confirm
        title="حذف مخاطب"
        confirmText="حذف"
        subTitle="آیا از حذف مخاطب مطمئن هستید؟"
        isConfirmDanger
        isCancelDanger
        isOpen={isConfirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onCancelClick={() => setConfirmDeleteOpen(false)}
        onConfirmClick={() => {
          deleteContactMutation.mutate(id);
        }}
        isConfirmLoading={deleteContactMutation.isPending}
      />
    </>
  );
};

export default ContactPage;
