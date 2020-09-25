
import { Component, OnInit } from '@angular/core';
import { mdiBottleWineOutline } from '@mdi/js';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { User } from 'src/app/Modules/professor/Models/Class.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name : string;
  user$: Observable<User>

  constructor(
    private _authService : AuthService
  ) { 
    
  }

  ngOnInit(): void {
    // this._authService.user$.subscribe(x => this.name = x.firstName +" "+ x.lastName);
    this.user$ = this._authService.user$;
    this.user$.subscribe(data => {
      if (data == null) this.name = '';
      else this.name = `${data.firstName} ${data.lastName}`;
    })
  }

  get WelcomeMsg():string{
    let msg = "";
    let date = new Date();
    let time = date.getHours();
    if (time >= 6 && time < 8)
      msg = "Déjà au travail "+ this.name + " !";
    if (time >= 8 && time < 18)
      msg = "Bonjour "+this.name +".";
    if (time >=18 && time < 22)
      msg = "Bonsoir "+this.name +".";
    if (time >= 22 && time < 6)
      msg = "Encore au travail "+ this.name +" !";
    return msg;
  }

}
