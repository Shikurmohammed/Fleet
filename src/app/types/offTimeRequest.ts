import { Time } from 'ngx-ui-loader';

export class OffTimeRequest {
  id: number;
  reqDir: string;
  reqBy: string;
  directorate: number;
  date: Date;
  vehicleNeededFrom: Time;
  vehicleNeededTo: Time;
  nameOfPassengers: string;
  residentialArea: string;
  departureDate: Date;
  morningTime: Time;
  nightTime: Time;
  returnDate: Date;
  returnTime: Time;
  km: number;
  reason: string;
  telephone: string;
  status: string;
  approvedBy: string;
  approvedDate: string;
  reasonForRejection: string;
  authorizedBy: string;
  authorizedDate: string;
  requestedFor:string;
  requestedTime:Time;
}
