import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserSimplified } from 'src/app/Modules/auth/Models/UserSimplified.model';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { UserDetailed } from 'src/app/Modules/User/Models/UserDetailed.model';
import { UserService } from 'src/app/Modules/User/Services/user.service';
import { Lunch } from '../../Models/Lunch.model';
import {LunchService} from '../../Services/lunch.service';
import { LunchIngredientsComponent } from './lunch-ingredients/lunch-ingredients.component';
import { LunchWithPersonsComponent } from './lunch-with-persons/lunch-with-persons.component';

export interface LunchUserListDialog {
  lunch: Lunch
}

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.scss']
})
export class LunchComponent implements OnInit, OnDestroy {


  lunches: Lunch[] = [];
  lunchSubscription: Subscription
  savedLunches: Lunch[] = [];
  emptyMsg = false;
  lunchPanelState : Boolean[] = [];
  slideColor: ThemePalette = 'primary';
  slideCheck = false;
  disabledButton = true;
  date1Selected = new FormControl();
  date2Selected = new FormControl();
  userId: number;
  user:UserDetailed = new UserDetailed();

  constructor(
    private _lunchService: LunchService,
    public dialog : MatDialog,
    private _dateAdapter: DateAdapter<any>,
    private _authService: AuthService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this._authService.user$.subscribe(user => {
      if(user != null)
        this.userId = user.id;});
    this._userService.getById(this.userId).subscribe(data => {
      this.user = data
    })
    this._dateAdapter.setLocale('fr');
    this._lunchService.getLunches();
    this.lunchSubscription = this._lunchService.lunchSubject.subscribe((list:Lunch[]) => {
      
        this.lunches = list;
        this.savedLunches = list;
        if(this.lunches == null || this.lunches == undefined) return;
        this.lunches.sort(function compare(a,b){
          if (a.date < b.date)
            return -1;
          if (a.date > b.date)
            return 1;
          return 0;
        })
        this.savedLunches.sort(function compare(a,b){
          if (a.date < b.date)
            return -1;
          if (a.date > b.date)
            return 1;
          return 0;
        })
        
        this.lunchPanelState.length = this.lunches.length;
      for(let i = 0; i < this.lunchPanelState.length; i++){
        this.lunchPanelState[i] = false;
      }
    })
  }
  ngOnDestroy():void{
    this.lunchSubscription.unsubscribe()
  }

  checkInscription(lunchId: number): boolean{
    let success = false;
    if(this.user == null || this.user == undefined) return;
    this.user.lunches.forEach(lunch => {
      if (lunch.id == lunchId)
        success = true;
    });
    return success
  }

  UnSubscribeFromLunch(lunchId: number, index: number){
    this._lunchService.UnSubscribeFromLunch(lunchId, this.userId);
  }

  SubscribeToLunch(lunchId: number, index: number){
    this._lunchService.SubscribeToLunch(lunchId, this.userId)
  }


  selectedChoices(){
    if(this.emptyMsg == true) this.emptyMsg = false;
    let selectedLunchesByDates : Lunch[] = [];
    if(this.slideCheck == false){
      this.savedLunches.forEach(lunch => {
        lunch.date = new Date(lunch.date)
        if(lunch.date.getTime() == this.date1Selected.value.getTime()){
          selectedLunchesByDates.push(lunch)
          return;
        }
      });
    }
    if(this.slideCheck == true){
      this.savedLunches.forEach(lunch => {
        lunch.date = new Date(lunch.date);
        if(lunch.date >= this.date1Selected.value && lunch.date <= this.date2Selected.value){
          selectedLunchesByDates.push(lunch)
        }
      })
    }
    if(selectedLunchesByDates.length == 0)
      this.emptyMsg = true;
    this.lunches = selectedLunchesByDates;
  }

  resetChoices(){
    this.lunches = this.savedLunches;
    this.date1Selected.setValue(null);
    this.date2Selected.setValue(null);
    this.emptyMsg = false;
  }

  openListDialog(lunch: Lunch){
    let ref = this.dialog.open(LunchWithPersonsComponent,{
      data : lunch,
      disableClose: false,
    })
  }


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  openIngredientDialog(/*lunch.ingredients*/){
    let ref = this.dialog.open(LunchIngredientsComponent)
  }

  get disablingButton(){
    let check = true;
    if(this.slideCheck == false){
      if(this.date1Selected.value || this.date1Selected.value != null)
        check = false;
    }
    else{
      if(this.date1Selected.value && this.date2Selected.value)
        check = false;
    }
    return check
  }
}
