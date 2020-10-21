import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Modules/auth/Services/Auth/auth.service';
import { SchoolRule } from '../../Models/SchoolRule.model';
import {SchoolService} from '../../Services/school.service'

@Component({
  selector: 'app-school-rules',
  templateUrl: './school-rules.component.html',
  styleUrls: ['./school-rules.component.scss']
})
export class SchoolRulesComponent implements OnInit {

  rules : SchoolRule[] = [];
  rule : SchoolRule;
  showRules = false;

  constructor(
    private _schoolService: SchoolService,
    private _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._schoolService.getRules().subscribe(r => this.rules = r);
  }

  invertShowRules(){
    this.showRules = !this.showRules
  }

}
