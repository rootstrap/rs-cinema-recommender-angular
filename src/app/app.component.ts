import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';

declare var window: any;
declare var require: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  pageTitle: string  = 'RS Cinema Recommender';
  showModal: boolean = false
  formModal: any;
  username: string = '';
  modalTitle: string = 'Please enter your name'

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
    this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'),{
      backdrop  : 'static',
      keyboard  : false
   });

    const currentUser = this.usersService.getCurrentUser();
    if (!currentUser) {
      this.openModal();
    } else {
      this.username = currentUser.username
    }
  }

  saveUser() {
    if (this.username) {
      this.usersService.setCurrentUser(this.username);
      this.closeModal();
    } else {
      alert('Please set a name!')
    }
  }

  openModal() {
    this.formModal.show()
  }

  closeModal() {
    this.formModal.hide()
  }
}
