import { Contact } from "@src/types/contact.types";
import {
  PaginationDto,
  PaginationMetadataDto,
} from "@src/types/pagination.types";

export interface GetContactListAPIBody extends PaginationDto {
  search: string;
}

export interface GetContactListAPIResponse extends PaginationMetadataDto {
  items: Contact[];
}

export interface AddContactAPIBody {
  name: string;
  email?: string;
  phoneNumber?: string;
  avatarId: number;
}
