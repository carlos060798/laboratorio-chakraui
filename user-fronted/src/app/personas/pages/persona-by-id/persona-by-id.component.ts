import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/persona.service';
import { Persona } from '../../interface/Persona.interface';

@Component({
  selector: 'app-persona-by-id',
  standalone: true,
  templateUrl: './persona-by-id.component.html',
})
export class PersonaByIdComponent implements OnInit {
  public persona: Persona = { title: '', description: '', image: '', categoria: [] };

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['term'];
      this.apiService.getPersona(id).subscribe((data: Persona) => {
        this.persona = data;
      });
    });
  }
}

