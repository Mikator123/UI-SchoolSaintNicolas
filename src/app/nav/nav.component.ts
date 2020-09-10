import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatListModule, MatListItem, MatNavList } from '@angular/material/list';
import { MatMenuItem } from '@angular/material/menu';
import { UserContactMail } from '../Models/User/UserContactMail.model';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  ThemeLight: boolean = true;
  contactList : UserContactMail[] = [];
  mySubscription : Subscription;

  constructor(
    private _userService : UserService,
  ) {}
  
  ngOnInit(): void { 
    this.mySubscription = this._userService.userSubject.subscribe((list : UserContactMail[]) => {this.contactList = list});
    this._userService.getMails();

  }

  clickTheme(){
    this.ThemeLight = !this.ThemeLight;
  }



}

