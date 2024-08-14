import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/persona.service';
import { Persona } from '../../interface/Persona.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * Component representing a persona by its ID.
 */
@Component({
  selector: 'app-persona-by-id',
  standalone: true,
  templateUrl: './persona-by-id.component.html',
  imports: [FormsModule, CommonModule]
})
export class PersonaByIdComponent implements OnInit {
  public persona: Persona = {
    title: '',
    description: '',
    image: '',
    categoria: []
  };
  public isEditing: boolean = false;
  public editPersona: Partial<Persona> = { ...this.persona };
  public categoriaString: string = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['term'];
      this.apiService.getPersona(id).subscribe((data: Persona) => {
        this.persona = data;
        this.editPersona = { ...data };
        this.categoriaString = this.persona.categoria.join(',');
      });
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.categoriaString = this.persona.categoria.join(',');
    }
  }

  saveChanges(): void {
    if (this.persona.id) {
      // Convertir el string de categorías a un array
      this.editPersona.categoria = this.categoriaString.split(',').map(cat => cat.trim()).filter(cat => cat !== '');

      // Crear un nuevo objeto sin el id para enviar al servidor
      const personaToUpdate = {
        title: this.editPersona.title,
        description: this.editPersona.description,
        image: this.editPersona.image,
        categoria: this.editPersona.categoria
      };

      this.apiService.updatePersona(this.persona.id, personaToUpdate).subscribe(() => {
        this.isEditing = false;
        this.persona = { ...this.editPersona as Persona };
      });
    }
  }

  deletePersona(): void {
    if (this.persona.id) {
      this.apiService.deletePersona(this.persona.id).subscribe(() => {
        this.router.navigate(['/persona']);
      });
    }
  }
}
