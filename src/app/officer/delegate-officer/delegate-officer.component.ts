import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthorizeRequestService } from 'src/app/request/authorize-request/authorize-request.service';
import { UserType } from 'src/app/types/UserType';

@Component({
  selector: 'app-delegate-officer',
  templateUrl: './delegate-officer.component.html',
  styleUrls: ['./delegate-officer.component.css']
})
export class DelegateOfficerComponent implements OnInit {

  public users: UserType[] = [];
  public deactivateDelegation: UserType | undefined;
  public delegateUser: UserType | undefined;
  public details:UserType|undefined;
  directorates: any;
  data: any = [];
  wantReset:any;
  username: string;
  constructor(
    private authService: AuthorizeRequestService,
    private route: Router,
    private alert:AlertService
  ) {}

  ngOnInit(): void {
    if(sessionStorage.getItem("userdelegated")!=null){
      this.alert.sucessAlert(sessionStorage.getItem("userdelegated"));
      sessionStorage.removeItem("userdelegated");
   }
   if(sessionStorage.getItem("deactivateDelegation")!=null){
    this.alert.sucessAlert(sessionStorage.getItem("deactivateDelegation"));
    sessionStorage.removeItem("deactivateDelegation");
   }
    this.getUserOnDataTable();
    this.username = sessionStorage.getItem("username");
  }


  //To display user data on data tables
  public getUserOnDataTable(): void {
    this.authService.getDispatcherUsers().subscribe((ret: UserType[]) => {
      this.data = ret;
      setTimeout(() => {
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          autoWidth: false,
          retrieve: true,
          processing: true,
          lengthMenu: [5, 10, 25],
          order: [[1, 'desc']],
        });
      }, 1);
    });
  }

  DelegateUser(user:UserType){
      user.createdBy = this.username;
     this.authService.DelegateUser(user).subscribe(
      (response:UserType)=>{
        sessionStorage.setItem("userdelegated", "You Have Successfully delegated  "+user.username);
        window.location.reload();
      },
      (error:HttpErrorResponse)=>{
        this.alert.errorAlert("Server Error");
      }
     );
  }
 
  DeactivateDelegation(user:UserType){
     user.createdBy = this.username;
    this.authService.DeactivateDelegation(user).subscribe(
      (response:UserType)=>{
        sessionStorage.setItem("deactivateDelegation", "You Have Successfully deactivated  "+user.username);
        window.location.reload();
      },
      (error:HttpErrorResponse)=>{
        this.alert.errorAlert("Server Error");
      }
     );
  }



  //This will control my modals
  public onOpenModal(user: UserType, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delegate') {
      this.delegateUser = user;
      button.setAttribute('data-target', '#delegateUserModal');
    }
    if (mode === 'deactivate') {
      this.deactivateDelegation = user;
      button.setAttribute('data-target', '#deactivateDelegationModal');
    }
    if (mode === 'view') {
      this.details = user;
      button.setAttribute('data-target', '#detailsUserModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
