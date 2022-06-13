import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private activatedRouted: ActivatedRoute,
    private heroesService: HeroesService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouted.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroesId(id)),
        tap(console.log)
      )
      .subscribe((resp) => {
        this.heroe = resp;
      });
  }

  regresar() {
    this.route.navigate(['/heroes/listado']);
  }
}
