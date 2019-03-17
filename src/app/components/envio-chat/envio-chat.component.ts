import { Component, OnInit, ViewChild } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { ActivatedRoute, Params } from '@angular/router';
import {message} from '../../Modelo/message.model';
import {Friend} from '../../Modelo/friend.model';
import {SolidProfile} from '../../models/solid-profile.model';

@Component({
    selector: 'app-envio-chat',
    templateUrl: './envio-chat.component.html',
    styleUrls: ['./envio-chat.component.css']
})
export class EnvioChatComponent implements OnInit {

    fileClient: any;
    ruta_seleccionada: string;
    messages: message[] = [];
    ruta: string;

    constructor(private rdf: RdfService, private rutaActiva: ActivatedRoute) {
        this.rutaActiva.params.subscribe(data => {
            this.ruta_seleccionada = data['parametro'];
        });
    }

    ngOnInit() {
        /*this.fileClient = require('solid-file-client');
        const name = this.getUserByUrl(this.ruta_seleccionada);
        this.createNewFolder('dechat', '/public/');
        this.createNewFolder(name, '/public/dechat/');
        */
        this.fileClient = require('solid-file-client');
        const name = this.getUserByUrl(this.ruta_seleccionada);
        this.createNewFolder('dechat2a', '/public/');
        this.createNewFolder(name, '/public/dechat2a/');

    }

    private getUserByUrl(ruta: string): string {
        let sinhttp;
        sinhttp = ruta.replace('https://', '');
        const user = sinhttp.split('.')[0];
        return user;
    }

    /**
     * Crear carpeta
     * @param name
     * @param ruta
     */
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

    //method that creates the folder using the solid-file-client lib
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


    async escribir() {

        let myUser = this.getUserByUrl(this.rdf.session.webId);
        let user = this.getUserByUrl(this.ruta_seleccionada);
        var messageContent = (<HTMLInputElement>document.getElementById("usermsg")).value;
        //(document.getElementById("usermsg") as HTMLInputElement).value = "";
        console.log(messageContent);
        //Sender WebID
        let senderId = this.rdf.session.webId;
        let senderPerson: Friend = {webid: senderId};

        //Receiver WebId
        let recipientPerson: Friend = {webid: this.ruta_seleccionada}


        let messageToSend: message = {content: messageContent, date: new Date(Date.now()), sender: senderPerson, recipient: recipientPerson}
        let stringToChange = '/profile/card#me';
        let path = '/public/dechat2a/' + user + '/Conversation.txt';

        senderId = senderId.replace(stringToChange, path);

        let message = await this.readMessage(senderId);

        this.ruta = senderId;

        //For TXTPrinter
        if (message != null) {
            this.updateTTL(senderId, message + "\n" + new TXTPrinter().getTXTDataFromMessage(messageToSend));
            if (this.messages.indexOf(message) !== -1) {
                this.messages.push(message);
                console.log("MESSAGES: " + this.messages);
            }
        } else {
            this.updateTTL(senderId, new TXTPrinter().getTXTDataFromMessage(messageToSend));
        }

        (<HTMLInputElement>document.getElementById('usermsg')).value = '';
        this.actualizar();
    }

    private async readMessage(url) {
        this.ruta = url;
        var message = await this.searchMessage(url)
        return message;
    }

    //method that search for a message in a pod
    private async searchMessage(url) {
        console.log("URL: " + url);
        return await this.fileClient.readFile(url).then(body => {
            console.log(`File	content is : ${body}.`);
            return body;
        }, err => console.log(err));

    }

    private updateTTL(url, newContent, contentType?) {
        if (contentType) {
            this.fileClient.updateFile(url, newContent, contentType).then(success => {
                console.log(`Updated ${url}.`)
            }, err => console.log(err));
        } else {
            this.fileClient.updateFile(url, newContent).then(success => {
                console.log(`Updated ${url}.`)
            }, err => console.log(err));
        }
    }

    async actualizar() {
        this.messages = [];
        let user = this.getUserByUrl(this.ruta_seleccionada);
        let senderId = this.rdf.session.webId;
        let stringToChange = '/profile/card#me';
        let path = '/public/dechat2a/' + user + '/Conversation.txt';
        senderId = senderId.replace(stringToChange, path);
        this.ruta = senderId;

        var content = await this.readMessage(senderId);

        var messageArray = content.split('\n');
        messageArray.forEach(element => {
            console.log(element.content);
            if (element[0]) {
                const messageArrayContent = element.split('###');
                const messageToAdd: message = {
                    content: messageArrayContent[2],
                    date: messageArrayContent[3],
                    sender: messageArrayContent[0],
                    recipient: messageArrayContent[1]
                };
                console.log(messageToAdd);
                this.messages.push(messageToAdd);
            }
        });


        var urlArray = this.ruta_seleccionada.split("/");
        let url = "https://" + urlArray[2] + "/public/dechat2a/" + this.getUserByUrl(this.rdf.session.webId) + "/Conversation.txt";


        console.log("URL: " + url);

        var content = await this.readMessage(url);


        console.log(content);

        var messageArray = content.split('\n');
        messageArray.forEach(element => {
            console.log(element.content);
            if (element[0]) {
                const messageArrayContent = element.split('###');
                const messageToAdd: message = {
                    content: messageArrayContent[2],
                    date: messageArrayContent[3],
                    sender: messageArrayContent[0],
                    recipient: messageArrayContent[1]
                };
                console.log(messageToAdd);
                this.messages.push(messageToAdd);
            }
        });

        this.messages = this.order(this.messages);
    }


    private order(mess: message[]) {
        let ordenado: message[] = [];
        let aux = mess;
        while (mess.length > 0) {
            let idx = this.menor(aux);
            ordenado.push(aux[idx]);
            aux.splice(idx, 1);
        }
        return ordenado;
    }

    private menor(aux: message[]) {
        var idx = 0;
        var minor: message = aux[idx];
        for (let i = 0; i < aux.length; i++) {
            if (aux[i].date < minor.date) {
                idx = i;
                minor = aux[idx];
            }
        }
        return idx;
    }
}

class TXTPrinter {
    public getTXTDataFromMessage(message) {
        return message.sender.webid + "###" +
            message.recipient.webid + "###" +
            message.content + "###" +
            message.date + "\n";
    }
}
