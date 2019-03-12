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


        await this.fileClient.updateFile(solidId, "mensaje.txt").then(success => {
            200
        }, err => this.fileClient.createFile(solidId, "mensaje.txt").then(200));

        await this.crearPermisos(solidId, user);

    }


    /**
     * Grant the necessary permissions to read a file
     * @param {String} route of the file
     * @param {String} webID of the partner
     */
    async crearPermisos(fileRoute, partnerID) {
        var aclRoute = fileRoute + '.acl';
        var aclContents = this.generarPermisos(partnerID, "mensaje.txt");

        await this.fileClient.updateFile(aclRoute, aclContents).then(success => {
            200
        }, err => this.fileClient.createFile(aclRoute, aclContents).then(200));
    }

    /**
     *Generate an ACL text string that grants owner all permissions and Read only to partnerID
     *@param {String} partnerID
     *@param {String} filename
     *@return {String} ACL string content
     */
    generarPermisos(partnerID, filename) {
        partnerID = partnerID.replace("#me", "#");
        var ACL = "@prefix : <#>. \n"
            +"@prefix n0: <http://www.w3.org/ns/auth/acl#>. \n"
            +"@prefix c: </profile/card#>. \n"
            +"@prefix c0: <"+ partnerID + ">. \n\n"

            +":ControlReadWrite \n"
            +"\ta n0:Authorization; \n"
            +"\tn0:accessTo <"+ filename +">; \n"
            +"\tn0:agent c:me; \n"
            +"\tn0:mode n0:Control, n0:Read, n0:Write. \n"
            +":Read \n"
            +"\ta n0:Authorization; \n"
            +"\tn0:accessTo <"+ filename +">; \n"
            +"\tn0:agent c0:me; \n"
            +"\tn0:mode n0:Read.";
        return ACL;
    }
}
