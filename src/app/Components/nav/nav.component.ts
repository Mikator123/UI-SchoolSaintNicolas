import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { UserSimplified } from 'src/app/Modules/auth/Models/UserSimplified.model';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { UserContactMail} from '../../Modules/User/Models/UserContactMail.model';
import { UserService } from '../../Modules/User/Services/user.service';
import { SendMailComponent } from '../send-mail/send-mail.component';
import {ClassService} from '../../Modules/school/Services/class.service';
import { UserForEntities } from 'src/app/Modules/school/Models/UserForEntities.model';
import { Router } from '@angular/router';

export interface sendEmailToDialog{
  email:string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy{

  userId: number = null;
  user : UserSimplified = null;
  ThemeLight: boolean = false;
  greetingClass:string;
  contactList : UserContactMail[] = [];
  myMailsSubscription : Subscription;
  professor: UserForEntities;
  currentUrl: string;

  @Output()
  readonly darkModeSwitched = new EventEmitter<Boolean>();

  user$: Observable<UserSimplified>;

  constructor(
    private _userService : UserService,
    private _auth: AuthService,
    private _class: ClassService,
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
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
      if (user.classId != null){
        if (user.statusCode == 2)
          this._userService.getMails(user.classId);
        if (user.statusCode == 1)
          this._class.getClassById(user.classId).subscribe(x => this.professor = x.users.find(y => y.statusCode == 2));
      }
      this.user = user;
    });
    this.greetingClass = 'bounce-in-top';
    setTimeout(() => {this.greetingClass = 'text-flicker-out-glow';}, 5000)
  }

  ngOnDestroy(): void {
    console.log(this.myMailsSubscription)
    this.myMailsSubscription.unsubscribe();
    console.log(this.myMailsSubscription)
  }

  clickTheme(){
    this.ThemeLight = !this.ThemeLight;
  }

  logout(){
    this._auth.Logout();
    this.user = null;
  }

  openEmailDialog(directMail?: string, user?: UserContactMail){
    let emailForDialog: string = "";
    if (user != undefined){
      user.contacts.forEach(contact => {
        emailForDialog = emailForDialog + contact.email + "; "
      });
    }
    else
      emailForDialog = directMail;
    let ref = this.dialog.open(SendMailComponent,{
      width:'80vw',
      height:'80vh',
      disableClose:true,
      data: {email: emailForDialog}
    })
    ref.afterClosed().subscribe(success => {
      if (success == true)
        this.snackBar.open("Mail envoyé avec succès.", null, {duration: 3000})
    });
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

