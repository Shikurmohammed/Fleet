import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DirectorateType } from 'src/app/types/Directorate';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-check-offtime-request-details',
  templateUrl: './check-offtime-request-details.component.html',
  styleUrls: ['./check-offtime-request-details.component.css']
})
export class CheckOfftimeRequestDetailsComponent implements OnInit {
  directorName: String;
  directorates: DirectorateType[];
  dir: DirectorateType[];
  constructor(
    private dialogRef: MatDialogRef<CheckOfftimeRequestDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.dir = this.directorates?.filter(x => x.id === this.data?.directorate);
    this.directorName = this.dir[0]?.directorate;
  }
  onClose() {
    this.dialogRef.close("Closing ...");
  }
  //Inorder to get directorates
  public getDirectorates() {
    this.userService.getDirectorate().subscribe(
      (response: DirectorateType[]) => {
        this.directorates = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
