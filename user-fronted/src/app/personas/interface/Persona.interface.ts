export interface Persona {
  id?: string;
  title: string;
  description: string;
  image: string;
  categoria: string[]; // Aquí se define categoria como un arreglo de strings
}
