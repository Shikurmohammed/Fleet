import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  Swal = require('sweetalert2');
  constructor() {}

  sucessAlert(message: string) {
    var Toast = this.Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    });

    Toast.fire({
      icon: 'success',
      title: message,
    });
  }

  errorAlert(message: string) {
    var Toast = this.Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    });
    Toast.fire({
      icon: 'error',
      title: message,
    });
  }
  warningAlert(message: string) {
    var Toast = this.Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
    });
    Toast.fire({
      icon: 'warning',
      title: message,
    });
  }
}
