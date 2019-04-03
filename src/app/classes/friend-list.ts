import {Message} from './message';
import {User} from './user';

export class FriendList {
  private _friend: User;
  private _lastMessage: Message;

  constructor(friend: User, lastMessage: Message) {
    this._friend = friend;
    this._lastMessage = lastMessage;
  }

  get friend(): User {
    return this._friend;
  }

  set friend(value: User) {
    this._friend = value;
  }

  get lastMessage(): Message {
    return this._lastMessage;
  }

  set lastMessage(value: Message) {
    this._lastMessage = value;
  }
}
