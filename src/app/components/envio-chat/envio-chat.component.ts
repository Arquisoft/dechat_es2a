import { Component, OnInit, ViewChild } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { ActivatedRoute, Params } from '@angular/router';
const Message = require('../../Modelo/Mensaje');

@Component({
  selector: 'app-envio-chat',
  templateUrl: './envio-chat.component.html',
  styleUrls: ['./envio-chat.component.css']
})
export class EnvioChatComponent implements OnInit {

    fileClient: any;
    ruta_seleccionada: string;

    constructor(private rdf: RdfService, private rutaActiva: ActivatedRoute) {
        this.rutaActiva.params.subscribe(data => {
            console.log(data['parametro']);
            this.ruta_seleccionada = data['parametro'];
            console.log(this.ruta_seleccionada);
            console.log(typeof this.ruta_seleccionada);
        });
    }

    ngOnInit() {
        this.fileClient = require('solid-file-client');
    }

    private getUserByUrl(ruta: string): string {
        let sinhttp = ruta.replace('https://', '');
        let user = sinhttp.split('.')[0];
        return user;

    }

    async createNewFolder() {

        //Para crear la carpeta necesito una ruta que incluya el nombre de la misma.
        //Obtengo el ID del usuario y sustituyo  lo irrelevante por la ruta de public/NombreCarpeta
        let solidId = this.rdf.session.webId;
        let stringToChange = "/profile/card#me";
        let user = this.getUserByUrl(this.ruta_seleccionada);
        let path = "/public/" + user;
        solidId = solidId.replace(stringToChange, path);

        //Necesito logearme en el cliente para que me de permiso, sino me dara un error al intentar
        //crear la carpeta. Como ya estoy en sesion no abre nada pero si se abre la consola se ve
        // que se ejecuta correctamente.
        this.fileClient.popupLogin().then(webId => {
            console.log(`Logged in as ${webId}.`)
        }, err => console.log(err));

        //Le paso la URL de la carpeta y se crea en el pod. SI ya esta creada no se si la sustituye o no hace nada
        this.fileClient.createFolder(solidId).then(success => {
            console.log(`Created folder ${solidId}.`);
        }, err => console.log(err));



        console.log("SolidID: " + solidId);
        console.log("Emisor: " + this.rdf.session.webId);
        console.log("Receptor: " + this.ruta_seleccionada);

        var mensaje = new Message(this.rdf.session.webId, this.ruta_seleccionada, 'probando');
        const mensajes = [];
        mensajes.push(mensaje);

        const messagesJSON = this.buildJSONmessages(this.rdf.session.webId.replace('https://', '').replace('/profile/card#me', ''), this.ruta_seleccionada.replace('https://', '').replace('/profile/card#me', ''), mensajes);

        // var messagesJSON = txtFileBuilder.buildJSONmessages(userID, partnerID, messages);

        this.fileClient.createFile(solidId, messagesJSON).then(200);



    }

    buildJSONmessages(emisor, receptor, messages)
    {

        var actualizacion = new Date().getTime();

        var tostr = JSON.stringify({'webid_sender': emisor, 'webid_receiver': receptor, 'lastupdate': actualizacion, 'messages': '__'});
        var sepsa = tostr.split('"__"');
        var ret = '////' + sepsa[0] + '[';
        var i;
        for (i = 0; i < messages.length; i++) {
            ret = ret + messages[i].serialize();
            if (i != messages.length - 1) {
                ret = ret + ',';
            }
            else {
                ret = ret + ']' + sepsa[1] + '////';
            }
        }
        console.log(ret);
        return ret;
    }
}
