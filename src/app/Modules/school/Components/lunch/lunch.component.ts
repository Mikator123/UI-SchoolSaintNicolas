import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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

  constructor(
    private _lunchService: LunchService,
    public dialog : MatDialog,
  ) { }

  ngOnInit(): void {
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

  selectedChoices(){

  }

  resetChoices(){

  }

  openListDialog(lunch: Lunch){
    let ref = this.dialog.open(LunchWithPersonsComponent,{
      data : lunch,
      disableClose: false,
    })
  }

  openIngredientDialog(/*lunch.ingredients*/){
    let ref = this.dialog.open(LunchIngredientsComponent)
  }

}
