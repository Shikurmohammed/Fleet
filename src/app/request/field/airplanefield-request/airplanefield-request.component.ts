import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DirectorateType } from 'src/app/types/Directorate';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-airplanefield-request',
  templateUrl: './airplanefield-request.component.html',
  styleUrls: ['./airplanefield-request.component.css']
})
export class AirplanefieldRequestComponent implements OnInit {
  directorates: DirectorateType[] = [];

  constructor(private userService: UserService) {
    this.getDirectorates();

   }

  ngOnInit(): void {
  }
  public getDirectorates() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
        console.log(this.directorates);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  fieldAirplaneRequest(addForm: NgForm): void {}

}
