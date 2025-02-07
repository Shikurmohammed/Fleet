import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserType } from 'src/app/types/UserType';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReqApp } from 'src/app/types/reqApp';

@Component({
  selector: 'app-map-approver',
  templateUrl: './map-approver.component.html',
  styleUrls: ['./map-approver.component.css']
})
export class MapApproverComponent implements OnInit {
  authorizers: UserType[];
  requesters: UserType[];
  form: any;
  submitted=false;

  constructor(
    private userService:UserService,
    private formBuilder: FormBuilder,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("mapped")!=null){
      this.alertService.sucessAlert(sessionStorage.getItem("mapped"));
      sessionStorage.removeItem("mapped");
    }
    
    this.getAuthorizers();
    this.getRequesters();
    this.form = this.formBuilder.group({
      requester:['', Validators.required],
      authorizer:['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  public getAuthorizers(): void {
    this.userService.getAuthorizers().subscribe((ret: UserType[]) => {
      this.authorizers = ret;
    });
  }
  public getRequesters(): void {
    this.userService.getRequesters().subscribe((ret: UserType[]) => {
      this.requesters = ret;
    });
  }

   
  addMapping(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.userService.addMapping(this.form.value).subscribe(
         (res:ReqApp) => {
          sessionStorage.setItem("mapped", "Mapping Successfully Added.");
          window.location.reload();
        },
         (error:HttpErrorResponse) => {
          this.alertService.errorAlert('Mapping Could not be Added.');
        },
      );
    } else {
      console.log('form is invalid');
    }
  }

}
