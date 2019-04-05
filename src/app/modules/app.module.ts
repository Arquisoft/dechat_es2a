import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from '../components/app/app.component';
import {MaterialModule} from './material.module';
import {WhatsappCanvasComponent} from '../components/whatsapp-canvas/whatsapp-canvas.component';
import {WhatsappFriendComponent} from '../components/whatsapp-friend/whatsapp-friend.component';
import {WhatsappFriendListComponent} from '../components/whatsapp-friend-list/whatsapp-friend-list.component';
import {WhatsappFriendMessageComponent} from '../components/whatsapp-friend-message-list/whatsapp-friend-message.component';
import {WhatsappFriendSearchComponent} from '../components/whatsapp-friend-search/whatsapp-friend-search.component';
import {FriendService} from '../services/friend.service';
import {WhatsappMessageComponent} from '../components/whatsapp-message/whatsapp-message.component';
import {LoginPopupComponent} from '../login-popup/login-popup.component';
import {LoginComponent} from '../components/login/login.component';
import { AuthService } from '../services/solid.auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//----------------------------------------------------------------

// Services
import { AuthGuard } from '../services/auth.guard.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: WhatsappCanvasComponent,
    canActivate: [AuthGuard],
  }
];
@NgModule({
  declarations: [
    AppComponent,
    WhatsappCanvasComponent,
    WhatsappFriendListComponent,
    WhatsappFriendComponent,
    WhatsappFriendMessageComponent,
    WhatsappFriendSearchComponent,
    WhatsappMessageComponent,
    LoginPopupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgSelectModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [FriendService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
