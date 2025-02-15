import { NgModule } from '@angular/core';
import { NgConfirmModule } from 'ng-confirm-box';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationInterceptorService } from './htt-interceptor/Auth-interceptor';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-responsive';


import { jqxDataTableModule } from 'jqwidgets-ng/jqxdatatable';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
//import { AlertModule } from 'ngx-alerts';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule,
} from 'ngx-ui-loader';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { ChangepasswordComponent } from './auth/changepassword/changepassword.component';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ManageuserComponent } from './user/manageuser/manageuser.component';
import { OfftimeRequestComponent } from './request/offtime-request/offtime-request.component';
import { IncityRequestComponent } from './request/incity-request/incity-request.component';

import { VehcilefieldRequestComponent } from './request/field/vehcilefield-request/vehcilefield-request.component';
import { AirplanefieldRequestComponent } from './request/field/airplanefield-request/airplanefield-request.component';
import { ManageRequestComponent } from './request/offtime-request/manage-request/manage-request.component';
import { MyfieldrequestComponent } from './request/field/myfieldrequest/myfieldrequest.component';
import { DispatcherFieldApprovalComponent } from './request/field/dispatcher-field-approval/dispatcher-field-approval.component';
import { FieldRequestDetailComponent } from './request/field/field-request-detail/field-request-detail.component';
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
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { ViewincityrequestComponent } from './request/incity-request/viewincityrequest/viewincityrequest.component';
import { TimeFormat } from './pipes/TimeFormat.pipe';
import { AuthorizeIncityComponent } from './request/authorize-request/authorize-incity/authorize-incity.component';
import { AuthorizeFieldComponent } from './request/authorize-request/authorize-field/authorize-field.component';
import { AuthorizeOfftimeComponent } from './request/authorize-request/authorize-offtime/authorize-offtime.component';
import { AdminHomeComponent } from './user/admin-home/admin-home.component';
import { PrintFieldComponent } from './request/field/print-field/print-field.component';
import { PrintIncityComponent } from './request/incity-request/print-incity/print-incity.component';
import { PrintOfftimeComponent } from './request/offtime-request/print-offtime/print-offtime.component';
import { RequestHomeComponent } from './request/request-home/request-home.component';
import { DispatcherHomeComponent } from './dispatcher/dispatcher-home/dispatcher-home.component';
import { ViewPooledVehicleComponent } from './dispatcher/dispatcher-home/view-pooled-vehicle/view-pooled-vehicle.component';
import { ViewDisposedVehicleComponent } from './dispatcher/dispatcher-home/view-disposed-vehicle/view-disposed-vehicle.component';
import { ViewDispatchedVehicleComponent } from './dispatcher/dispatcher-home/view-dispatched-vehicle/view-dispatched-vehicle.component';
import { OfficerHomeComponent } from './officer/officer-home/officer-home.component';
import { ServiceMillageDueComponent } from './officer/officer-home/service-millage-due/service-millage-due.component';
import { TyreMillageDueComponent } from './officer/officer-home/tyre-millage-due/tyre-millage-due.component';
import { InsuranceDueComponent } from './officer/officer-home/insurance-due/insurance-due.component';
import { OfftimeModifyDispatchedComponent } from './dispatcher/offtime-dispatcher/offtime-modify-dispatched/offtime-modify-dispatched.component';
import { IncityModifyDispatchedComponent } from './dispatcher/incity-dispatcher/incity-modify-dispatched/incity-modify-dispatched.component';
import { FieldModifyDispatchedComponent } from './dispatcher/field-dispatcher/field-modify-dispatched/field-modify-dispatched.component';
import { ManageMaintenanceRequestComponent } from './officer/officer-home/manage-maintenance-request/manage-maintenance-request.component';
import { ManageCustMaintenanceRequestComponent } from './request/request-maintenance/manage-cust-maintenance-request/manage-cust-maintenance-request.component';
import { GarageComponent } from './technical-service/garage/garage.component';
import { ManageGarageComponent } from './technical-service/garage/manage-garage/manage-garage.component';
import { MaintRequestsComponent } from './technical-service/maint-requests/maint-requests.component';
import { CompletionComponent } from './technical-service/maint-requests/completion/completion.component';
import { VerifiedRequestsComponent } from './gs-authorizer/verified-requests/verified-requests.component';
import { MaintCompletionComponent } from './gs-authorizer/maint-completion/maint-completion.component';
import { CustodianRequestsComponent } from './mechanic/custodian-requests/custodian-requests.component';
import { MechanicRequestsComponent } from './mechanic/mechanic-requests/mechanic-requests.component';
import { ManageCompletionComponent } from './technical-service/maint-request/manage-completion/manage-completion.component';
import { ManagecompletionComponent } from './technical-service/maint-requests/manage/managecompletion/managecompletion.component';
import { MechanicCompletionComponent } from './mechanic/mechanic-completion/mechanic-completion.component';
import { NgSelect2Module } from 'ng-select2';
import { NgSelectModule } from '@ng-select/ng-select';
import { UnverifiedCustodianRequestComponent } from './mechanic/Mechanic-Reports/unverified-custodian-request/unverified-custodian-request.component';
import { MechanicRequestReportComponent } from './mechanic/Mechanic-Reports/mechanic-request-report/mechanic-request-report.component';
import { MaintenanceSubmissionReportComponent } from './mechanic/Mechanic-Reports/maintenance-submission-report/maintenance-submission-report.component';
import { MaintCompletionReportComponent } from './gs-authorizer/reports/maint-completion-report/maint-completion-report.component';
import { MaintRequestsReportComponent } from './gs-authorizer/reports/maint-requests-report/maint-requests-report.component';
import { MechanicHomeComponent } from './mechanic/mechanic-home/mechanic-home.component';
import { MaintenancecostreportComponent } from './technical-service/reports/maintenancecostreport/maintenancecostreport.component';
import { TechnicalHomeComponent } from './technical-service/technical-home/technical-home.component';
import { GsAuthorizerHomeComponent } from './gs-authorizer/gs-authorizer-home/gs-authorizer-home.component';
import { DispatcherreportsComponent } from './dispatcher/dispatcher-reports/dispatcherreports.component';

