import { AddContactAPIBody } from "../../../create/(api)/apis.types";

export interface EditContactAPIBody extends AddContactAPIBody {
  id: number;
}
