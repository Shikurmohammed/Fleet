import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
@Input() isOpen:boolean=true;
  constructor() { }
  currentYear!:number;
  ngOnInit(): void {
     this.currentYear = new Date().getFullYear();
     console.log("Is sidebar full ",this.isOpen)
  }

}
