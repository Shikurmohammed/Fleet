import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AlertService } from 'src/app/alert.service';
import { FuelDetail } from 'src/app/types/FuelDetail';
import { UpdatePriceService } from '../update-price.service';

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

  constructor(
    private fuelService: UpdatePriceService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {}

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
    });
  }

  public onOpenModal(fuel: FuelDetail, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'modify') {
      this.assignValue(fuel);
      button.setAttribute('data-target', '#updatePriceModal');
    }
    container?.appendChild(button);
    button.click();
  }

  assignValue(fuel: FuelDetail) {
    //this.fuelId = fuel.id;
    this.form.patchValue(fuel);
  }

  updatePrice() {
    this.submitted = true;
    if (this.form.valid) {
      ($('#updatePriceModal') as any).modal('hide');
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
}
