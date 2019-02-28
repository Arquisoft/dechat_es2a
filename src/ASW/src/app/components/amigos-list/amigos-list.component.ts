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


      console.log(list_friends);
      if (list_friends) {

        document.write("<h1> LISTA DE COLEGUIS PARA CHATEAR: </h1>")
        let i = 0;
        console.log(list_friends.keys());
        for (i = 0; i < list_friends.length; i++) {
        }




      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }





  async llamada()
  {
    document.write("<h1> LISTA DE COLEGUIS PARA CHATEAR: </h1>")

    let i = 0;
      for (i = 0; i < this.tamano; i++) {
        console.log(this.amigos[i]);
    }


    this.amigos.forEach(function(entry) {
      document.write("<h2>");
      document.write(entry);
      document.write("</h2>");
    });
  }
}
