import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
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
export class LunchComponent implements OnInit {


  lunches: Lunch[] = [];
  savedLunches: Lunch[] = [];
  emptyMsg = false;
  lunchPanelState : Boolean[] = [];
  slideColor: ThemePalette = 'primary';
  slideCheck = false;
  disabledButton = true;
  date1Selected = new FormControl();
  date2Selected = new FormControl();

  constructor(
    private _lunchService: LunchService,
    public dialog : MatDialog,
    private _dateAdapter: DateAdapter<any>,
  ) { }

  ngOnInit(): void {
    this._dateAdapter.setLocale('fr');
    this._lunchService.getLunches().subscribe({
      next: data => {
        this.lunches = data;
        this.savedLunches = data;
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
      }},
      error: error => console.log(error),
    })
  }

  // addUserToLunch(lunchId: number, userId: number){
  //   this._lunchService.linkLunchWithUser(lunchId, userId) 
  // }

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
