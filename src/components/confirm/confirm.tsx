import { falsyString } from "@src/utils/empty";
import { FC } from "react";
import Button from "../ui/button/button";
import Modal, { ModalProps } from "../ui/modal/modal";

interface ConfirmProps extends Pick<ModalProps, "isOpen" | "onClose"> {
  title: string;
  subTitle: string;

  cancelText?: string;
  confirmText?: string;

  onCancelClick?: () => void;
  onConfirmClick?: () => void;

  isCancelDanger?: boolean;
  isConfirmDanger?: boolean;

  isCancelLoading?: boolean;
  isConfirmLoading?: boolean;
}

const Confirm: FC<ConfirmProps> = ({
  isOpen,
  title,
  subTitle,
  cancelText,
  confirmText,
  isCancelDanger,
  isConfirmDanger,
  isCancelLoading,
  isConfirmLoading,
  onClose,
  onCancelClick,
  onConfirmClick,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} classname="px-4">
      <div className="bg-white rounded-lg flex flex-col gap-4 px-4 py-8 w-80 lg:w-[30rem] border border-gray-300">
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold">{falsyString(title)}</p>
          <p className="text-sm">{falsyString(subTitle)}</p>
        </div>

        <div className="flex items-center gap-2 self-end">
          <Button
            variant="outlined"
            onClick={onCancelClick}
            loading={isCancelLoading}
            isDanger={isCancelDanger}
          >
            {cancelText ?? "انصراف"}
          </Button>
          <Button
            variant="contained"
            onClick={onConfirmClick}
            loading={isConfirmLoading}
            isDanger={isConfirmDanger}
          >
            {confirmText ?? "تایید"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
