import { Bibliotec } from 'src/app/models/bibliotec';
export interface BibliotecLivro {
  id?: string
  livro: Bibliotec
  nomeLeitor: string
  dataAluguel: Date
  status: string
  switcher: boolean
}
