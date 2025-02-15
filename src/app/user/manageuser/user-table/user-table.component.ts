import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { UserType } from 'src/app/types/UserType';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'src/app/alert.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { RoleType } from 'src/app/types/Roles';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  public editUser: UserType | undefined;
  public users: UserType[] = [];
  public deactivateUser: UserType | undefined;
  public details: UserType | undefined;
  directorates: any;
  data: any = [];
  roles: RoleType[];
  wantReset: any;

  constructor(private cdr: ChangeDetectorRef, private userService: UserService, private alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.getUserOnDataTable();

    this.getDirectorate();
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


          dom: 'Bfrtip', // Add buttons for export, print, etc.
          buttons: ['copy', 'csv', 'excel', 'pdf', 'print'], // Add buttons
          language: {
            search: 'Search:',
            lengthMenu: 'Show _MENU_ entries',
            info: 'Showing _START_ to _END_ of _TOTAL_ entries',
            paginate: {
              first: 'First',
              last: 'Last',
              next: 'Next',
              previous: 'Previous',
            },
          },
        });
      }, 1);
      this.cdr.detectChanges();
    });
  }
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
  public onDeactivateUser(user: UserType) {
    var approver = sessionStorage.getItem("username");
    user.createdBy = approver!;
    this.userService.deactivateUser(user).subscribe(
      (ret: UserType) => {
        sessionStorage.setItem("deactivated", "You Have Successfully Deactivated  " + user.username);
        window.location.reload();
        // this.alert.sucessAlert("You Have Successfully Deactivated  "+user.username);
        // this.getUserOnDataTable();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert("Server Error");
      }
    );
  }
  //This will control the modals
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

  public getDirectorate() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
      },
      (error: HttpErrorResponse) => { }
    );
  }

  isReset(reset: any) {
    this.wantReset = true;
  }
  noReset(reset: any) {
    this.wantReset = false;
    document.getElementById("passwordReset").style.display = 'none';
    // this.editUser.password = null;
  }

}
