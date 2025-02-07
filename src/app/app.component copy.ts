import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminGuard } from './guards/admin.guard';
import { RequesterGuard } from './guards/requester.guard';
import { UserType } from './types/UserType';
import { RequestService } from './request/request-home/request.service';
import { Observable } from 'rxjs';
import IdleTimer from "./IdleTimer";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewEncapsulation } from '@angular/core';
import { ThemeService } from './user/sidebar/theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '250px',
      })),
      state('closed', style({
        width: '50px',
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent {
  userguide: string = "#";
  delegated: any;
  timer: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private adminGuard: AdminGuard,
    private requesterGuard: RequesterGuard,
    private requesterService: RequestService,
    private themeService:ThemeService,
  ) { }
  title = 'myAngularLte';
  userName: any;
  role: any;

  isOpen = true;//Is sidebar open
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
   //Theme toggling
   isDarkModeEnabled(){
    console.log(this.themeService.isDarkModeEnabled());
    return this.themeService.isDarkModeEnabled();
   }
   toggleDarkMode(){
    this.themeService.toggleDarkMode();
  }


  ngOnInit(): void {
    //Theme toggling
    this.themeService.toggleDarkMode();
    // if (sessionStorage.getItem("username") != null) {
    //   this.timer = new IdleTimer({
    //     timeout: 900, //expired after 15 min
    //     onTimeout: () => {
    //       this.logout();
    //     }
    //   });
    //   this.isDelegated();
    // }
  }

  isAuthenticated() {
    if (sessionStorage.getItem('jwt') && sessionStorage.getItem('isLogged')) {
      this.userName = sessionStorage.getItem('username');
      this.role = sessionStorage.getItem("role");
      return true;
    } else {
      return false;
    }
  }
  isAdmin() {
    // sessionStorage.getItem("role")=="Admin"
    if (this.adminGuard.canActivate()) {
      this.userguide = "./assets/userguide/admin.pdf";
      return true;
    } else {
      return false;
    }
  }
  // getRole(){
  //   return this.authService.getRole();
  // }
  logout() {
    this.authService.userLoggedOut(sessionStorage.getItem("username")).subscribe(
      (response: any) => {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('delegated');
        this.authService.isAuthenticated = false;
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  myFieldRequest() {
    this.router.navigateByUrl('/myfieldrequest');
  }
  fieldRequestApproval() {
    this.router.navigateByUrl('/fieldapproval');
  }
  isDispatcher() {
    if (sessionStorage.getItem('role') == 'Dispatcher') {
      this.userguide = "./assets/userguide/dispatcher.pdf";
      return true;
    } else {
      return false;
    }
  }
  isRequestor() {
    if (this.requesterGuard.canActivate()) {
      this.userguide = "./assets/userguide/Requester.pdf";
      return true;
    } else {
      return false;
    }
  }
  isRoleAdmin() {
    if (sessionStorage.getItem('role') == 'Admin') {
      return true;
    } else {
      return false;
    }
  }
  isOfficer() {
    if (sessionStorage.getItem('role') == 'Senior Transport Officer') {
      this.userguide = "./assets/userguide/Officer.pdf";
      return true;
    } else {
      return false;
    }
  }
  isAuthorizer() {
    if (sessionStorage.getItem('role') == 'Request Authorizer') {
      this.userguide = "./assets/userguide/authorizer.pdf";
      return true;
    } else {
      return false;
    }
  }
  isMechanic() {
    if (sessionStorage.getItem('role') == 'GS Mechanic') {
      this.userguide = "./assets/userguide/Mechanic.pdf";
      return true;
    } else {
      return false;
    }
  }

  isTechnicalService() {
    if (sessionStorage.getItem('role') == 'Technical Service') {
      this.userguide = "./assets/userguide/Technical.pdf";

      return true;
    } else {
      return false;
    }
  }

  isGsApprover() {
    if (sessionStorage.getItem('role') == 'GS Approver') {
      this.userguide = "./assets/userguide/GSAuthorizer.pdf";
      return true;
    } else {
      return false;
    }
  }

  isAuthorizerDelegated() {
    if (this.isRequestor() && this.delegated == '1') {
      return true;
    } else {
      return false;
    }
  }
  isGsApproverDelegated() {
    if (this.isMechanic() && this.delegated == '1') {
      return true;
    } else {
      return false;
    }
  }
  isOfficerDelegated() {
    if (this.isDispatcher() && this.delegated == '1') {
      return true;
    } else {
      return false;
    }
  }
  isDelegated(): any {
    this.requesterService.isDelegated(sessionStorage.getItem("username")).subscribe(
      (res: any) => {
        this.delegated = res;
        sessionStorage.setItem("delegated", this.delegated);
      },
      (error: HttpErrorResponse) => {

      }
    );
  }
  isSettlementOfficer() {
    if (sessionStorage.getItem('role') == 'SettlementOfficers') {
      this.userguide = "./assets/userguide/Settlement.pdf";
      return true;
    } else {
      return false;
    }
  }
  ngOnDestroy() {
    this.timer.clear();
  }



}
