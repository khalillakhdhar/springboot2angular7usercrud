import { Injectable } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


   private UtilisateursUrl = 'http://localhost:8080/api/utilisateur';
  constructor(private http: HttpClient) { }
  getUtilisateurs (): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.UtilisateursUrl).pipe(
      tap(_ => console.log('fetched Utilisateurs')),
      catchError(this.handleError<Utilisateur[]>('getUtilisateurs', []))
    );
  }
  create(utilisateur: Utilisateur): Observable<any> {
    return this.http.post<Utilisateur>('http://localhost:8080/api/utilisateurs', utilisateur, httpOptions).pipe(
      tap((newUtilisateur: Utilisateur) => console.log(`added hero w/ id=${newUtilisateur.id}`)),
      catchError(this.handleError<Utilisateur>('create'))
    );
  }
  delete(utilisateur: Utilisateur | number): Observable<Utilisateur> {
    const id = typeof utilisateur === 'number' ? utilisateur : utilisateur.id;
    const url = `${'http://localhost:8080/api/utilisateurs'}/${id}`;

    return this.http.delete<Utilisateur>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Utilisateur id=${id}`)),
      catchError(this.handleError<Utilisateur>('delete'))
    );
  }
}
