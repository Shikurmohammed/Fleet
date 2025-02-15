import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../alert.service';
import { DirectorateType } from '../types/Directorate';
import { RoleType } from '../types/Roles';
import { UserType } from '../types/UserType';
import { UserService } from './user.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],

})
export class UserComponent implements OnInit {
  roles: RoleType[] = [];
  directorates: DirectorateType[] = [];
  directorate: any;
  pipe = new DatePipe('en-US');
  userForm!: FormGroup;
  userId: any;
  userInput: any;
  usernameError: any;
  isExist: boolean;
  constructor(
    private userService: UserService,
    private route: Router,
    private alert: AlertService,
    private dialogRef: MatDialogRef<UserComponent>,
  ) { }


  onClose() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('jwt') == null) {
      this.route.navigate(['login']);
    } else {
      this.getRoles();
      this.getDirectorates();
      this.userId = sessionStorage.getItem('username');
    }

    //Form Validation
    this.userForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
    //End of form validation
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
  //Inorder to get directorates
  public getDirectorates() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //This will check if the username will exist before
  isUsernameExist(): boolean {

    this.userService.isUsernameExist(this.userInput).subscribe(
      (res: boolean) => {
        console.log(res);
        this.isExist = res;

      },
      (error: HttpErrorResponse) => {
        this.isExist = false;

      }
    );
    return this.isExist;
  }
  //This will add user
  onAddUser(addForm: NgForm): void {
    console.log(addForm);

    document.getElementById('add-user-form')?.click();
    //console.log(addForm.value);

    if (!addForm.value) {
      this.userService.addUser(addForm.value).subscribe(
        (response: UserType) => {
          if (response != null) {
            this.alert.sucessAlert('User Successfully Registered!');
            addForm.reset();
            this.route.navigate(['manageuser']);
          } else {
            this.usernameError = "Username already exist";
          }
        },
        (error: HttpErrorResponse) => {
          this.alert.errorAlert("Server Error");
        }
      );
    }


  }

  removeUsernameError() {
    this.usernameError = null;
    return this.usernameError;
  }
}
