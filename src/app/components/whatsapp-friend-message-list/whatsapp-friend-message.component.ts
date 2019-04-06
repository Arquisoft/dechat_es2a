import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user';
import {FriendService} from '../../services/friend.service';
import {Message} from '../../classes/message';
import { RdfService } from '../../services/rdf.service';
import { AuthService } from '../../services/solid.auth.service';
declare let $rdf: any;

@Component({
  selector: 'app-whatsapp-friend-message-list',
  templateUrl: './whatsapp-friend-message.component.html',
  styleUrls: ['./whatsapp-friend-message.component.scss']
})
export class WhatsappFriendMessageComponent implements OnInit {
  public friend: User;

  fileClient: any;

  constructor(private _friendService: FriendService,private rdf: RdfService) {
  }

  ngOnInit() {
    this.fileClient = require('solid-file-client');
    if (this.friend){
       const name = this.getUserByUrl(this.friend.solidLink);
       this.createNewFolder('dechat2a', '/public/');
       this.createNewFolder(name, '/public/dechat2a/');
    }
    
    this._friendService.getSelectedFriendObservable().subscribe(friend => this.friend = friend);
  }

  private getUserByUrl(ruta: string): string {
    let sinhttp;
    sinhttp = ruta.replace('https://', '');
    const user = sinhttp.split('.')[0];
    return user;
}

private createNewFolder(name: string, ruta: string) {
  //Para crear la carpeta necesito una ruta que incluya el nombre de la misma.
  //Obtengo el ID del usuario y sustituyo  lo irrelevante por la ruta de public/NombreCarpeta
  let solidId = this.rdf.session.webId;
  let stringToChange = '/profile/card#me';
  let path = ruta + name;
  solidId = solidId.replace(stringToChange, path);

  //Necesito logearme en el cliente para que me de permiso, sino me dara un error al intentar
  //crear la carpeta. Como ya estoy en sesion no abre nada pero si se abre la consola se ve
  // que se ejecuta correctamente.

  this.buildFolder(solidId);

}

private buildFolder(solidId) {
  this.fileClient.readFolder(solidId).then(folder => {
      console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
  }, err => {
      //Le paso la URL de la carpeta y se crea en el pod. SI ya esta creada no se si la sustituye o no hace nada
      this.fileClient.createFolder(solidId).then(success => {
          console.log(`Created folder ${solidId}.`);
      }, err1 => console.log(err1));

  });
} 


  sendMessage(event, message: string) {
    this._friendService.sendMessage(message, this.friend);
    event.target.value = '';
  }

  getMessageSender(message: Message) {
    let sender = 'whatsapp-message-out';

    if (message.sender.name === this.friend.name) {
      sender = 'whatsapp-message-in';
    }

    return sender;
  }

}
