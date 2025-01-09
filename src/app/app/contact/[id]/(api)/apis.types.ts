import { Card } from "@src/types/card.types";
import { Contact } from "@src/types/contact.types";
import {
  PaginationDto,
  PaginationMetadataDto,
} from "@src/types/pagination.types";

export interface GetContactAPIResponse extends Contact {}

export interface GetCardsListAPIBody extends PaginationDto {
  contactId: number;
}

export interface GetCardsListAPIResponse extends PaginationMetadataDto {
  items: Card[];
}

export interface CreateCardAPIBody
  extends Pick<Card, "cardNo" | "iban" | "note"> {
  contactId: number;
}

export interface CreateCardAPIResponse {
  id: number;
}

export interface EditCardAPIBody
  extends Pick<Card, "cardNo" | "iban" | "note" | "id"> {
  contactId: number;
}

export interface DeleteCardAPIBody {
  id: number;
  contactId: number;
}
