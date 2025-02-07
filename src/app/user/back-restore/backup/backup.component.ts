import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { Backup } from 'src/app/types/Backup';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css'],
})
export class BackupComponent implements OnInit {
  date: any;
  backupdto: Backup = new Backup();
  fpath = 'C:\\dbbackup\\';

  constructor(
    private dbService: DatabaseService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    this.date = formatDate(this.date, 'yyyy-MM-dd', 'en-US');
    this.backupdto.type = 'full';
    this.fpath = this.fpath + this.date + '.bak';
    console.log(this.fpath);
  }

  backup(path: string) {
    this.backupdto.filePath = path;

    this.dbService.backup(this.backupdto).subscribe({
      next: (event: any) => {
        this.alertService.sucessAlert('Database Back Up Successful.');
      },
      error: (err: any) => {
        console.log(err.error.message);
        if (err.error.message == 'Path not found') {
          this.alertService.errorAlert(
            'The System Could not find the Path Provided.'
          );
        } else if (err.error.message == 'Access denied') {
          this.alertService.errorAlert('Access is Denied.');
        } else {
          this.alertService.errorAlert('Server Error.');
        }
      },
    });
  }

  onSelectedType(value: string): void {
    this.backupdto.type = value;
  }
}
