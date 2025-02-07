import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { AuthService } from '../auth.service';
import { JwtResponse } from '../types/jwtResponse';
import { LoginHistory } from '../types/LoginHistory';
import { UserDetails } from '../types/userdetail';
import { error } from 'jquery';
import { LoginStatusService } from '../LoginStatus';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  delegated: any;
  currentYear: number;
  constructor(
    private authService: AuthService,
    private route: Router,
    private alert: AlertService,
    private loginStatus: LoginStatusService
  ) { }
  ngOnInit(): void {
    //this.isNotLoggedIn();
    this.currentYear = new Date().getFullYear();

  }
  public jwt: any = {};
  public role!: any;
  userDetails: UserDetails | undefined;
  userName: any;
  credentialError: any = null;
  directorate: any;
  public isAuthenticated: boolean = this.authService.isAuthenticated;
  generateJwt(loginform: NgForm) {
    if (!loginform) {
      console.log('Invalid Form');
      return;
    }
    this.userDetails = loginform.value;
    this.userName = this.userDetails?.username;
    this.authService.generate(loginform.value).subscribe({
      next: (response: JwtResponse) => {
        console.log(response);
        this.authService.isAuthenticated = true;
        // console.log(this.authService.isAuthenticated);
        this.jwt = response.jwt;
        this.role = response.roleId;
        this.directorate = response.directorate;
        this.delegated = response.delegated;

        sessionStorage.setItem('role', this.role);
        sessionStorage.setItem('jwt', this.jwt);
        sessionStorage.setItem('username', this.userName);
        sessionStorage.setItem('directorate', this.directorate);
        sessionStorage.setItem('delegated', this.delegated);
        this.authService.isLoggedIn(this.userName).subscribe({
          next: (response: LoginHistory) => {
            if (response != null) {
              sessionStorage.setItem('isLogged', 'yes');
              //this.route.navigate(['/home']);
              this.loginStatus.setLoginStatus(true, false);
              this.redirectUser(this.role);
            } else if (response == null) {
              sessionStorage.removeItem('isLogged');
              console.log("Has no login history", response);
              this.loginStatus.setLoginStatus(true, true);
              this.route.navigateByUrl('/changePassword');
            }
          },
          error: (error: any) => {

          }
        });
      },
      error: (error: any) => {
        this.credentialError = "Incorrect username or password";
      }
    });
    // this.authService.generate(loginform.value).subscribe(
    //   (response: JwtResponse) => {
    //     console.log(response);
    //     this.authService.isAuthenticated = true;
    //     // console.log(this.authService.isAuthenticated);
    //     this.jwt = response.jwt;
    //     this.role = response.roleId;
    //     this.directorate = response.directorate;
    //     this.delegated = response.delegated;

    //     sessionStorage.setItem('role', this.role);
    //     sessionStorage.setItem('jwt', this.jwt);
    //     sessionStorage.setItem('username', this.userName);
    //     sessionStorage.setItem('directorate', this.directorate);
    //     sessionStorage.setItem('delegated', this.delegated);
    //     this.authService.isLoggedIn(this.userName).subscribe(
    //       (response: LoginHistory) => {
    //         //console.log(response);
    //         if (response != null) {
    //           sessionStorage.setItem('isLogged', 'yes');
    //           this.route.navigate(['/home']);
    //         } else if (response == null) {
    //           sessionStorage.removeItem('isLogged');

    //           this.route.navigate(['/changePassword']);
    //         }
    //       },
    //       (error: HttpErrorResponse) => { }
    //     );
    //     loginform.reset();
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.credentialError = "Incorrect username or password";
    //     loginform.reset();
    //   }
    // );


  }
  redirectUser(role: any) {
    console.log("redirectuser to ",role)
    if (role == null) {
      this.route.navigate(['login']);
      return;
    }
    else {
      if (role == 'Admin') {
        this.route.navigate(['/adminhome']);
      }
      if (role == 'Request Authorizer') {
        this.route.navigate(['/authorizeRequest']);
      }
      if (role == 'Requester') {
        this.route.navigate(['/requesthome']);
      }
      if (role == 'Dispatcher') {
        this.route.navigate(['/dispatcherhome']);
      }
      if (role == 'Senior Transport Officer') {
        this.route.navigate(['/officerHome']);
      }
      if (role == 'GS Mechanic') {
        this.route.navigate(['/mechanicHome']);
      }
      if (role == 'Technical Service') {
        this.route.navigate(['/technicalHome']);
      }
      if (role == 'GS Approver') {
        this.route.navigate(['/gsauthorizerHome']);
      }
      if (role == 'SettlementOfficers') {
        this.route.navigate(['/settlementHome']);
      }
    }
  }




  isNotLoggedIn() {
    if (sessionStorage.getItem("jwt") != null) {
      this.route.navigate(['/home']);
    }
  }
  isLoggedIn() {
    if (this.authService.isAuthenticated) {
      return this.authService.isLoggedIn(this.userName);
    } else {
      this.route.navigate(['/login']);
      return true;
    }
  }
  // isNotAuthenticated() {
  //   if (!sessionStorage.getItem("jwt") && !sessionStorage.getItem("isLogged")) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
