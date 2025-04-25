export class Cita {
  id: number;
  frase: string;
  autor: string;

  constructor(id: number, frase: string, autor: string) {
    this.id = id;
    this.frase = frase;
    this.autor = autor;
  }
}
