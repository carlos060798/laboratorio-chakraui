import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interface/Persona.interface';


/**
 * Service for interacting with the API to perform CRUD operations on personas.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api/personas'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseUrl}`);
  }

  getPersona(term: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/${term}`);
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.baseUrl}`, persona);
  }

  updatePersona(id: string, persona: Partial<Persona>): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}`, persona);
  }

  deletePersona(id: string): Observable<Persona> {
    return this.http.delete<Persona>(`${this.baseUrl}/${id}`);
  }
}
