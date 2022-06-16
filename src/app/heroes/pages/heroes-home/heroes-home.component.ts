import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from '../../interfaces/auth.interface';
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
  get auth() {
    return this.authService.auth;
  }
  constructor(
    private authService: AuthService,
    private activatedRouted: ActivatedRoute,
    private heroesService: HeroesService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(({ id }) => {
      this.heroesService.getHeroesId(id).subscribe((pais) => {
        console.log(pais);
      });
    });
  }

  logout() {
    this.router.navigate(['./auth']);
  }
}
