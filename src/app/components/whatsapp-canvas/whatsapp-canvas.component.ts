import {Component, OnInit} from '@angular/core';
import {User} from '../../classes/user';
import {FriendService} from '../../services/friend.service';
import { ActivatedRoute } from '@angular/router';
import { RdfService } from '../../services/rdf.service';
import { AuthService } from '../../services/solid.auth.service';
import { SolidProfile } from '../../models/solid-profile.model';
import { FriendList } from 'src/app/classes/friend-list';
declare let $rdf: any;
@Component({
  selector: 'app-whatsapp-canvas',
  templateUrl: './whatsapp-canvas.component.html',
  styleUrls: ['./whatsapp-canvas.component.scss']
})
export class WhatsappCanvasComponent implements OnInit {
  profile: SolidProfile;
  profileImage: string;
  public loggedUser: User;
  public selectedFriend: User;
  loadingProfile: Boolean;

  constructor(private _friendService: FriendService,private rdf: RdfService,
    private route: ActivatedRoute, private auth: AuthService) {
  }

  ngOnInit() {
    this.loadingProfile=true;
    this.loadProfile();
    this._friendService.getSelectedFriendObservable().subscribe(friend => this.selectedFriend = friend);

  }

  async loadProfile() {
    try {
      this.loadingProfile = true;
      const profile = await this.rdf.getProfile();
      if (profile) {
        this.profile = profile;
        this.auth.saveOldUserData(profile);
      }
      this.loadingProfile = false;
      this.loadUserData();
     
    } catch (error) {
      console.log(`Error: ${error}`);
    }

  }

  private async loadUserData() {
    if (this.profile) {
      this.profileImage = this.profile.image ? this.profile.image : '/assets/images/profile.png';
      this._friendService.loggedUser.name=this.profile.name;
      this._friendService.loggedUser.picture=this.profileImage;
      this.loggedUser=this._friendService.loggedUser;
      let lista =await this.getSolidFriends();
      this._friendService.setFriendList(lista);
      this._friendService.setFriendListObservable();
    } else {
      this.profileImage = '/assets/images/profile.png';
    }
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
      let name = store.any(me, VCARD('fn'));
      let picture = store.any(me, VCARD('hasPhoto'));
      let amigoAñadir=new User(name,picture);
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
    console.log(listaAmigosComponente)
      return listaAmigosComponente;
  }
  
    
}
