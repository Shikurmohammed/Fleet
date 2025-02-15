import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { UpdatePriceService } from '../update-price.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css'],
})
export class UpdatePriceComponent implements OnInit {
  data: any = [];
  form!: FormGroup;
  fuelId: any = '';
  submitted = false;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) pagintor!: MatPaginator;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  searchQuery: any;
  displayedColumns: string[] = ['typeOfFuel', 'price', 'action'];
  public dataSource = new MatTableDataSource<FuelDetail>([]);

  constructor(
    private fuelService: UpdatePriceService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFuelDetail();
    this.form = this.formBuilder.group({
      id: this.fuelId,
      typeOfFuel: [''],
      price: ['', Validators.pattern('^[0-9]+(.[0-9]{0,2})?$')],
    });
  }

  get f() {
    return this.form.controls;
  }

  public getFuelDetail(): void {
    this.fuelService.getFuelDetail().subscribe((fuel: FuelDetail[]) => {
      this.data = fuel;
      this.dataSource.data = fuel;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.pagintor;
    });
  }

  updatePrice() {
    this.submitted = true;
    if (this.form.valid) {
      this.fuelService
        .updatePrice(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.sucessAlert('Price Updated Successfully.');
            this.getFuelDetail();
          },
          error: () => {
            this.alertService.errorAlert('Price Could not be Updated.');
          },
        });
    }
  }

  search() {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }
  update(fuel: FuelDetail) {
    this.form.patchValue(fuel);
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '400px',
      data: { message: 'Hello from template!' }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });

  }
  onClose() {
    this.dialogRef.close()
  }


}
