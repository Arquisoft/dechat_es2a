import {FriendList} from '../classes/friend-list';
import {User} from '../classes/user';
import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
//import * as faker from 'faker';
@Injectable()
export class FriendService {

  private _loggedUser: User;
  private _loggedUserObservable: BehaviorSubject<User>;
  private _selectedFriend: User;
  private _friendList: FriendList[];
  private _friendListObservable: BehaviorSubject<FriendList[]>;
  private _selectedFriendObservable: BehaviorSubject<User>;

  constructor() {
    this._friendList = this.getFakeFriendList();
    this._friendListObservable = new BehaviorSubject(this._friendList);
    this._selectedFriend = null;
    this._selectedFriendObservable = new BehaviorSubject(null);
    //this._loggedUser = this.createFakeUser();
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
      new FriendList(new User("patata","xddd"),null)
     // new FriendList(this.createFakeUser(), null),
    //  new FriendList(this.createFakeUser(), null),
    //  new FriendList(this.createFakeUser(), null)
    ];
  }

  private createFakeUser() {
 //   return new User(faker.name.findName(), faker.image.avatar());
  }

  sendMessage(text: string, to: User) {
    to.addMessage(this.loggedUser, text);

    setTimeout(function () {
     // to.addMessage(to, faker.hacker.phrase());
    }, 1500);
  }

  async getName(webId){
    let proxy;
    const { default: data } = require("@solid/query-ldflex")
  }
}
