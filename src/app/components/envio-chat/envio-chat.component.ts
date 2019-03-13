import { Component, OnInit, ViewChild } from '@angular/core';
import { RdfService } from '../../services/rdf.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-envio-chat',
  templateUrl: './envio-chat.component.html',
  styleUrls: ['./envio-chat.component.css']
})
export class EnvioChatComponent implements OnInit {

    fileClient: any;
    ruta_seleccionada: string;
    contenido: any;

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
        const name = this.getUserByUrl(this.ruta_seleccionada);
        this.createNewFolder('dechat', '/public/');
        this.createNewFolder(name, '/public/dechat/');
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

        console.log("SOLID ID: " + solidId);
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

    private async readMessage(url) {
        var message = await this.searchMessage(url);
        console.log(message);
        return message;
    }

    //method that search for a message in a pod
    private searchMessage(url) {
        console.log("MENSAJE PARA BUSCAR: " + url);
        return this.fileClient.readFile(url).then(body => {
            console.log(`File	content is : ${body}.`);
            document.write(body);
            return body;
        }, err => console.log(err));

    }

    private ver_mensajes() {
        let url = 'https://adanvetusta.solid.community/public/dechat/adanfernandezsanchez/Conversation2.txt';
        let messageContent = this.searchMessage(url);
    }
}
