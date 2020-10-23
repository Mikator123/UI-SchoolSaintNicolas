import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../Services/school.service';
import {SchoolEvent} from '../../Models/SchoolEvent.model';

@Component({
  selector: 'app-school-event',
  templateUrl: './school-events.component.html',
  styleUrls: ['./school-events.component.scss']
})
export class SchoolEventsComponent implements OnInit {

  showEvents = false;
  schoolEvents : SchoolEvent[] = []

  constructor(
    private _schoolService: SchoolService
  ) { }

  ngOnInit(): void {
  }

  invertShowEvents(){
    this.showEvents = !this.showEvents
    this._schoolService.getEvents().subscribe({
      next: data => {this.schoolEvents = data},
      error: error => {console.log(error)}
    })
  }

}
