import {FriendList} from '../classes/friend-list';
import {User} from '../classes/user';
import {Message} from '../classes/message';
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
  private fileClient:any;

  constructor(private router: Router,private $rdf: RdfService,private auth: AuthService ) {
    this.fileClient = require('solid-file-client');
    this._friendList = this.getFakeFriendList();
    this._friendListObservable = new BehaviorSubject(null);
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

  setFriendListObservable(){
    this._friendListObservable = new BehaviorSubject(this._friendList);
  }
  get loggedUserObservable(): BehaviorSubject<User> {
    return this._loggedUserObservable;
  }

  setFriendList(value:FriendList[]){
    this._friendList=value;
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
     // new FriendList(this.createFakeUser(), null),
      //new FriendList(this.createFakeUser(), null),
      //new FriendList(this.createFakeUser(), null)
    ];
  }



  private createFakeUser() {
    return new User(faker.name.findName(), faker.image.avatar());
  }
  private createLoggedUser(){
    return new User("", "");
  }

  async sendMessage(text: string, to: User) { 

    to.addMessage(this.loggedUser, text);
     await this.escribir(text,to);
     /*
     setTimeout(function () {
      to.addMessage(to, faker.hacker.phrase());
    }, 1500);
    */
  }


  async escribir(text: string, to: User) {
    let myUser = this.getUserByUrl(this.loggedUser.solidLink);
    let user = this.getUserByUrl(to.solidLink);
    var messageContent = text;
    //(document.getElementById("usermsg") as HTMLInputElement).value = "";
    console.log(messageContent);

    //Sender WebID
    //let senderPerson: User = {webid: this.loggedUser.solidLink};
    let senderPerson: User = this.loggedUser;
    //Receiver WebId
    //let recipientPerson: User = {webid: this.ruta_seleccionada}
    let recipientPerson : User = to;
    let messageToSend: Message = new Message(Date(),text,senderPerson,recipientPerson);
    let stringToChange = '/profile/card#me';
    let path = '/public/dechat2a/' + user + '/Conversation.txt';

    let senderId = this.loggedUser.solidLink;
    senderId = senderId.replace(stringToChange, path);

    let message = await this.readMessage(senderId);

   // this.ruta = senderId;

    //For TXTPrinter
    let messages= [];
    if (message != null) {
        this.updateTTL(senderId, message + "\n" + new TXTPrinter().getTXTDataFromMessage(messageToSend));
        if (messages.indexOf(message) !== -1) {
            messages.push(message);
            console.log("MESSAGES: " + messages);
        }
    } else {
        this.updateTTL(senderId, new TXTPrinter().getTXTDataFromMessage(messageToSend));
    }

    //(<HTMLInputElement>document.getElementById('usermsg')).value = '';
     this.actualizar(to.solidLink,this.loggedUser.solidLink);
    
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

private getUserByUrl(ruta: string): string {
  let sinhttp;
  sinhttp = ruta.replace('https://', '');
  const user = sinhttp.split('.')[0];
  return user;
}

private async readMessage(url) {
 // this.ruta = url;
  var message = await this.searchMessage(url)
  return message;
}

private async searchMessage(url) {
  console.log("URL: " + url);
  return await this.fileClient.readFile(url).then(body => {
      console.log(`File	content is : ${body}.`);
      return body;
  }, err => console.log(err));


}
async actualizar(user,senderId) {
 // console.log("Inicio Actualizar");
  let messages = [] as Message[];
  let userFormatted = this.getUserByUrl(user);
  let stringToChange = '/profile/card#me';
  let path = '/public/dechat2a/' + userFormatted + '/Conversation.txt';
  let senderIdFormated = senderId.replace(stringToChange, path);

  var content = await this.readMessage(senderIdFormated);
  //OBTENGO MENSAGES DEL AMIGO
  var messageArray = content.split('\n');
  messageArray.forEach(element => {
      //console.log(element);
      if (element[0]) {
          const messageArrayContent = element.split('###');
          const messageToAdd: Message = new Message( messageArrayContent[3], messageArrayContent[2],this._selectedFriend,this.loggedUser)
        // console.log(messageToAdd);
          messages.push(messageToAdd);
      }
  });


  var urlArray = user.split("/");
  let url = "https://" + urlArray[2] + "/public/dechat2a/" + this.getUserByUrl(senderId) + "/Conversation.txt";


 // console.log("URL: " + url);

  var content = await this.readMessage(url);


  //console.log(content);

    //OBTENGO MENSAGES MIOS
  var messageArray = content.split('\n');
  messageArray.forEach(element => {
     // console.log(element.content);
      if (element[0]) {
          const messageArrayContent = element.split('###');
          const messageToAdd:Message = new Message( messageArrayContent[3], messageArrayContent[2],messageArrayContent[0]
            ,messageArrayContent[1])
         // console.log(messageToAdd);
          messages.push(messageToAdd);
      }
  });
  messages = this.order(messages);
  if (this.selectedFriend.messages.length==0){
    for(let x of messages){
      this.selectedFriend.addMessageFull(this.selectedFriend,x)
  }
 } else if(this.selectedFriend.messages.length!=messages.length) {
    for(let i=this.selectedFriend.messages.length;i<messages.length;i++){
      this.selectedFriend.messages.push(messages[i]);
    }
}
}


async getUserMessages(user,senderId){
  let messages : Message[];
  let userFormatted = this.getUserByUrl(user);
  let stringToChange = '/profile/card#me';
  let path = '/public/dechat2a/' + userFormatted + '/Conversation.txt';
  let senderIdFormated = senderId.replace(stringToChange, path);

  var content = await this.readMessage(senderIdFormated);
  var messageArray = content.split('\n');
  

  messageArray.forEach(element => {
      console.log(element.content);
      if (element[0]) {
          const messageArrayContent = element.split('###');
          const messageToAdd: Message = new Message( messageArrayContent[3], messageArrayContent[2],this.loggedUser,this._selectedFriend)
        // console.log(messageToAdd);
          messages.push(messageToAdd);
      }
  });

  messages = this.order(messages);
  return messages;
} 

private order(mess: Message[]) {
  /*
  let ordenado: Message[] = [];
  let aux = mess;
  while (mess.length > 0) {
      let idx = this.menor(aux);
      ordenado.push(aux[idx]);
      aux.splice(idx, 1);
  }
  return ordenado;
  */
 mess.sort(function(a,b){
  var dateA = new Date(a.time);
  var dateB = new Date(b.time);
  return dateA.getTime() - dateB.getTime();
 })
 return mess;
}

private menor(aux: Message[]) {
  var idx = 0;
  var minor: Message = aux[idx];
  for (let i = 0; i < aux.length; i++) {
      if (aux[i].time < minor.time) {
          idx = i;
          minor = aux[idx];
      }
  }
  return idx;
}
}

class TXTPrinter {
  public getTXTDataFromMessage(message: Message) {
      return message.sender.solidLink + "###" +
          message.receiver.solidLink + "###" +
          message.text + "###" +
          message.time + "\n";
  }
}
