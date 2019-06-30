import { Component, OnInit, ElementRef } from '@angular/core';
import auth from 'solid-auth-client';


declare let popup: any;


@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.runScript();
  }

  runScript() {
    // const auth = require('solid-auth-client')
    auth.trackSession(session => {
      if (!session) {
        console.log('The user is not logged in');
        //  auth.popupLogin({ popupUri: 'http://localhost:4200/popup.html' });
        return false;
      } else
        console.log(`The user is ${session.webId}`);
    });

    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '/assets/js/libs/popup.js';
    // s.src = 'popup.js';
    this.elementRef.nativeElement.appendChild(s);

    // s.onload = () => this.triggerDuo();
  }
}
