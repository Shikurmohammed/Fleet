import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { LoginStatusService } from './auth/LoginStatus';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
export class AppComponent implements OnInit, OnDestroy {
  userguide: string = "#";
  delegated: any;
  timer: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private adminGuard: AdminGuard,
    private requesterGuard: RequesterGuard,
    private requesterService: RequestService,
    private themeService: ThemeService,
    private loginStatus: LoginStatusService,
    private loaderService:NgxUiLoaderService
  ) { }
  title = 'myAngularLte';
  userName: any;
  role: any;
  currentDate: string = ''; // or any other date
  private intervalId: any;
  isLogged: boolean = false;
  isNewUser: boolean = false;

  isOpen = true;//Is sidebar open
  //Toggle sidebar width
  toggleSidebar() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
  //Theme toggling
  isDarkModeEnabled() {
    return this.themeService.isDarkModeEnabled();
  }
  //Toggole the dark mode
  toggleDarkMode() {
    console.log(this.themeService.isDarkModeEnabled());
    this.themeService.toggleDarkMode();
  }

  //Initialize neccssary members as soon as the component is rendered
  ngOnInit(): void {

    // if (sessionStorage.getItem("username") != null) {
    //   this.timer = new IdleTimer({
    //     timeout: 900, //expired after 15 min
    //     onTimeout: () => {
    //       this.logout();
    //     }
    //   });
    //   this.isDelegated();
    // }

    //Theme toggling
    // this.themeService.toggleDarkMode();

    // Check authentication state from sessionStorage
    const isLogged = sessionStorage.getItem('isLogged') === 'yes';
    const isNewUser = sessionStorage.getItem('isNewUser') === 'true';

    this.loginStatus.setLoginStatus(isLogged, isNewUser);
    this.loginStatus.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLogged = isLoggedIn;
    });
    this.loginStatus.isNewUser$.subscribe((isNewUser) => {
      this.isNewUser = isNewUser;
    });
    console.log("isLogged", this.isLogged);
    console.log("isNew", this.isNewUser);

    this.getHelp();
    this.startClock();

  }

  //Clear everything as soon as the component is destroyed
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  //Check if user is logged in
  isAuthenticated() {
    return this.isLogged;
  }

  //Set the help guide path based on the role
  getHelp() {
    const currentRole = sessionStorage.getItem('role');
    switch (currentRole) {
      case 'Admin':
        this.userguide = "./assets/userguide/admin.pdf";
        break;
      case 'Requester':
        this.userguide = "./assets/userguide/Requester.pdf";
        break;
      case 'Dispatcher':
        this.userguide = "./assets/userguide/dispatcher.pdf";
        break;
      case 'Senior Transport Officer':
        this.userguide = "./assets/userguide/Officer.pdf";
        break;
      case 'Request Authorizer':
        this.userguide = "./assets/userguide/authorizer.pdf";
        break;
      case 'GS Mechanic':
        this.userguide = "./assets/userguide/Mechanic.pdf";
        break;
      case 'Technical Service':
        this.userguide = "./assets/userguide/Technical.pdf";
        break;
      case 'GS Approver':
        this.userguide = "./assets/userguide/GSAuthorizer.pdf";
        break;
      case 'SettlementOfficers':
        this.userguide = "./assets/userguide/Settlement.pdf";
        break;
      default:
        break;

    }

  }

  logout() {
    console.log("logging out...");
    this.authService.userLoggedOut(sessionStorage.getItem("username")).subscribe({
      next: (response: any) => {
        console.log(response);
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('delegated');
        sessionStorage.removeItem('directorate');
        this.authService.isAuthenticated = false;
        this.loginStatus.setLoginStatus(false, false);
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  //Show clock to admin
  startClock() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      this.currentDate = now.toLocaleString();
    }, 1000);//1=> updates every milisecond
  }

  //NgxUiLoader config
  startLoading(){
    this.loaderService.start();
  }
  stopLoading(){
    this.loaderService.stop();
  }
  performAsynOperation(){
    this.startLoading();
    setTimeout(()=>{
      this.stopLoading();//Stop loading after completion

    },3000)
  }
}
