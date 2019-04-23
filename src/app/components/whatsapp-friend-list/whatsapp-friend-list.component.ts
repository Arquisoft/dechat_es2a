import {Component, OnInit, SimpleChanges,OnChanges} from '@angular/core';
import {FriendList} from '../../classes/friend-list';
import {User} from '../../classes/user';
import { ActivatedRoute } from '@angular/router';
import {FriendService} from '../../services/friend.service';
import { RdfService } from '../../services/rdf.service';
import { AuthService } from '../../services/solid.auth.service';
import { SolidProfile } from '../../models/solid-profile.model';
declare let $rdf:any;


@Component({
  selector: 'app-whatsapp-friend-list',
  templateUrl: './whatsapp-friend-list.component.html',
  styleUrls: ['./whatsapp-friend-list.component.scss'],
})
export class WhatsappFriendListComponent implements OnInit ,OnChanges{
  public friends: FriendList[];
  profile: SolidProfile;
  loadingProfile: Boolean;
  fileClient: any;

  constructor(private _friendService: FriendService,private rdf: RdfService, 
    private route: ActivatedRoute,private auth: AuthService,) {  
      this.fileClient = require('solid-file-client');
    }

  ngOnInit() {
    this.loadProfile();
  }

  selectFriend(friend: User) {
    const name = this.getUserByUrl(friend.solidLink);
     this.createNewFolder('dechat2a', '/public/');
     this.createNewFolder(name, '/public/dechat2a/');
      this._friendService.selectedFriend = friend;
      this._friendService.actualizar(this._friendService.loggedUser.solidLink,friend.solidLink);
  }

  trackByUsers(index: number, friendList: FriendList): number { return friendList.friend.id; }

  ngOnChanges(changes: SimpleChanges): void {
    
    
  }

  async loadProfile() {
    try {
      this.loadingProfile = true;
      const profile = await this.rdf.getProfile();
      if (profile) {
        this.profile = profile;
      }
      this.loadingProfile = false;
      this.loadUserData();
     
    } catch (error) {
      console.log(`Error: ${error}`);
    }

  }

  private async loadUserData() {
      let lista =await this.getSolidFriends();
      this._friendService.setFriendList(lista);
      this._friendService.setFriendListObservable();
      this._friendService.getFriendListObservable().subscribe(friends => {
        this.friends = friends;
      });
    }


  private async getSolidFriends(){
   let listaAmigosRDF= this.rdf.getFriends();
   let listaAmigosComponente =[];
   try{
    for (var amigo of listaAmigosRDF){
      let contador =0;
      await this.rdf.fetcher.load(amigo);
    const store  = $rdf.graph();
    let fetcher = $rdf.Fetcher;
    fetcher=new $rdf.Fetcher(store);
    const me = store.sym(amigo);
    const profile = me.doc();       //i.e. store.sym(''https://example.com/alice/card#me')
    const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    await fetcher.load(amigo).then(response => {
      let nameStore = store.any(me, VCARD('fn'));
      let pictureStore = store.any(me, VCARD('hasPhoto'));
      let name ;
       let image;

      if (nameStore ==null){
         name = amigo;
      }
      else {
        name = nameStore.value
      }
      if (pictureStore == null){
           image = 'assets/images/profile.png';
      }
      else{
        image =pictureStore.value
      }
      let amigoAñadir=new User(name,image);
      amigoAñadir.solidLink=amigo;
      amigoAñadir.id=contador;
      listaAmigosComponente.push(new FriendList(amigoAñadir, null))
      contador ++
   }, err => {
      console.log("Load failed " +  err);
   });

    }
  }
    catch (error) {
      console.log(`Error: ${error}`);
    }
    console.log("Log desde Friend list" + listaAmigosComponente)
      return listaAmigosComponente;
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



}
