import { Component, HostBinding, Inject, Renderer2 } from '@angular/core';
import {AuthService} from '../app/Services/Auth/auth.service';
import { ɵangular_packages_router_router_h } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{


  constructor(@Inject(DOCUMENT) 
  private document:Document, 
  private renderer:Renderer2,
  private _auth: AuthService){}


  switchMode(isDarkMode: boolean){
    const hostClass = isDarkMode ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body,'class', hostClass);
  }
}
