import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ApiService } from '../../services/persona.service';
import { Persona } from '../../interface/Persona.interface';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule,FormsModule], // Añade FormsModule al array de imports
  templateUrl: './personas.component.html',
})
export class PersonasComponent implements OnInit {
  public personas: Persona[] = [];
  public persona: Persona = { title: '', description: '', image: '', categoria: [] };


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPersonas().subscribe((data: Persona[]) => {
      this.personas = data;
    });
  }


  onSubmit(): void {
    // Crear un nuevo objeto persona con el formato correcto
    const newPersona: Persona = {
      title: this.persona.title,
      description: this.persona.description,
      image: this.persona.image,
      categoria: Array.isArray(this.persona.categoria) ? this.persona.categoria : [this.persona.categoria]
    };

    // Llamar al servicio para crear la persona
    this.apiService.createPersona(newPersona).subscribe(response => {
      // Verificar que la respuesta tenga el formato esperado antes de agregarla a la lista
      if (response && response.id && response.title && response.description && response.image && Array.isArray(response.categoria)) {
        this.personas.push(response);
      }
      // Reiniciar el formulario
      this.persona = { id: '', title: '', description: '', image: '', categoria: [] };
    });
  }


  }

