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
      this._friendService.loggedUser.solidLink=this.rdf.session.webId;
      this._friendService.loggedUser.name=this.profile.name;
      this.loggedUser=this._friendService.loggedUser;
    } else {
      this.profileImage = '/assets/images/profile.png';
    }
  }



    
}
