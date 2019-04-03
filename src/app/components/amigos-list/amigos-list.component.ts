import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RdfService } from '../../services/rdf.service';

import {of} from 'rxjs';
import {variable} from '../../../assets/types/rdflib';


@Component({
  selector: 'app-amigos-list',
  templateUrl: './amigos-list.component.html',
  styleUrls: ['./amigos-list.component.css']
})
export class AmigosListComponent implements OnInit {

  amigos = [];

  constructor(private router: Router, private rdf: RdfService) {
  }

  ngOnInit() {

    this.loadFriends();

  }

  loadFriends() {
    const list_friends = this.rdf.getFriends();

    if (list_friends) {
      console.log(list_friends);
      let i = 0;
      this.amigos = list_friends;
    }
  }

}
