import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser?: User;
  guestUser: User = {
    id: 'id' + (new Date()).getTime(),
    username: 'Guest'
  }

  constructor(private localService: LocalService) { 
    const user = this.localService.getData('user');
    if (user) {
      this.currentUser = JSON.parse(user) ;
    }
  }

  getCurrentUser () {
    return this.currentUser;
  }

  getCurrentUserOrGuest (): User {
    return this.currentUser ?? this.guestUser;
  }

  setCurrentUser(username: string) {
    const newId = 'id' + (new Date()).getTime();
    const myUserData: User = {
      id: newId,
      username,
    };
    this.localService.saveData('user', JSON.stringify(myUserData));
  }
}
