import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from '../auth.service';
import { ChangePasswordType } from '../types/change';
import { ChangepasswordService } from './changepassword.service';
import ConfirmedValidator from './validator';
import { error } from 'jquery';
import { LoginStatusService } from '../LoginStatus';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  form!: ChangePasswordType;
  changeModelForm!: ChangePasswordType;
  constructor(
    private changePasswordService: ChangepasswordService,
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private alert: AlertService,
    private loginStatus:LoginStatusService
  ) { }

  ngOnInit(): void {
    this.username = this.getUsername();
  }
  returnValue: Boolean = false;
  changeModel!: ChangePasswordType;
  username!: any;
  userid!: any;
  oldPass: any;
  newPass: any;
  confirmPasswordError!: any;
  serverResponse!: string;
  isSame: any = false;
  public changePassword(changeForm: NgForm) {
    if (this.isOld() == false) {
      this.changePasswordService.changePassword(changeForm.value).subscribe({
        next: (response: any) => {
          console.log("Changing Password.......",response);
          this.serverResponse = "";
          sessionStorage.removeItem("jwt");
          sessionStorage.removeItem("username");
          this.authService.isAuthenticated = false;
          this.loginStatus.setLoginStatus(false, false);
          this.alert.sucessAlert("You Have Successfully Changed Your Password, Login With Your New Password!")
          this.route.navigate(['/login']);
        },
        error: (error: any) => {
          this.serverResponse = "Your old password is not correct or server is not responding!";

        }
      }

      );
    }
  }

  public getUsername(): String {
    this.userid = sessionStorage.getItem("username");
    return this.userid;
  }
  public isOld() {
    if (this.oldPass == this.newPass) {
      this.isSame = true;
      return true;
    } else {
      return false;
    }
  }
}
