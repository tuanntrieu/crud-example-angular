export class CommonResponse<T> {
    status !:string;
    statusCode!:number;
    message!:T;
    data!:T;
}
