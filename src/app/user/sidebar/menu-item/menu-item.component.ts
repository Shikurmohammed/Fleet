import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/app/types/Menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() item: Menu = { id: 0, name: '', icon: '', url: '', subMenu: [], roles: [], order_index: 0, parent_id: 0, query_param: {} };
  @Input() index: number;
  @Input() nestedMenuOpen: BehaviorSubject<number | null>;
  @Output() toggle = new EventEmitter<void>(); // Emit an event when toggled
@Input() isOpen :boolean;
  isMenOpen: boolean = false;

  ngOnInit() {
      this.nestedMenuOpen.subscribe(index => {
          this.isMenOpen = index === this.index;
      });
  }

  toggleNestedMenu() {
      // Emit toggle event to parent
      this.toggle.emit();
  }
}
