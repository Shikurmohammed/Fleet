import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/types/UserType';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  numOfUsers:any;
  numActiveOfUsers: number;
  numLockedOfUsers: number;
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getNoOfUsers();
    this.getNoActiveOfUsers();
    this.getNoLockedOfUsers();
    if(sessionStorage.getItem('home')!=null){
      window.location.reload();
      sessionStorage.removeItem("home");
    }
  }
  //To get the number of users in this system
  getNoOfUsers(){
    this.userService.getNoOfUsers().subscribe(
      (res:number)=>{
        this.numOfUsers = res;
      },
      (error:HttpErrorResponse)=>{
         
      }
    );
  }
//To get the number of active users in this system
getNoActiveOfUsers(){
  this.userService.getNoActiveOfUsers().subscribe(
    (res:number)=>{
      this.numActiveOfUsers = res;
    },
    (error:HttpErrorResponse)=>{
       
    }
  );
}

//To get the number of Locked users in this system
getNoLockedOfUsers(){
  this.userService.getNoLockedOfUsers().subscribe(
    (res:number)=>{
      this.numLockedOfUsers = res;
    },
    (error:HttpErrorResponse)=>{
       
    }
  );
}

}
