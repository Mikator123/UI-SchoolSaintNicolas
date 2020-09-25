import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './Modules/auth/Services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  public isDark = false;
 
  
  constructor(@Inject(DOCUMENT) 
  private document:Document, 
  private renderer:Renderer2,){}


  switchMode(isDarkMode: boolean){
    const hostClass = isDarkMode ? 'theme-dark' : 'theme-light';
    this.isDark = isDarkMode ? true: false;
    this.renderer.setAttribute(this.document.body,'class', hostClass);
  }


}
