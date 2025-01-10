import emptyImg from "@images/empty-state.svg";
import IconButton from "@src/components/ui/iconButton/iconButton";
import { QueryKeys } from "@src/constants/queryKeys";
import { Card } from "@src/types/card.types";
import { falsyString } from "@src/utils/empty";
import { formatCreditCard } from "@src/utils/formatter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { CreditCard, Landmark, Pencil, Plus } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { FC, useCallback, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { getCardListAPI } from "../(api)/apis";
import CardSkeleton from "./cardSkeleton";

interface CardListProps {
  contactId?: number;
  openCardForm: (card: Card | null) => void;
}

const CardList: FC<CardListProps> = ({ contactId, openCardForm }) => {
  const [_, copyText] = useCopyToClipboard();

  const handleCopyCardNumber = (value: string | undefined) => {
    if (value) {
      copyText(value);
      toast.success("شماره کارت کپی شد");
    }
  };

  const handleCopyIBAN = (value: string | undefined) => {
    if (value) {
      copyText(value);
      toast.success("شماره شبا کپی شد");
    }
  };

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.CardsList, contactId],
    queryFn: ({ pageParam }) => {
      return getCardListAPI({
        limit: 20,
        page: pageParam ?? 1,
        contactId: contactId as number,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const metadata = lastPage.data.metadata;
      console.log(metadata.totalPages, metadata.page);
      if (metadata.totalPages > metadata.page) {
        return metadata.page + 1;
      }
    },
    enabled: !!contactId,
  });

  const cardList = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.data.items) : [];
  }, [data]);

  const LoadingSkeletons = useCallback(() => {
    return Array.from({ length: 10 }).map(() => (
      <CardSkeleton key={nanoid()} />
    ));
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-lg border border-gray-300 p-4">
      <div className="flex items-center justify-between">
        <p>لیست کارت ها</p>

        <div className="flex items-center gap-4">
          <IconButton
            onClick={() => openCardForm(null)}
            className="border border-regal-blue-500"
          >
            <Plus className="w-5 h-5 text-regal-blue-500" />
          </IconButton>
        </div>
      </div>

      <InfiniteScroll
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        dataLength={cardList.length}
        loader={<LoadingSkeletons />}
        className="grid gap-4 mt-8"
      >
        {!isFetching && cardList.length === 0 && (
          <div className="lg:col-span-2 flex flex-col items-center justify-center my-24">
            <Image
              alt="کارتی یافت نشد"
              src={emptyImg}
              width={200}
              height={200}
            />
            <p className="text-sm lg:text-base">کارتی یافت نشد!</p>
          </div>
        )}

        {cardList.map((card) => (
          <div
            key={`contact-${contactId}-card-${card.id}`}
            className="grid grid-cols-4 p-2 gap-4 border border-gray-300 rounded-lg flex-wrap w-full"
          >
            <div className="col-span-3 flex flex-col md:flex-row items-start md:items-center gap-4 flex-wrap">
              <div className="flex items-start p-2 gap-4">
                <div className="bg-regal-blue-100 p-2 rounded-full">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">شماره کارت</p>
                  <button
                    onClick={() => handleCopyCardNumber(card.cardNo)}
                    className="text-xs lg:text-sm text-gray-700 hover:bg-gray-100 p-1.5 cursor-pointer transition-all active:bg-white rounded-md"
                  >
                    {formatCreditCard(card.cardNo)}
                  </button>
                </div>
              </div>
              <div className="flex items-start p-2 gap-4">
                <div className="bg-regal-blue-100 p-2 rounded-full">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">شماره شبا</p>
                  <button
                    onClick={() => handleCopyIBAN(card.iban)}
                    className="text-xs lg:text-sm text-gray-700 hover:bg-gray-100 p-1.5 cursor-pointer transition-all active:bg-white rounded-md"
                  >
                    {falsyString(card.iban)}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start lg:items-center gap-2 justify-end mt-2 lg:mt-0">
              <IconButton
                className="text-black"
                onClick={() => openCardForm(card)}
              >
                <Pencil className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
        ))}

        {isFetching && <LoadingSkeletons />}
      </InfiniteScroll>
    </div>
  );
};

export default CardList;
