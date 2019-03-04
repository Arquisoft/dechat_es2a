import { Component, OnInit, ViewChild } from '@angular/core';
import { RdfService } from '../../services/rdf.service';



@Component({
  selector: 'app-envio-chat',
  templateUrl: './envio-chat.component.html',
  styleUrls: ['./envio-chat.component.css']
})
export class EnvioChatComponent implements OnInit {

  fileClient: any;

  constructor(private rdf: RdfService) { }

  ngOnInit() {
    this.fileClient = require('solid-file-client');
  }

  private createNewFolder(){

    //Para crear la carpeta necesito una ruta que incluya el nombre de la misma.
    //Obtengo el ID del usuario y sustituyo  lo irrelevante por la ruta de public/NombreCarpeta
    let solidId = this.rdf.session.webId;
    let stringToChange = "/profile/card#me";
    solidId = solidId.replace(stringToChange,"/public/probando")

    //Necesito logearme en el cliente para que me de permiso, sino me dara un error al intentar
    //crear la carpeta. Como ya estoy en sesion no abre nada pero si se abre la consola se ve
    // que se ejecuta correctamente.
    this.fileClient.popupLogin().then( webId => {
      console.log( `Logged in as ${webId}.`)
    }, err => console.log(err) );

    //Le paso la URL de la carpeta y se crea en el pod. SI ya esta creada no se si la sustituye o no hace nada
    this.fileClient.createFolder(solidId).then(success => {
      console.log(`Created folder ${solidId}.`);
    }, err => console.log(err) );

    document.write("Carpeta creada. Mira en tu POD para verla!")
  }
}
