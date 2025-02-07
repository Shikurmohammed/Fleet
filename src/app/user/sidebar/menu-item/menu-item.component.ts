import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/types/Menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() item: Menu = { id: 0, name: '', icon: '', url: '', subMenu: [], roles: [], order_index: 0, parent_id: 0, query_param: {} };
@Input() isOpen:boolean;
  constructor() { }

  ngOnInit(): void {
  }

  nestedMenuOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  nestedMenuOpen$= this.nestedMenuOpen.asObservable();//observable to subscribe to nestedMenuOpen
  toggleNestedMenu() {
   // console.log("nestedMenuOpen Before",this.nestedMenuOpen.getValue());
    if(!this.item.subMenu){
      return;
    }
    this.nestedMenuOpen.next(!this.nestedMenuOpen.value);
    //console.log("nestedMenuOpen After",this.nestedMenuOpen.getValue());
  }
}
