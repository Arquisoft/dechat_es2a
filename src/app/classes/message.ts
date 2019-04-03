import {User} from './user';

export class Message {
  private _time;
  private _text;
  private _sender: User;
  private _receiver: User;

  constructor(time, text, sender: User, receiver: User) {
    this._time = time;
    this._text = text;
    this._sender = sender;
    this._receiver = receiver;
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get sender(): User {
    return this._sender;
  }

  set sender(value: User) {
    this._sender = value;
  }

  get receiver(): User {
    return this._receiver;
  }

  set receiver(value: User) {
    this._receiver = value;
  }
}
