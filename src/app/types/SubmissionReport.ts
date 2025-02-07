
export class SubmissionReport{
    id: number;
    requestId: number;
    reqDirectorate: string;
    requestedDate: Date;

    maintenanceCost: number;
    dateTaken: string;
    dateFromGarage: string;
    dateFromTechnical: string;
    currentMilege: number;
    petrolAmount: number;
  
    vehicleReceivedBy: string;
    vehicleGivenBy: string;
    vehicleReceivedDate: Date;
    garage: number;
    plateNo: string;
    model: string;
    technicalBy: string;
    technicalRespondDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
    authorizedBy: string;
    authorizedDate: Date;
    status:string;
}