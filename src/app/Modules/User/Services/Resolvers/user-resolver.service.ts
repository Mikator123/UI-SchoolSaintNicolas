import { Injectable } from '@angular/core';
import {UserDetailed} from '../../Models/UserDetailed.model';
import {AuthService} from '../../../auth/Services/Auth/auth.service';
import { Observable } from 'rxjs';
import {UserService} from '../../Services/user.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserDetailed> {

  constructor(
    private _auth : AuthService,
    private _user: UserService
  ) { }

  resolve(): Observable<UserDetailed>
  {
    let Id: number;
    this._auth.user$.subscribe(data => Id = data.id);
    return this._user.geById(Id);
  }
}
