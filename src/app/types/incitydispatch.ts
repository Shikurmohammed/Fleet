import { Time } from "ngx-ui-loader";

export class Incitydispatch {
    id: number;
    plateNumber:string;
    driverName:string;
    departureDate:Date;
    departureTime:string;
    departureKm:number;
    returnDate:Date;
    returnTime:string;
    returnKm:number;
    approvedBy:string;
    approvedDate:Date;
    remark:string;
    reasonForRejection:string;
    status:string;
    requesterId:number;
    requestBy:string;
    kmDifference:number;
}