import { MaintenanceReportComponent } from './request/maintenance-report/maintenance-report.component';
import { DispatchListingReportComponent } from './dispatcher/dispatch-listing-report/dispatch-listing-report.component';
import { UserListingReportComponent } from './user/user-listing-report/user-listing-report.component';
import { OfftimeReportComponent } from './request/authorize-request/authorizer-report/offtime-report/offtime-report.component';
import { IncityReportComponent } from './request/authorize-request/authorizer-report/incity-report/incity-report.component';
import { FieldReportComponent } from './request/authorize-request/authorizer-report/field-report/field-report.component';
import { BackupComponent } from './user/back-restore/backup/backup.component';
import { RestoreComponent } from './user/back-restore/restore/restore.component';
import { DelegateAuthorizerComponent } from './request/authorize-request/delegate-authorizer/delegate-authorizer.component';
import { RouterModule } from '@angular/router';
import { OfftimeComponent } from './dispatcher/dispatcher-print/offtime/offtime.component';
import { IncityComponent } from './dispatcher/dispatcher-print/incity/incity.component';
import { FieldComponent } from './dispatcher/dispatcher-print/field/field.component';
import { UpdatePriceComponent } from './dispatcher/dispatcher-fuel/update-price/update-price.component';
import { AdvancePrintComponent } from './dispatcher/field-dispatcher/field-modify-dispatched/advance-print/advance-print.component';
import { CreateAdvComponent } from './advance-payment/create-adv/create-adv.component';
import { ManageAdvComponent } from './advance-payment/manage-adv/manage-adv.component';
import { SettleAdvancePaymentComponent } from './settlement-officers/settle-advance-payment/settle-advance-payment.component';
import { AuthorizeAdvComponent } from './advance-payment/authorize-adv/authorize-adv.component';
import { SettlementPrintComponent } from './settlement-officers/settlement-print/settlement-print.component';
import { SettlementOfficerHomeComponent } from './settlement-officers/settlement-officer-home/settlement-officer-home.component';
import { MilegeDirective } from './directives/milege-validation.directive';
import { CheckOfftimeComponent } from './officer/check-requests/check-offtime/check-offtime.component';
import { CheckFieldComponent } from './officer/check-requests/check-field/check-field.component';
import { TechnicalPrintComponent } from './technical-service/technical-print/technical-print.component';
import { DelegateGsauthComponent } from './gs-authorizer/delegate-gsauth/delegate-gsauth.component';
import { DelegateOfficerComponent } from './officer/delegate-officer/delegate-officer.component';
import { FooterComponent } from './footer/footer.component';
import { MapApproverComponent } from './user/map-approver/map-approver.component';
import { SidebarComponent } from './user/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent } from './user/sidebar/menu-item/menu-item.component';
import { MatDialogModule, } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserTableComponent } from './user/manageuser/user-table/user-table.component';
import { UserEditComponent } from './user/manageuser/user-edit/user-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RequestMaintenanceComponent } from './request/request-maintenance/request-maintenance.component';
import { VehicleDetailsComponent } from './request/request-maintenance/vehicle-details/vehicle-details.component';
import { VehicleRequestComponent } from './request/request-maintenance/vehicle-request/vehicle-request.component';
import { DisposeVehicleComponent } from './officer/vehicle/manage-vehicle/dispose-vehicle/dispose-vehicle.component';
import { UpdateVehicleComponent } from './officer/vehicle/manage-vehicle/update-vehicle/update-vehicle.component';
import { CheckOfftimeRequestDetailsComponent } from './officer/check-requests/check-offtime-request-details/check-offtime-request-details.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#f79239',
  bgsOpacity: 0.5,
  bgsPosition: 'bottom-right',
  bgsSize: 60,
  bgsType: 'square-loader',
  blur: 0,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#21205f',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'square-loader',
  gap: 24,
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(190,173,173,0.02)',
  pbColor: 'red',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    HomeComponent,
    UserComponent,
    UserModalComponent,
    ChangepasswordComponent,
    MatchPasswordDirective,
    ManageuserComponent,
    OfftimeRequestComponent,
    IncityRequestComponent,
    VehcilefieldRequestComponent,
    AirplanefieldRequestComponent,
    ManageRequestComponent,
    MyfieldrequestComponent,
    DispatcherFieldApprovalComponent,
    FieldRequestDetailComponent,
    IncityDispatcherComponent,
    IncityManageDispatchComponent,
    OfftimeDispatcherComponent,
    OfftimeManageDispatchComponent,
    FieldDispatcherComponent,
    FieldManageDispatchComponent,
    VehicleComponent,
    ManageVehicleComponent,
    DriverComponent,
    ManageDriverComponent,
    AuthorizeRequestComponent,
    ViewincityrequestComponent,
    TimeFormat,
    AuthorizeIncityComponent,
    AuthorizeFieldComponent,
    AuthorizeOfftimeComponent,
    AdminHomeComponent,
    PrintFieldComponent,
    PrintIncityComponent,
    PrintOfftimeComponent,
    RequestHomeComponent,
    DispatcherHomeComponent,
    ViewPooledVehicleComponent,
    ViewDisposedVehicleComponent,
    ViewDispatchedVehicleComponent,
    OfficerHomeComponent,
    ServiceMillageDueComponent,
    TyreMillageDueComponent,
    InsuranceDueComponent,
    OfftimeModifyDispatchedComponent,
    IncityModifyDispatchedComponent,
    FieldModifyDispatchedComponent,
    ManageMaintenanceRequestComponent,

    ManageCustMaintenanceRequestComponent,
    GarageComponent,
    ManageGarageComponent,
    MaintRequestsComponent,
    CompletionComponent,
    VerifiedRequestsComponent,
    MaintCompletionComponent,
    CustodianRequestsComponent,
    MechanicRequestsComponent,
    ManageCompletionComponent,
    ManagecompletionComponent,
    MechanicCompletionComponent,
    UnverifiedCustodianRequestComponent,
    MechanicRequestReportComponent,
    MaintenanceSubmissionReportComponent,
    MaintCompletionReportComponent,
    MaintRequestsReportComponent,
    MechanicHomeComponent,
    MaintenancecostreportComponent,
    TechnicalHomeComponent,
    GsAuthorizerHomeComponent,
    DispatcherreportsComponent,
    MaintenanceReportComponent,
    DispatchListingReportComponent,
    UserListingReportComponent,
    OfftimeReportComponent,
    IncityReportComponent,
    FieldReportComponent,
    DelegateAuthorizerComponent,
    BackupComponent,
    RestoreComponent,
    OfftimeComponent,
    IncityComponent,
    FieldComponent,
    UpdatePriceComponent,
    AdvancePrintComponent,
    CreateAdvComponent,
    ManageAdvComponent,
    SettleAdvancePaymentComponent,
    AuthorizeAdvComponent,
    SettlementPrintComponent,
    SettlementOfficerHomeComponent,
    MilegeDirective,
    CheckOfftimeComponent,
    CheckFieldComponent,
    TechnicalPrintComponent,
    DelegateGsauthComponent,
    DelegateOfficerComponent,
    FooterComponent,
    MapApproverComponent,
    SidebarComponent,
    MenuItemComponent,
    UserTableComponent,
    UserEditComponent,
    RequestMaintenanceComponent,
    VehicleDetailsComponent,
    VehicleRequestComponent,
    DisposeVehicleComponent,
    UpdateVehicleComponent,
    CheckOfftimeRequestDetailsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    jqxDataTableModule,
    jqxButtonModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgSelectModule,

    // AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: 'right',positionY: 'top'}),

    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    MatFormFieldModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
