import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit  {

  profile: SolidProfile;
  profileImage: string;
  loadingProfile: Boolean;
  amigos: Array<any>;
  fileClient: any;

  @ViewChild('f') cardForm: NgForm;

  constructor(private rdf: RdfService,
    private route: ActivatedRoute, private auth: AuthService) {}

  ngOnInit() {
    this.loadingProfile = true;
    this.loadProfile();
    this.fileClient= require('solid-file-client')

  }

  // Loads the profile from the rdf service and handles the response
  async loadProfile() {
    try {
      this.loadingProfile = true;
      const profile = await this.rdf.getProfile();
      if (profile) {
        this.profile = profile;
        this.auth.saveOldUserData(profile);
      }

      this.loadingProfile = false;
      this.setupProfileData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async loadFriends() {
    try {
      const list_friends = await this.rdf.getFriends();
      if (list_friends) {
        this.amigos = list_friends;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  // Submits the form, and saves the profile data using the auth/rdf service
  async onSubmit () {
    if (!this.cardForm.invalid) {
      try {
        await this.rdf.updateProfile(this.cardForm);
        localStorage.setItem('oldProfileData', JSON.stringify(this.profile));
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
  }

  // Format data coming back from server. Intended purpose is to replace profile image with default if it's missing
  // and potentially format the address if we need to reformat it for this UI
  private setupProfileData() {
    if (this.profile) {
      this.profileImage = this.profile.image ? this.profile.image : '/assets/images/profile.png';
    } else {
      this.profileImage = '/assets/images/profile.png';
    }
  }

  // Example of logout functionality. Normally wouldn't be triggered by clicking the profile picture.
  logout() {
    this.auth.solidSignOut();
  }

  //Usando la libreria de https://github.com/jeff-zucker/solid-file-client puedo crear y eliminar archivos, ficheros, etc. Es recomendable leer su README
  private createNewFolder(){

    //Para crear la carpeta necesito una ruta que incluya el nombre de la misma. 
    //Obtengo el ID del usuario y sustituyo  lo irrelevante por la ruta de public/NombreCarpeta
    let solidId = this.rdf.session.webId;
    let stringToChange = "/profile/card#me";
    solidId = solidId.replace(stringToChange,"/public/pruebaASW")

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

  }



}
