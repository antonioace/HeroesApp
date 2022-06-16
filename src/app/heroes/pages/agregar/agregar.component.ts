import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC COMICS',
      desc: 'DC-Comics',
    },
    {
      id: 'MARVEL COMICS',
      desc: 'Marvel-Comics',
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
  constructor(
    private heroesService: HeroesService,
    private activatedRouted: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  guardar() {
    if (this.heroe.superhero.trim().length == 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.editarHeroe(this.heroe).subscribe((resp) => {
        this.mostrarSnackBar('Registro actualizado');
      });
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.mostrarSnackBar('Registro creado');

        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }

  eliminar() {
    const dialog = this.matDialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.eliminarHeroe(this.heroe).subscribe((resp) => {
          this.router.navigate(['/heroes/listado']);
        });
      }
    });
    /*   this.heroesService.eliminarHeroe(this.heroe).subscribe((resp) => {
      this.router.navigate(['/heroes/listado']);
    }); */
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok !', {
      duration: 2500,
    });
  }
  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRouted.params
      .pipe(
        switchMap(({ id }) => {
          return this.heroesService.getHeroesId(id);
        })
      )
      .subscribe((heroe) => {
        this.heroe = heroe;
      });
  }
}
