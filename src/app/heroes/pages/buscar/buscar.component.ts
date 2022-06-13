import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent {
  termino: string = '';

  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  heroesNoEncontrado: boolean = false;

  constructor(
    private activatedRouted: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  buscando() {
    this.heroesService.getSugerencias(this.termino).subscribe((heroes) => {
      this.heroes = heroes;
    });
  } //

  opcionSeleccionada(evento: MatAutocompleteSelectedEvent) {
    if (!evento.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = evento.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroesId(heroe.id).subscribe((heroe) => {
      this.heroeSeleccionado = heroe;
    });
  }
}
