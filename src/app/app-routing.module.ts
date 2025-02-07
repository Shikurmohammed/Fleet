import { MaintenancecostreportComponent } from './technical-service/reports/maintenancecostreport/maintenancecostreport.component';
import { ManagecompletionComponent } from './technical-service/maint-requests/manage/managecompletion/managecompletion.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ManageuserComponent } from './user/manageuser/manageuser.component';
import { VehcilefieldRequestComponent } from './request/field/vehcilefield-request/vehcilefield-request.component';
import { AirplanefieldRequestComponent } from './request/field/airplanefield-request/airplanefield-request.component';
import { IncityRequestComponent } from './request/incity-request/incity-request.component';
import { OfftimeRequestComponent } from './request/offtime-request/offtime-request.component';
import { MyfieldrequestComponent } from './request/field/myfieldrequest/myfieldrequest.component';
import { DispatcherFieldApprovalComponent } from './request/field/dispatcher-field-approval/dispatcher-field-approval.component';
const role: any = sessionStorage.getItem('role');
import { ManageRequestComponent } from './request/offtime-request/manage-request/manage-request.component';
import { ViewincityrequestComponent } from './request/incity-request/viewincityrequest/viewincityrequest.component';
import { IncityDispatcherComponent } from './dispatcher/incity-dispatcher/incity-dispatcher.component';
import { IncityManageDispatchComponent } from './dispatcher/incity-dispatcher/incity-manage-dispatch/incity-manage-dispatch.component';
import { OfftimeDispatcherComponent } from './dispatcher/offtime-dispatcher/offtime-dispatcher.component';
import { OfftimeManageDispatchComponent } from './dispatcher/offtime-dispatcher/offtime-manage-dispatch/offtime-manage-dispatch.component';
import { FieldDispatcherComponent } from './dispatcher/field-dispatcher/field-dispatcher.component';
import { FieldManageDispatchComponent } from './dispatcher/field-dispatcher/field-manage-dispatch/field-manage-dispatch.component';
import { VehicleComponent } from './officer/vehicle/vehicle.component';
import { ManageVehicleComponent } from './officer/vehicle/manage-vehicle/manage-vehicle.component';
import { DriverComponent } from './officer/driver/driver.component';
import { ManageDriverComponent } from './officer/driver/manage-driver/manage-driver.component';
import { AuthorizeRequestComponent } from './request/authorize-request/authorize-request.component';
import { FieldRequestDetailComponent } from './request/field/field-request-detail/field-request-detail.component';
import { AuthorizeIncityComponent } from './request/authorize-request/authorize-incity/authorize-incity.component';
import { AuthorizeFieldComponent } from './request/authorize-request/authorize-field/authorize-field.component';
import { AuthorizeOfftimeComponent } from './request/authorize-request/authorize-offtime/authorize-offtime.component';
import { AdminHomeComponent } from './user/admin-home/admin-home.component';
import { PrintFieldComponent } from './request/field/print-field/print-field.component';
import { PrintIncityComponent } from './request/incity-request/print-incity/print-incity.component';
import { PrintOfftimeComponent } from './request/offtime-request/print-offtime/print-offtime.component';
import { RequestHomeComponent } from './request/request-home/request-home.component';
import { RequesterGuard } from './guards/requester.guard';
import { DispatcherHomeComponent } from './dispatcher/dispatcher-home/dispatcher-home.component';
import { ViewPooledVehicleComponent } from './dispatcher/dispatcher-home/view-pooled-vehicle/view-pooled-vehicle.component';
import { ViewDisposedVehicleComponent } from './dispatcher/dispatcher-home/view-disposed-vehicle/view-disposed-vehicle.component';
import { ViewMaintenanceVehicleComponent } from './dispatcher/dispatcher-home/view-maintenance-vehicle/view-maintenance-vehicle.component';
import { ViewDispatchedVehicleComponent } from './dispatcher/dispatcher-home/view-dispatched-vehicle/view-dispatched-vehicle.component';
import { OfficerHomeComponent } from './officer/officer-home/officer-home.component';
import { InsuranceDueComponent } from './officer/officer-home/insurance-due/insurance-due.component';
import { ServiceMillageDueComponent } from './officer/officer-home/service-millage-due/service-millage-due.component';
import { TyreMillageDueComponent } from './officer/officer-home/tyre-millage-due/tyre-millage-due.component';
import { FieldModifyDispatchedComponent } from './dispatcher/field-dispatcher/field-modify-dispatched/field-modify-dispatched.component';
import { IncityModifyDispatchedComponent } from './dispatcher/incity-dispatcher/incity-modify-dispatched/incity-modify-dispatched.component';
import { OfftimeModifyDispatchedComponent } from './dispatcher/offtime-dispatcher/offtime-modify-dispatched/offtime-modify-dispatched.component';
import { ManageMaintenanceRequestComponent } from './officer/officer-home/manage-maintenance-request/manage-maintenance-request.component';
import { RequestMaintenanceComponent } from './request/request-maintenance/request-maintenance.component';
import { ManageCustMaintenanceRequestComponent } from './request/request-maintenance/manage-cust-maintenance-request/manage-cust-maintenance-request.component';
import { GarageComponent } from './technical-service/garage/garage.component';
import { ManageGarageComponent } from './technical-service/garage/manage-garage/manage-garage.component';
import { MaintRequestsComponent } from './technical-service/maint-requests/maint-requests.component';
import { CompletionComponent } from './technical-service/maint-requests/completion/completion.component';
import { VerifiedRequestsComponent } from './gs-authorizer/verified-requests/verified-requests.component';
import { MaintCompletionComponent } from './gs-authorizer/maint-completion/maint-completion.component';
import { CustodianRequestsComponent } from './mechanic/custodian-requests/custodian-requests.component';
import { MechanicRequestsComponent } from './mechanic/mechanic-requests/mechanic-requests.component';
import { MechanicCompletionComponent } from './mechanic/mechanic-completion/mechanic-completion.component';
import { UnverifiedCustodianRequestComponent } from './mechanic/Mechanic-Reports/unverified-custodian-request/unverified-custodian-request.component';
import { MechanicRequestReportComponent } from './mechanic/Mechanic-Reports/mechanic-request-report/mechanic-request-report.component';
import { MaintenanceSubmissionReportComponent } from './mechanic/Mechanic-Reports/maintenance-submission-report/maintenance-submission-report.component';
import { MaintCompletionReportComponent } from './gs-authorizer/reports/maint-completion-report/maint-completion-report.component';
import { MaintRequestsReportComponent } from './gs-authorizer/reports/maint-requests-report/maint-requests-report.component';
import { MechanicHomeComponent } from './mechanic/mechanic-home/mechanic-home.component';
import { TechnicalHomeComponent } from './technical-service/technical-home/technical-home.component';
import { GsAuthorizerHomeComponent } from './gs-authorizer/gs-authorizer-home/gs-authorizer-home.component';
import { DispatcherreportsComponent } from './dispatcher/dispatcher-reports/dispatcherreports.component';
import { DispatchListingReportComponent } from './dispatcher/dispatch-listing-report/dispatch-listing-report.component';
import { MaintenanceReportComponent } from './request/maintenance-report/maintenance-report.component';
import { UserListingReportComponent } from './user/user-listing-report/user-listing-report.component';
import { OfftimeReportComponent } from './request/authorize-request/authorizer-report/offtime-report/offtime-report.component';
import { IncityReportComponent } from './request/authorize-request/authorizer-report/incity-report/incity-report.component';
import { FieldReportComponent } from './request/authorize-request/authorizer-report/field-report/field-report.component';
import { DelegateAuthorizerComponent } from './request/authorize-request/delegate-authorizer/delegate-authorizer.component';
import { BackupComponent } from './user/back-restore/backup/backup.component';
import { RestoreComponent } from './user/back-restore/restore/restore.component';
import { DispatcherGuard } from './guards/dispatcher.guard';
import { OfficerGuard } from './guards/officer.guard';
import { AuthorizerGuard } from './guards/authorizer.guard';
import { TechnicalGuard } from './guards/technical.guard';
import { GsAuthorizerGuard } from './guards/gs-authorizer.guard';
import { MechanicGuard } from './guards/mechanic.guard';
import { OfficerCustodianGuard } from './guards/officer-custodian.guard';
import { IncityComponent } from './dispatcher/dispatcher-print/incity/incity.component';
import { OfftimeComponent } from './dispatcher/dispatcher-print/offtime/offtime.component';
import { FieldComponent } from './dispatcher/dispatcher-print/field/field.component';
import { UpdatePriceComponent } from './dispatcher/dispatcher-fuel/update-price/update-price.component';
import { DispatcherRequesterGuard } from './guards/dispatcher-requester.guard';
import { AdvancePrintComponent } from './dispatcher/field-dispatcher/field-modify-dispatched/advance-print/advance-print.component';
import { CreateAdvComponent } from './advance-payment/create-adv/create-adv.component';
import { ManageAdvComponent } from './advance-payment/manage-adv/manage-adv.component';
import { SettleAdvancePaymentComponent } from './settlement-officers/settle-advance-payment/settle-advance-payment.component';
import { SettlementOfficerGuard } from './guards/settlement-officer.guard';
import { AuthorizeAdvComponent } from './advance-payment/authorize-adv/authorize-adv.component';
import { SettlementPrintComponent } from './settlement-officers/settlement-print/settlement-print.component';
import { SettlementRequesterGuard } from './guards/settlement-requester.guard';
import { SettlementOfficerHomeComponent } from './settlement-officers/settlement-officer-home/settlement-officer-home.component';
import { AuthorizerRequesterGuard } from './guards/authorizer-requester.guard';
import { CheckOfftimeComponent } from './officer/check-requests/check-offtime/check-offtime.component';
import { CheckFieldComponent } from './officer/check-requests/check-field/check-field.component';
import { TechnicalPrintComponent } from './technical-service/technical-print/technical-print.component';
import { TechnicalGsAuthGuard } from './guards/technical-gsauth';
import { MechanicGsAuthGuard } from './guards/mechanic-gsauth';
import { DelegateGsauthComponent } from './gs-authorizer/delegate-gsauth/delegate-gsauth.component';
import { DelegateOfficerComponent } from './officer/delegate-officer/delegate-officer.component';
import { DispatcherOfficerMechanicGuard } from './guards/dispatcher-officer-mechanic.guard';
import { DispatcherOfficerGuard } from './guards/dispatcher-officer';
import { MapApproverComponent } from './user/map-approver/map-approver.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'adminhome',
    component: AdminHomeComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'requesthome',
    component: RequestHomeComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'dispatcherhome',
    component: DispatcherHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'manageuser',
    component: ManageuserComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'changePassword',
    component: ChangepasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vehicleFieldRequest',
    component: VehcilefieldRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'vehicleFieldRequest/:id',
    component: VehcilefieldRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'airplaneFieldRequest',
    component: AirplanefieldRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'incityRequest',
    component: IncityRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'incityRequest/:id',
    component: IncityRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'offtimeRequest',
    component: OfftimeRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'myfieldrequest',
    component: MyfieldrequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'fieldrequestDetail/:id',
    component: FieldRequestDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'fieldapproval/:id',
    component: DispatcherFieldApprovalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manageofftimerequest',
    component: ManageRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },

  {
    path: 'viewincityrequest',
    component: ViewincityrequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'editRequest/:id',
    component: OfftimeRequestComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'incityDispatcher',
    component: IncityDispatcherComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'incityDispatcher/:id',
    component: IncityDispatcherComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'manageIncityDispatch',
    component: IncityManageDispatchComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'manageIncityDispatch/:id',
    component: IncityManageDispatchComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'offtimeDispatcher',
    component: OfftimeDispatcherComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'manageOfftimeDispatch/:id',
    component: OfftimeManageDispatchComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'fieldDispatcher',
    component: FieldDispatcherComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'fieldDispatcher/:id',
    component: FieldDispatcherComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'manageFieldDispatch',
    component: FieldManageDispatchComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'manageFieldDispatch/:id',
    component: FieldManageDispatchComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'modifyFieldDispatch',
    component: FieldModifyDispatchedComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'modifyIncityDispatch',
    component: IncityModifyDispatchedComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'modifyOfftimeDispatch',
    component: OfftimeModifyDispatchedComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'vehicleAdd',
    component: VehicleComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'manageVehicle',
    component: ManageVehicleComponent,
    canActivate: [AuthGuard, DispatcherOfficerMechanicGuard],
  },
  {
    path: 'driverAdd',
    component: DriverComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'driverAdd/:id',
    component: DriverComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'manageDriver',
    component: ManageDriverComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'manageDriver/:id',
    component: ManageDriverComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'authorizeRequest',
    component: AuthorizeRequestComponent,
    canActivate: [AuthGuard, AuthorizerGuard],
  },
  {
    path: 'authorizeIncityRequest',
    component: AuthorizeIncityComponent,
    canActivate: [AuthGuard, AuthorizerRequesterGuard],
  },
  {
    path: 'authorizeOfftimeRequest',
    component: AuthorizeOfftimeComponent,
    canActivate: [AuthGuard, AuthorizerRequesterGuard],
  },
  {
    path: 'authorizeFieldRequest',
    component: AuthorizeFieldComponent,
    canActivate: [AuthGuard, AuthorizerRequesterGuard],
  },
  {
    path: 'printField/:id',
    component: PrintFieldComponent,
    canActivate: [AuthGuard, DispatcherRequesterGuard],
  },
  {
    path: 'printIncity/:id',
    component: PrintIncityComponent,
    canActivate: [AuthGuard, DispatcherRequesterGuard],
  },
  {
    path: 'printOfftime/:id',
    component: PrintOfftimeComponent,
    canActivate: [AuthGuard, DispatcherRequesterGuard],
  },
  {
    path: 'pooledVehicle',
    component: ViewPooledVehicleComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'disposedVehicle',
    component: ViewDisposedVehicleComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'maintenanceVehicle',
    component: ViewMaintenanceVehicleComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'dispatchedVehicle',
    component: ViewDispatchedVehicleComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'officerHome',
    component: OfficerHomeComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'insuranceDue',
    component: InsuranceDueComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'serviceMillageDue',
    component: ServiceMillageDueComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'tyreMillageDue',
    component: TyreMillageDueComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'officerRequest',
    component: ManageMaintenanceRequestComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'maintenanceRequest',
    component: RequestMaintenanceComponent,
    canActivate: [AuthGuard, OfficerCustodianGuard],
  },
  {
    path: 'custodianRequest',
    component: ManageCustMaintenanceRequestComponent,
    canActivate: [AuthGuard, OfficerCustodianGuard],
  },
  {
    path: 'addGarage',
    component: GarageComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'addGarage/:id',
    component: GarageComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'manageGarage',
    component: ManageGarageComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'maintRequest',
    component: MaintRequestsComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'maintCompletion',
    component: CompletionComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'verifiedRequests',
    component: VerifiedRequestsComponent,
    canActivate: [AuthGuard, MechanicGsAuthGuard],
  },
  {
    path: 'maintCompletionAuth',
    component: MaintCompletionComponent,
    canActivate: [AuthGuard, MechanicGsAuthGuard],
  },
  {
    path: 'manageCompletion',
    component: ManagecompletionComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'maintenancecostReport',
    component: MaintenancecostreportComponent,
    canActivate: [AuthGuard, TechnicalGsAuthGuard],
  },
  {
    path: 'dispatcherReport',
    component: DispatcherreportsComponent,
    canActivate: [AuthGuard, DispatcherOfficerMechanicGuard],
  },
  {
    path: 'mechanicCustodianRequests',
    component: CustodianRequestsComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'mechanicRequests',
    component: MechanicRequestsComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'mechanicSubmission',
    component: MechanicCompletionComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'unverifiedMaintenanceRequest',
    component: UnverifiedCustodianRequestComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'mechanicRequestReport',
    component: MechanicRequestReportComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'maintenanceSubmissionReport',
    component: MaintenanceSubmissionReportComponent,
    canActivate: [AuthGuard, MechanicGuard],
  },
  {
    path: 'maintRequestReport',
    component: MaintRequestsReportComponent,
    canActivate: [AuthGuard, GsAuthorizerGuard],
  },
  {
    path: 'maintCompletionReport',
    component: MaintCompletionReportComponent,
    canActivate: [AuthGuard, GsAuthorizerGuard],
  },
  {
    path: 'mechanicHome',
    component: MechanicHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'technicalHome',
    component: TechnicalHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gsauthorizerHome',
    component: GsAuthorizerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'offtimeReport',
    component: OfftimeReportComponent,
    canActivate: [AuthGuard, AuthorizerGuard],
  },
  {
    path: 'incityReport',
    component: IncityReportComponent,
    canActivate: [AuthGuard, AuthorizerGuard],
  },
  {
    path: 'fieldReport',
    component: FieldReportComponent,
    canActivate: [AuthGuard, AuthorizerGuard],
  },
  {
    path: 'dispatchListingReport',
    component: DispatchListingReportComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'MaintenanceRequestReport',
    component: MaintenanceReportComponent,
    canActivate: [AuthGuard, OfficerCustodianGuard],
  },
  {
    path: 'userProfileListing',
    component: UserListingReportComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'delegateAuthorizer',
    component: DelegateAuthorizerComponent,
    canActivate: [AuthGuard, AuthorizerGuard],
  },
  // {
  //   path: 'backup',
  //   component: BackupComponent,
  //   canActivate: [AuthGuard, AdminGuard],
  // },
  // {
  //   path: 'restore',
  //   component: RestoreComponent,
  //   canActivate: [AuthGuard, AdminGuard],
  // },
  {
    path: 'dispactherIncityPrint',
    component: IncityComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'dispactherOfftimePrint',
    component: OfftimeComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'dispactherFieldPrint',
    component: FieldComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'updateFuelPrice',
    component: UpdatePriceComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'advancePrint/:id',
    component: AdvancePrintComponent,
    canActivate: [AuthGuard, DispatcherGuard],
  },
  {
    path: 'advCreate',
    component: CreateAdvComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'editAdv/:id',
    component: CreateAdvComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'advManage',
    component: ManageAdvComponent,
    canActivate: [AuthGuard, RequesterGuard],
  },
  {
    path: 'settleAdvancePayment',
    component: SettleAdvancePaymentComponent,
    canActivate: [AuthGuard, SettlementOfficerGuard],
  },
  {
    path: 'authorizeAdv',
    component: AuthorizeAdvComponent,
    canActivate: [AuthGuard, AuthorizerGuard],
  },
  {
    path: 'printSettlement/:id',
    component: SettlementPrintComponent,
    canActivate: [AuthGuard, SettlementRequesterGuard],
  },
  {
    path: 'settlementHome',
    component: SettlementOfficerHomeComponent,
    canActivate: [AuthGuard, SettlementOfficerGuard],
  },
  {
    path: 'offtimeCheck',
    component: CheckOfftimeComponent,
    canActivate: [AuthGuard, DispatcherOfficerGuard],
  },
  {
    path: 'fieldCheck',
    component: CheckFieldComponent,
    canActivate: [AuthGuard, DispatcherOfficerGuard],
  },
  {
    path: 'technicalPrint/:id',
    component: TechnicalPrintComponent,
    canActivate: [AuthGuard, TechnicalGuard],
  },
  {
    path: 'delegateGsauth',
    component: DelegateGsauthComponent,
    canActivate: [AuthGuard, GsAuthorizerGuard],
  },
  {
    path: 'delegateOfficer',
    component: DelegateOfficerComponent,
    canActivate: [AuthGuard, OfficerGuard],
  },
  {
    path: 'mappapprover',
    component: MapApproverComponent,
    canActivate: [AuthGuard,AdminGuard],
  },
  
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
