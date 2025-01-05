"use client";

import emptyImg from "@images/empty-state.svg";
import logoImg from "@images/logo/logo.png";
import Button from "@src/components/ui/button/button";
import IconButton from "@src/components/ui/iconButton/iconButton";
import Input from "@src/components/ui/input/input";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Plus, Search, UserCircle } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { getContactListAPI } from "./(api)/apis";
import AddContactModal from "./(components)/addContactModal";
import CardSkeleton from "./(components)/cardSkeleton";
import ContactCard from "./(components)/contactCard";

const AppPage = () => {
  const [search, setSearch] = useState("");
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [isCreateContactModalOpen, setIsCreateContactModalOpen] =
    useState(false);

  const toggleCreateContactModal = (state?: boolean) => {
    setIsCreateContactModalOpen((prevState) => {
      return state ?? !prevState;
    });
  };

  const debouncedSearch = useDebounce(search, 300);

  const { data, isFetching, refetch } = useInfiniteQuery({
    queryKey: ["contact-list", debouncedSearch],
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
      if (metadata.totalPages < metadata.page) {
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
      <div className="flex items-center justify-between w-full border-b border-gray-200 px-4">
        <div className="flex items-center justify-center py-4">
          <Image src={logoImg} alt="کارت خانه" width={40} height={40} />
          <h1 className="font-bold text-lg mt-2 text-regal-blue-500">
            کارت خانه
          </h1>
        </div>
        <IconButton className="text-regal-blue-500 mt-2" type="button">
          <UserCircle />
        </IconButton>
      </div>

      <div className="w-full px-4 flex flex-col lg:flex-row gap-4">
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="جستجوی نام، شماره همراه و ایمیل مخاطب"
          endIcon={<Search className="text-regal-blue-500 w-5 h-5" />}
        />
        <Button
          className="w-full lg:w-60"
          onClick={() => toggleCreateContactModal(true)}
        >
          افزودن مخاطب
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 px-4 gap-4">
        {!isFetching && isContactListEmpty && (
          <div className="lg:col-span-2 flex flex-col items-center justify-center my-24">
            <Image
              alt="مخاطبی یافت نشد"
              src={emptyImg}
              width={200}
              height={200}
            />
            <p className="font-bold text-sm lg:text-base">مخاطبی یافت نشد!</p>
          </div>
        )}
        {isFetching && <Skeletons />}
        {!isFetching &&
          contactList.map((contact) => (
            <ContactCard key={`contact-${contact.id}`} info={contact} />
          ))}
      </div>

      <AddContactModal
        refetch={refetch}
        isOpen={isCreateContactModalOpen}
        onClose={() => toggleCreateContactModal(false)}
      />
    </div>
  );
};

export default AppPage;
