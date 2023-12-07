import { Component, OnInit } from '@angular/core';
import { LocalService } from './services/local.service';

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

  constructor(private localService: LocalService) { }

  ngOnInit(): void {
    window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
    this.formModal = new window.bootstrap.Modal(document.getElementById('myModal'),{
      backdrop  : 'static',
      keyboard  : false
   });

    const currentUser = this.localService.getData('user');
    if (!currentUser) {
      this.openModal();
    } else {
      this.username = JSON.parse(currentUser).username
    }
  }

  saveUser() {
    if (this.username) {
      const newId = 'id' + (new Date()).getTime();
      const myUserData = {
        id: newId,
        username: this.username
      };
      this.localService.saveData('user', JSON.stringify(myUserData));
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
