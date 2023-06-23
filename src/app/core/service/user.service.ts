import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = environment.url

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }
  getUserId(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`)
  }
}
