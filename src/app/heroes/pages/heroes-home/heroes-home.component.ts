import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HeroesHomeComponent implements OnInit {
  constructor(
    private activatedRouted: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(({ id }) => {
      this.heroesService.getHeroesId(id).subscribe((pais) => {
        console.log(pais);
      });
    });
  }
}
