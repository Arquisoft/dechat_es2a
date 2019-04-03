import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {LoginPopupComponent} from './login-popup/login-popup.component';
import {LoginComponent} from './login/login.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AmigosListComponent } from './components/amigos-list/amigos-list.component';
import { EnvioChatComponent } from './components/envio-chat/envio-chat.component';

import { WhatsappCanvasComponent } from './components/chat/chat-fondo/whatsapp-canvas.component';

// Services
import { AuthService } from './services/solid.auth.service';
import {FriendService} from './services/friend.service';
import { AuthGuard } from './services/auth.guard.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';




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
    path: 'login-popup',
    component: LoginPopupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'card',
    component: CardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent
  },
    {
        path: 'components/amigos-list',
        component: AmigosListComponent,
    },
    {
      path: 'components/envio-chat/:parametro',
      component: EnvioChatComponent,
    },
    {
      path: 'components/chat/chat-fondo',
      component:WhatsappCanvasComponent,
    }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPopupComponent,
    DashboardComponent,
    CardComponent,
    RegisterComponent,
    AmigosListComponent,
    EnvioChatComponent,
    WhatsappCanvasComponent
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
  providers: [AuthService,FriendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
