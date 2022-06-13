import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC COMICS',
      desc: 'DC-Comics',
    },
    {
      id: 'MARVEL COMICS',
      desc: 'Marvel - Comics',
    },
  ];
  heroe: Heroe = {
    id: '',
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}
}
