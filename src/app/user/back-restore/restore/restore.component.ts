import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { Backup } from 'src/app/types/Backup';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.css'],
})
export class RestoreComponent implements OnInit {
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
    //this.fpath = this.fpath + this.date + '.bak';
  }

  restore(path: string) {
    this.backupdto.filePath = path;

    this.dbService.restore(this.backupdto).subscribe({
      next: (event: any) => {
        this.alertService.sucessAlert('Database Restored Successfully.');
      },
      error: (err: any) => {
        //alert(error.message);
        //console.log(err.error.message);
        this.alertService.errorAlert('Server Error');
      },
    });
  }

  onSelectedType(value: string): void {
    this.backupdto.type = value;
  }
}
