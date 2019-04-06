import {Message} from './message';

export class User {
  private _name;
  private _picture;
  private _solidLink;
  private _id;
  private _messages: Message[];

  constructor(name, picture) {
    this._name = name;
    this._picture = picture;
    this._solidLink="";
    this.messages = [];
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  
  get id() {
    return this.id;
  }

  set id(value) {
    this._id = value;
  }

  get picture() {
    return this._picture;
  }
  get solidLink(){
    return this._solidLink;
  }
  set solidLink(value){
    this._solidLink=value;
  }

  set picture(value) {
    this._picture = value;
  }

  addMessage(sender: User, text: string) {
    const message = new Message(Date(), text, sender, this);
    this._messages.push(message);
  }

  get messages(): Message[] {
    return this._messages;
  }

  set messages(value: Message[]) {
    this._messages = value;
  }
}
