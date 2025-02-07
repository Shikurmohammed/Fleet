import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request-home',
  templateUrl: './request-home.component.html',
  styleUrls: ['./request-home.component.css'],
})
export class RequestHomeComponent implements OnInit {
  numOfIncity: number;
  numOfOfftime: number;
  numOfField: number;
  directorate:any;
  username:any;
  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.directorate = sessionStorage.getItem("directorate");
    this.username = sessionStorage.getItem("username");
    this.getNoOfIncity();
    this.getNoOfOffTime();
    this.getNoOfField();
    if(sessionStorage.getItem('home')!=null){
      window.location.reload();
      sessionStorage.removeItem("home");
    }
  }

  getNoOfIncity() {
    this.requestService.getNoOfIncity(this.username).subscribe(
      (res: number) => {
        this.numOfIncity = res;
      },
      (error: HttpErrorResponse) => {}
    );
  }

  getNoOfOffTime() {
    this.requestService.getNoOfOffTime(this.username).subscribe(
      (res: number) => {
        this.numOfOfftime = res;
      },
      (error: HttpErrorResponse) => {}
    );
  }
  getNoOfField() {
    this.requestService.getNoOfField(this.username).subscribe(
      (res: number) => {
        this.numOfField = res;
      },
      (error: HttpErrorResponse) => {}
    );
  }
}
