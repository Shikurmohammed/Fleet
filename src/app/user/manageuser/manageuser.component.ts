import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DirectorateType } from 'src/app/types/Directorate';
import { RoleType } from 'src/app/types/Roles';
import { UserType } from 'src/app/types/UserType';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user.component';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageuserComponent implements OnInit {
  public users: UserType[] = [];
  public deactivateUser: UserType | undefined;
  public details: UserType | undefined;
  directorates: any;
  data: any = [];
  roles: RoleType[];
  wantReset: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router,
    private alert: AlertService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService

  ) { }

  openUserModal(): void {
    console.log("Opening User-component-modal");
    this.loaderService.start(); // Start loader
    // Simulate async operation
    setTimeout(() => {
      this.loaderService.stop(); // Stop loader
    }, 2000);
    const dialogRef = this.dialog.open(UserComponent, {
      width: 'auto', // Set the width of the modal
      panelClass: 'custom-dialog-container',
      disableClose: true,
      hasBackdrop: true,
      backdropClass: 'custom-dialog-backdrop',
      //  position:{top:'50%', left:'50%'},
      data: { /* optional data to pass to the modal */ },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('User Modal closed with result:', result);
    });
    this.cdr.detectChanges();
  }


  isAuthenticated() {
    return this.authService.isAuthenticated;
  }
  ngOnInit(): void {

    if (sessionStorage.getItem("updated") != null) {
      this.alert.sucessAlert(sessionStorage.getItem("updated"));
      sessionStorage.removeItem("updated");
    }
    if (sessionStorage.getItem("deactivated") != null) {
      this.alert.sucessAlert(sessionStorage.getItem("deactivated"));
      sessionStorage.removeItem("deactivated");
    }
    if (sessionStorage.getItem("cleared") != null) {
      this.alert.sucessAlert(sessionStorage.getItem("cleared"));
      sessionStorage.removeItem("cleared");
    }

    this.getRoles();
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
  public clearUser(username: string) {
    this.userService.clearUser(username).subscribe(
      (res: any) => {
        sessionStorage.setItem("cleared", "User with username:" + username + " has been successfully cleared!");
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        this.alert.errorAlert("Server Errors");
      }
    );
  }

}
