import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { RequesterGuard } from 'src/app/guards/requester.guard';
import { RequestService } from 'src/app/request/request-home/request.service';
import IdleTimer from "./../../IdleTimer";
import { MenuService } from './menu.service';
import { Menu } from '../../types/Menu';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = true; // Is sidebar open
  menuItems: Menu[] = [];
  currentRole: string = sessionStorage.getItem("role");
  userName: string = sessionStorage.getItem("username");
  delegated = +sessionStorage.getItem("delegated").toString();//I will consider this later


  userguide: string = "#";

  timer: any;
  constructor(
    private menuService: MenuService
  ) {

  }

  ngOnInit(): void {
    this.menuItems = this.menuService.getMenuItems(this.currentRole,this.delegated);
  }

}
