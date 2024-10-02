export class PaginationResponse<T> {
    totalElements!:number;
    totalPages!:number;
    pageNo!:number;
    pageSize!:number;
    items!:T[];
}
