import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthdate'
})
export class BirthdatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {

    return this.weekDayToString(value.getDay()) + ' ' + value.getDate() + ' ' + 
      this.monthToString(value.getMonth()) + ' ' + value.getFullYear();

    
  }

  weekDayToString(weekDay : number):string{
    switch(weekDay)
    {
      case 0:
        return "Dimanche";
      case 1:
        return "Lundi";
      case 2:
        return "Mardi";
      case 3:
        return "Mercredi";
      case 4:
        return "Jeudi";
      case 5: 
        return "Vendredi";
      case 6:
        return "Samedi";
    }
  }
  monthToString(month : number):string{
    switch(month)
    {
      case 0:
        return "Janvier";
      case 1:
        return "Février";
      case 2:
        return "Mars";
      case 3:
        return "Avril";
      case 4:
        return "Mai";
      case 5:
        return "Juin";
      case 6:
        return "Juillet";
      case 7:
        return "Aout";
      case 8:
        return "Septembre";
      case 9:
        return "Octobre";
      case 10:
        return "Novembre";
      case 11:
        return "Décembre";
    }
  }
}