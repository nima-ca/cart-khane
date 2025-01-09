import { isShebaValid, verifyCardNumber } from "@persian-tools/persian-tools";
import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import Modal from "@src/components/ui/modal/modal";
import { QueryKeys } from "@src/constants/queryKeys";
import { Card } from "@src/types/card.types";
import { checkEmptyString } from "@src/utils/empty";
import {
  formatCreditCard,
  formatIBAN,
  removeDashFromCreditCard,
} from "@src/utils/formatter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash, X } from "lucide-react";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createCardAPI, deleteCardAPI, editCardAPI } from "../(api)/apis";

interface CardFormData {
  cardNo: string;
  iban: string;
  note: string;
}

interface CardFormProps {
  cardInfo: Card | null;
  isOpen: boolean;
  onClose: () => void;
  contactId: number;
}

const formDefaultValues: CardFormData = { cardNo: "", iban: "", note: "" };

const CardForm: FC<CardFormProps> = ({
  isOpen,
  cardInfo,
  onClose,
  contactId,
}) => {
  const queryClient = useQueryClient();
  const refreshCardList = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.CardsList, contactId],
    });
  };

  const form = useForm<CardFormData>({ defaultValues: formDefaultValues });

  useEffect(() => {
    if (cardInfo) {
      form.reset({ ...cardInfo, cardNo: formatCreditCard(cardInfo.cardNo) });
    }
  }, [cardInfo]);

  const closeModal = () => {
    onClose();
    form.reset(formDefaultValues);
  };

  const createCardMutation = useMutation({
    mutationFn: createCardAPI,
    onSuccess() {
      closeModal();
      refreshCardList();
      toast.success("کارت با موفقیت افزوده شد");
    },
  });

  const editCardMutation = useMutation({
    mutationFn: editCardAPI,
    onSuccess() {
      closeModal();
      refreshCardList();
      toast.success("کارت با موفقیت ویرایش شد");
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: deleteCardAPI,
    onSuccess() {
      closeModal();
      refreshCardList();
      toast.success("کارت با موفقیت حذف شد");
    },
  });

  const isEditMode = !!cardInfo;

  const submitHandler = form.handleSubmit((values) => {
    const formattedValues = {
      contactId,
      note: checkEmptyString(values.note),
      iban: checkEmptyString(formatIBAN(values.iban)),
      cardNo: removeDashFromCreditCard(values.cardNo),
    };

    if (isEditMode) {
      editCardMutation.mutate({
        id: cardInfo.id,
        ...formattedValues,
      });
      return;
    }

    createCardMutation.mutate(formattedValues);
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
          <p className="font-bold">
            {isEditMode ? "ویرایش کارت" : "افزودن کارت جدید"}
          </p>

          <IconButton className="text-black" onClick={closeModal} type="button">
            <X />
          </IconButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4 lg:gap-y-6 mt-4 lg:mt-8">
          <Controller
            name="cardNo"
            control={form.control}
            rules={{
              required: "شماره کارت را وارد کنید",
              validate: (value) => {
                if (!verifyCardNumber(+removeDashFromCreditCard(value))) {
                  return "فرمت شماره کارت اشتباه است";
                }
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  required
                  onChange={(e) =>
                    field.onChange(formatCreditCard(e.target.value))
                  }
                  label="شماره کارت"
                  error={fieldState.error?.message}
                  placeholder="شماره کارت را وارد کنید"
                />
              );
            }}
          />
          <Controller
            name="iban"
            control={form.control}
            rules={{
              validate: (value) => {
                if (value !== "" && !isShebaValid(formatIBAN(value))) {
                  return "فرمت شماره شبا اشتباه است";
                }
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(formatIBAN(e.target.value))}
                  label="شماره شبا"
                  error={fieldState.error?.message}
                  placeholder="شماره شبا را وارد کنید (اختیاری) "
                />
              );
            }}
          />
          <Controller
            name="note"
            control={form.control}
            rules={{
              maxLength: {
                value: 1000,
                message: "یادداشت نباید بیشتر از 1000 حرف باشد",
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  label="یادداشت"
                  error={fieldState.error?.message}
                  placeholder="یادداشت را وارد کنید (اختیاری) "
                  classNames={{ base: "lg:col-span-2" }}
                />
              );
            }}
          />

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              className="lg:max-w-40"
              loading={
                createCardMutation.isPending || editCardMutation.isPending
              }
              disabled={!form.formState.isDirty}
            >
              {isEditMode ? "ویرایش" : "افزودن"}
              {isEditMode ? (
                <Pencil className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </Button>

            {isEditMode && (
              <Button
                isDanger
                type="button"
                className="lg:max-w-40"
                loading={deleteCardMutation.isPending}
                disabled={
                  createCardMutation.isPending || editCardMutation.isPending
                }
                onClick={() =>
                  deleteCardMutation.mutate({ id: cardInfo.id, contactId })
                }
              >
                حذف
                <Trash className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CardForm;
