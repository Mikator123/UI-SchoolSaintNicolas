import { Injectable } from '@angular/core';
import {UserDetailed} from '../../Models/UserDetailed.model';
import {AuthService} from '../../../auth/Services/Auth/auth.service';
import { Observable } from 'rxjs';
import {UserService} from '../../Services/user.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserDetailed> {

  constructor(
    private _auth : AuthService,
    private _user: UserService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserDetailed | Observable<UserDetailed> | Promise<UserDetailed> {
    let Id: number = parseInt(route.paramMap.get('id'));
    return this._user.getById(Id);
  }


}
