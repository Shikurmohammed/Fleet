import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { RoleType } from 'src/app/types/Roles';
import { UserType } from 'src/app/types/UserType';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css'],
})
export class ManageuserComponent implements OnInit {
  public users: UserType[] = [];
  public editUser: UserType | undefined;
  public deactivateUser: UserType | undefined;
  public details:UserType|undefined;
  directorates: any;
  data: any = [];
  roles: RoleType[];
  wantReset:any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router,
    private alert:AlertService,
    private dialog:MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  openModal(): void {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '400px', // Set the width of the modal
      data: { /* optional data to pass to the modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
isLoading = false;
  ngAfterViewInit(): void {
    this.isLoading = true;
    this.cdr.detectChanges(); // Manually trigger change detection
  }
  
  isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  ngOnInit(): void {
      if(sessionStorage.getItem("updated")!=null){
          this.alert.sucessAlert(sessionStorage.getItem("updated"));
          sessionStorage.removeItem("updated");
      }
      if(sessionStorage.getItem("deactivated")!=null){
        this.alert.sucessAlert(sessionStorage.getItem("deactivated"));
        sessionStorage.removeItem("deactivated");
      }
      if(sessionStorage.getItem("cleared")!=null){
        this.alert.sucessAlert(sessionStorage.getItem("cleared"));
        sessionStorage.removeItem("cleared");
      }
        this.getUserOnDataTable();
        this.getDirectorate();
        this.getRoles();
  }

  isReset(reset:any){
    this.wantReset = true;
  }
  noReset(reset:any){
    this.wantReset = false;
    document.getElementById("passwordReset").style.display = 'none';
    this.editUser.password = null;
  }

  //To display user data on data tables
  public getUserOnDataTable(): void {
    this.userService.getUsers().subscribe((ret: UserType[]) => {
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
  //To update user detail
  public onUpdateUser(user: UserType): void {
    var approver = sessionStorage.getItem("username");
    user.createdBy = approver!;

    this.userService.updateUser(user).subscribe(
      (response: UserType) => {
        sessionStorage.setItem("updated", "User Successfully Updated!");
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert("Server Error");
      }
    );
  }
   //This will reject incity request
   public onDeactivateUser(user:UserType){
    var approver = sessionStorage.getItem("username");
    user.createdBy = approver!;
  this.userService.deactivateUser(user).subscribe(
    (ret:UserType)=>{
      sessionStorage.setItem("deactivated", "You Have Successfully Deactivated  "+user.username);
      window.location.reload();
      // this.alert.sucessAlert("You Have Successfully Deactivated  "+user.username);
      // this.getUserOnDataTable();
    },
    (error:HttpErrorResponse)=>{
          this.alert.errorAlert("Server Error");
    }
  );
}
  //This will retrieve all directors
  public getDirectorate() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
      },
      (error: HttpErrorResponse) => {}
    );
  }
    //Inorder to get all roles
    public getRoles() {
      this.userService.getRoles().subscribe(
        (response: RoleType[]) => {
          this.roles = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    //This is to clear user
    public clearUser(username:string){
        this.userService.clearUser(username).subscribe(
          (res:any)=>{
            sessionStorage.setItem("cleared", "User with username:"+username+" has been successfully cleared!");
            window.location.reload();
          },
          (error:HttpErrorResponse)=>{
            this.alert.errorAlert("Server Errors");
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
    if (mode === 'edit') {
      this.editUser = user;
      this.editUser.password = null;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'deactivate') {
      this.deactivateUser = user;
      button.setAttribute('data-target', '#deactivateUserModal');
    }
    if (mode === 'view') {
      this.details = user;
      button.setAttribute('data-target', '#detailsUserModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
