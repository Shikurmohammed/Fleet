import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    // if (sessionStorage.getItem('jwt') == null) {
    //   this.route.navigate(['login']);
    // }
    // if(this.isAuthenticated()){
    //    sessionStorage.setItem("home", "home");
    //   if (sessionStorage.getItem('role') == 'Admin') {
    //     this.route.navigate(['/adminhome']);
    //   }
    //   if (sessionStorage.getItem('role') == 'Request Authorizer') {
    //     this.route.navigate(['/authorizeRequest']);
    //   }
    //   if (sessionStorage.getItem('role') == 'Requester') {
    //     this.route.navigate(['/requesthome']);
    //   }
    //   if (sessionStorage.getItem('role') == 'Dispatcher') {
    //     this.route.navigate(['/dispatcherhome']);
    //   }
    //   if(sessionStorage.getItem('role')=='Senior Transport Officer'){
    //     this.route.navigate(['/officerHome']);
    //   }
    //    if(sessionStorage.getItem('role')=='GS Mechanic'){
    //     this.route.navigate(['/mechanicHome']);
    //   }
    //   if (sessionStorage.getItem('role') == 'Technical Service') {
    //     this.route.navigate(['/technicalHome']);
    //   }
    //   if (sessionStorage.getItem('role') == 'GS Approver') {
    //     this.route.navigate(['/gsauthorizerHome']);
    //   }
    //   if (sessionStorage.getItem('role') == 'SettlementOfficers') {
    //     this.route.navigate(['/settlementHome']);
    //   }
    // }
    // else{
    //         sessionStorage.removeItem('role');
    //         sessionStorage.removeItem('jwt');
    //         sessionStorage.removeItem('username');
    //         sessionStorage.removeItem('isLogged');
    //         this.authService.isAuthenticated = false;
    //        this.route.navigate(['login']);
    // }
   
  }
  isAuthenticated() {
  //   if (sessionStorage.getItem('jwt') && sessionStorage.getItem('isLogged')) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  }
}
