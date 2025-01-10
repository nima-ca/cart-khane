"use client";

import emptyImg from "@images/empty-state.svg";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import { QueryKeys } from "@src/constants/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Plus, Search } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getContactListAPI } from "./(api)/apis";
import CardSkeleton from "./(components)/cardSkeleton";
import ContactCard from "./(components)/contactCard";

const AppPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 300);

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.ContactList, debouncedSearch],
    queryFn: ({ pageParam }) => {
      return getContactListAPI({
        limit: 20,
        page: pageParam ?? 1,
        search: debouncedSearch,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const metadata = lastPage.data.metadata;
      if (metadata.totalPages > metadata.page) {
        return metadata.page + 1;
      }
    },
  });

  const Skeletons = useCallback(() => {
    return Array.from({ length: 20 }).map(() => {
      return <CardSkeleton key={`card-skeleton-${nanoid()}`} />;
    });
  }, []);

  const contactList = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.data.items) : [];
  }, [data]);

  const isContactListEmpty = contactList.length === 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full px-4 flex flex-row gap-4">
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="جستجوی نام، شماره همراه و ایمیل مخاطب"
          endIcon={<Search className="text-regal-blue-500 w-5 h-5" />}
        />
        <IconButton
          onClick={() => router.push("/app/contact/create")}
          className="border border-regal-blue-500"
        >
          <Plus className="w-5 h-5 text-regal-blue-500" />
        </IconButton>
      </div>

      <InfiniteScroll
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        dataLength={contactList.length}
        loader={<Skeletons />}
        className="grid grid-cols-1 lg:grid-cols-2 px-4 gap-2"
      >
        {!isFetching && isContactListEmpty && (
          <div className="lg:col-span-2 flex flex-col items-center justify-center my-24">
            <Image
              alt="مخاطبی یافت نشد"
              src={emptyImg}
              width={200}
              height={200}
            />
            <p className="text-sm lg:text-base">مخاطبی یافت نشد!</p>
          </div>
        )}

        {contactList.map((contact) => (
          <ContactCard
            key={`contact-${contact.id}`}
            info={contact}
            onClick={() => {
              router.push(`/app/contact/${contact.id}`);
            }}
          />
        ))}

        {isFetching && <Skeletons />}
      </InfiniteScroll>
    </div>
  );
};

export default AppPage;
