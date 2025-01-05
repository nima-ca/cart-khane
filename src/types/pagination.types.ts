export interface PaginationDto {
  page: number;
  limit: number;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginationMetadataDto {
  metadata: PaginationMetadata;
}
