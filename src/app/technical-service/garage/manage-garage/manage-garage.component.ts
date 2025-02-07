import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { IncityRequestService } from 'src/app/request/incity-request/incity-request.service';
import { Garage } from 'src/app/types/garage';

@Component({
  selector: 'app-manage-garage',
  templateUrl: './manage-garage.component.html',
  styleUrls: ['./manage-garage.component.css']
})
export class ManageGarageComponent implements OnInit {
  garage: Garage[];
  length:number;
  disposegarage:Garage|undefined;

  constructor(
    private router:Router,
    private service:IncityRequestService,
    private alert:AlertService
  ) { }


  ngOnInit(): void {
    this.getGarage();
  }


  getGarage() {
    this.service.getGarage().subscribe({
      next: (resp) => {
        this.garage = resp;
        this.length=resp.length;

        setTimeout(()=>{                      
          $('#garageTable').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            autoWidth:false,
            retrieve: true,
            processing: true,
            lengthMenu : [5, 10, 25],
            order:[[1,"desc"]]
        } );
        }, 1);
      },
      error: () => {
        alert("Sorry, your request could not be fetched");
      }
    });
  }


  editGarage(id: number){
    this.router.navigate(['/addGarage',id]);
  }

  disposeGarage(id:number){
    this.service.disposeGarage(id).subscribe({
      next:()=>{
        this.alert.sucessAlert("You have successfully disposed of a garage!");
        this.router.navigate(['manageGarage']);
        this.getGarage();
      },
      error:()=>{
        this.alert.errorAlert("You couldn't dispose of a garage");
        this.router.navigate(['manageGarage']);
      }
    });
  }


  public openModal(gar: Garage, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'dispose') {
      this.disposegarage = gar;
      button.setAttribute('data-target', '#disposeGarageModal');
    }
    container?.appendChild(button);
    button.click();
  }
  
}
