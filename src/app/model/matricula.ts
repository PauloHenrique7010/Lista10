import { Aluno } from '../model/aluno';
import { Disciplina } from '../model/disciplina';

export class Matricula {
  aluno: Aluno;
  disciplina: Disciplina;
  nota: number;
}