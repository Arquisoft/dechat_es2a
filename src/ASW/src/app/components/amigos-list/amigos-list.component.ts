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
  tamano = 0;

  constructor(private router: Router, private rdf: RdfService) {
  }

  ngOnInit() {

    this.loadFriends();

  }

  async loadFriends() {
    try {

      const list_friends = await this.rdf.getFriends();

      if (list_friends) {
        document.write("<h1> LISTA DE COLEGUIS PARA CHATEAR: </h1>");
        this.amigos = list_friends;
        console.log(list_friends);

        let i=0;
        for (i=0; i<list_friends.length; i++)
        {
          document.write("<h2> " + list_friends[i] + "</h2>");
        }





        //var data = list_friends.map(t=>t.value);
        //console.log(data);

        //let i = 0;


        //console.log(list_friends.);
        //for (i = 0; i < list_friends.length; i++) {
        //}




      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

}
