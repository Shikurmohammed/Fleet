import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router: Router,
    private authGuard:AuthGuard 
    ) { }

  ngOnInit(): void {
  }
  navigatetoEmployee(){
       this.router.navigateByUrl('dashboard/employee');
  }
  isAuthenticated(){
    if(sessionStorage.getItem("jwt")!=null){
      return true;
    }else{
      return false;
    }
}
  Logout(){
       
       localStorage.removeItem("jwt");
       this.authService.isAuthenticated=false;
       this.router.navigate(['']);  
  }
}
