
import { Component, OnInit } from '@angular/core';
import { mdiBottleWineOutline } from '@mdi/js';
import { Observable } from 'rxjs';
import { UserSimplified } from 'src/app/Modules/auth/Models/UserSimplified.model';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { User } from 'src/app/Modules/professor/Models/Class.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: UserSimplified = new UserSimplified();

  constructor(
    private _authService : AuthService,
  ) { 
    
  }

  ngOnInit(): void {
    this._authService.user$.subscribe(data => {
      if (data != null)
        this.user = data
      })

  }

 

}
