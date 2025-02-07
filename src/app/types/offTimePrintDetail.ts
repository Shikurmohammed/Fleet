import { Time } from 'ngx-ui-loader';

export class OfftimePrintDetail {
  id: number;
  reqId: number;
  reqDate: string;
  reqBy: number;
  appBy: string;
  appDate: Date;
  authorizedBy: string;
  authorizedDate: string;
  vehicleNeededFrom: Time;
  vehicleNeededTo: Time;
  departureDate: Date;
  morningTime: Time;
  nightTime: Time;
  returnDate: Date;
  returnTime: Time;
  km: number;
  // this is requester's phone number
  telephone: string;
  nameOfPassengers: string;
  residentialArea: string;
  kmOnDep: number;
  plateNo: string;
  driverName: string;
  //this is driver's phone number
  tellNo: string;

  directorate: string;
  requestedTime:Time;
  requestedFor:string;
}
