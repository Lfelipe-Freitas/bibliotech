export class Livros {
  public titulo: string
  public autor: string
  public genero: string
  public capa: string

  constructor(titulo: string, autor: string, genero: string, capa: string) {
    this.titulo = titulo
    this.autor = autor
    this.genero = genero
    this.capa = capa
  }
}
