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
  greetingClass:string;
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
      if (user == null) return;
      if (user.classId != null)
        this._userService.getMails(user.classId);
      this.user = user;
    })
    this.greetingClass = 'bounce-in-top';
    setTimeout(() => {this.greetingClass = 'bounce-out-top';}, 6000)
  }

  clickTheme(){
    this.ThemeLight = !this.ThemeLight;
  }

  logout(){
    this._auth.Logout();
    this.user = null;
  }

  get WelcomeMsg():string{
    let name = this.user.firstName + " " + this.user.lastName
    let msg = "";
    let date = new Date();
    let time = date.getHours();
    if (time >= 6 && time < 8)
      msg = "Déjà au travail "+ name + " !";
    if (time >= 8 && time < 18)
      msg = "Bonjour "+name +".";
    if (time >=18 && time < 22)
      msg = "Bonsoir "+name +".";
    if (time >= 22 && time < 6)
      msg = "Encore au travail "+ name +" !";
    return msg;
  }

}

