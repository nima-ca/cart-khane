export interface Card {
  id: number;
  cardNo: string;
  iban?: string;
  note?: string;
  createdAt: string;
  updateAt: string;
  deletedAt: string | null;
}
