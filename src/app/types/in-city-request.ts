import { Time } from "ngx-ui-loader";

export class InCityRequest {
    requestBy:string;
    directorate:string;
    passenger:string;
    destination:string;
    requestedDate:Date;
    dateFrom:Date;
    requestTimeFrom:string;
    dateTo:Date;
    requestTimeTo:String;
    purpose:string;
    id:number;
    status:string;
    approvedBy:string;
    reasonForRejection:string;
    authorizedDate:Date;
    authorizedBy:string;
    approvedDate:Date;
    remark:string;
    numberOfDays:number;
    rejectedBy:string;
    passTelephone:string;
    requestedFor:string;
    requestedTime:Time;
}
