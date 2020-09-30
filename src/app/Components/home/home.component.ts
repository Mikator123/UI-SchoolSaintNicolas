
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



  constructor(
  ) { 
    
  }

  ngOnInit(): void {

  }

 

}
