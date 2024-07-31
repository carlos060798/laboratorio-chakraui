import { Routes } from '@angular/router';
import { PersonasComponent } from './personas/pages/personas/personas.component';
import { PersonaByIdComponent } from './personas/pages/persona-by-id/persona-by-id.component';

export const routes: Routes = [
  { path: '', component: PersonasComponent },
  { path: 'persona/:term', component: PersonaByIdComponent },
  { path: '**', redirectTo: '' }
];
