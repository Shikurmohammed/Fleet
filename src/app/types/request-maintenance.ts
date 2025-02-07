export class RequestMaintenance {
  plateNo: string;
  previousServiceMilage: number;
  previousServiceDate: Date;
  currentMilage: number;
  milageDifference: number;
  fuelGaugeInAmount: number;
  requestedBy: string;
  requestedDate: Date;
  reqDirectorate: string;
  modifiedBy: string;
  modifiedDate: Date;
  authorizedBy: string;
  authorizedDate: Date;
  workRepairRequested: string;
  kmInsp: number;
  garage: number;
  technicalBy: string;
  technicalRespondDate: Date;
  maintenanceType: string;
  //Additional details only for displaying it for user
  model: string;
  chassisNo: string;
  engineNo: string;
  status: string;
  mainType: number;
  id: number;
  mainInterval: number;
  reasonForRejection: string;
  isInsured:string;
  kmTechnical:number;
  fuelTechnical:number;
  garageName:string;
  insured:number;
}
