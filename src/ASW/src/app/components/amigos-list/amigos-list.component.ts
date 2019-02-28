import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { RdfService } from '../../services/rdf.service';


@Component({
  selector: 'app-amigos-list',
  templateUrl: './amigos-list.component.html',
  styleUrls: ['./amigos-list.component.css']
})
export class AmigosListComponent implements OnInit {

  constructor(private router: Router, private rdf: RdfService) {
  }

  ngOnInit() {
  }


}
