import {FriendList} from '../classes/friend-list';
import {User} from '../classes/user';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import { RdfService } from './rdf.service';
import { SolidSession } from '../models/solid-session.model';
import { AuthService } from './solid.auth.service';
import * as faker from 'faker';
declare let $rdf: any;
@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private _loggedUser: User;
  private _loggedUserObservable: BehaviorSubject<User>;
  private _selectedFriend: User;
  private _friendList: FriendList[];
  private _friendListObservable: BehaviorSubject<FriendList[]>;
  private _selectedFriendObservable: BehaviorSubject<User>;

  constructor(private router: Router,private $rdf: RdfService,private auth: AuthService ) {
    this._friendList = this.getFakeFriendList();
    this._friendListObservable = new BehaviorSubject(this._friendList);
    this._selectedFriend = null;
    this._selectedFriendObservable = new BehaviorSubject(null);
    this._loggedUser = this.createLoggedUser();
    this._loggedUserObservable = new BehaviorSubject(this._loggedUser);
  }

  getSelectedFriendObservable(): BehaviorSubject<User> {
    return this._selectedFriendObservable;
  }

  get loggedUser(): User {
    return this._loggedUser;
  }

  set loggedUser(value: User) {
    this._loggedUser = value;
  }

  get loggedUserObservable(): BehaviorSubject<User> {
    return this._loggedUserObservable;
  }

  set loggedUserObservable(value: BehaviorSubject<User>) {
    this._loggedUserObservable = value;
  }

  get selectedFriend(): User {
    return this._selectedFriend;
  }

  set selectedFriend(value: User) {
    this._selectedFriend = value;
    this._selectedFriendObservable.next(value);
  }

  get friendList(): FriendList[] {
    return this._friendList;
  }

  filterFriends(name: string) {
    const filteredFriends = [];
    this.friendList.forEach(friendList => {
      if (friendList.friend.name.toUpperCase().indexOf(name.toUpperCase()) !== -1) {
        filteredFriends.push(friendList);
      }
    });

    this._friendListObservable.next(filteredFriends);
  }

  getFriendListObservable(): BehaviorSubject<FriendList[]> {
    return this._friendListObservable;
  }

  private getFakeFriendList() {
    return [
      //new FriendList(this.createFakeUser(), null),
     // new FriendList(this.createFakeUser(), null),
     // new FriendList(this.createFakeUser(), null)
    ];
  }



  private createFakeUser() {
    return new User(faker.name.findName(), faker.image.avatar());
  }
  private createLoggedUser(){
    return new User("", "");
  }

  sendMessage(text: string, to: User) {
    to.addMessage(this.loggedUser, text);

    setTimeout(function () {
      to.addMessage(to, faker.hacker.phrase());
    }, 1500);
  }
}
