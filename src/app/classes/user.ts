import {Message} from './message';

export class User {
  private _name;
  private _picture;
  private _messages: Message[];

  constructor(name, picture) {
    this._name = name;
    this._picture = picture;
    this.messages = [];
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get picture() {
    return this._picture;
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
