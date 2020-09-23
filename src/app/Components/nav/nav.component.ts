import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserSimplified } from 'src/app/Modules/auth/Models/UserSimplified.model';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { UserContactMail} from '../../Modules/User/Models/UserContactMail.model';
import { UserService } from '../../Modules/User/Services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  userId: number = null;
  user : UserSimplified = null;
  ThemeLight: boolean = false;
  contactList : UserContactMail[] = [];
  myMailsSubscription : Subscription;

  @Output()
  readonly darkModeSwitched = new EventEmitter<Boolean>();

  user$: Observable<UserSimplified>;

  constructor(
    private _userService : UserService,
    private _auth: AuthService,
  ) {}
  
  onDarkModeSwitched(){
    this.clickTheme();
    this.darkModeSwitched.emit(this.ThemeLight);
  }

  ngOnInit(): void { 
    this.myMailsSubscription = this._userService.mailSubject.subscribe((list : UserContactMail[]) => {this.contactList = list});
    this.user$ = this._auth.userSubject;
    this.user$.subscribe(user => {
      if (user == null || user.classId == null) return;
      this._userService.getMails(user.classId);
      this.userId = user.id;

    })
  }

  clickTheme(){
    this.ThemeLight = !this.ThemeLight;
  }

  logout(){
    this._auth.Logout();
  }





}

