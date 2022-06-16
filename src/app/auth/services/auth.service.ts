import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from 'src/app/heroes/interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  private _auth: Auth | undefined;
  constructor(private http: HttpClient) {}

  login() {
    return this.http
      .get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(tap((auth) => (this._auth = auth)));
  }

  get auth(): Auth {
    return { ...this._auth! };
  }
}