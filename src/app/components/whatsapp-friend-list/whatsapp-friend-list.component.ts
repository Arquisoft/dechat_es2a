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

  constructor(private _friendService: FriendService,private rdf: RdfService, 
    private route: ActivatedRoute,private auth: AuthService,) {  }

  ngOnInit() {
    this.loadProfile();
  }

  selectFriend(friend: User) {
    this._friendService.selectedFriend = friend;
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
           image = '/assets/images/profile.png';
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



}
