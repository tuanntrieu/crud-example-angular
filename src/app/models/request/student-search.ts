import { PaginationRequest } from "./pagination-request";

export class StudentSearch extends PaginationRequest {
    name!: string;
    address!: string;
    gender!: string;
    startDate!: Date;
    endDate!: Date;
}
