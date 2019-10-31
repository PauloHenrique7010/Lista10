import { Component, OnInit } from "@angular/core";
import { MatriculaService } from "../service/matricula.service";
import { AlunoService } from "../service/aluno.service";
import { DisciplinaService } from "../service/disciplina.service";
import { Matricula } from "../model/matricula";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-form-matricula",
  templateUrl: "./form-matricula.component.html",
  styleUrls: ["./form-matricula.component.css"]
})
export class FormMatriculaComponent implements OnInit {
  public matricula: Matricula;
  public key: string = "";
  public matriculas: Observable<any>;
  public alunos: Observable<any>;
  public disciplinas: Observable<any>;
  constructor(
    private servico: MatriculaService,
    private alunoService: AlunoService,
    private disciplinaService: DisciplinaService
  ) {}

  ngOnInit() {
    this.matricula = new Matricula();
    this.matriculas = this.servico.selectMatricula();
    this.alunos = this.alunoService.selectAluno();
    this.disciplinas = this.disciplinaService.selectDisciplina();
    this.servico.currentMatricula.subscribe(data => {
      if (data.matricula && data.key) {
        this.matricula = new Matricula();
        this.matricula.aluno = data.matricula.aluno;
        this.matricula.disciplina = data.matricula.disciplina;
        this.matricula.nota = data.matricula.nota;
        this.key = data.key;
      }
    });
  }
  salvar(): void {
    this.servico.insertMatricula(this.matricula);
    this.reset();
  }
  reset(): void {
    this.matricula = new Matricula();
    this.key = "";
  }
  delete(key: string) {
    this.servico.deleteMatricula(key);
    return false; /* para evitar que o menu popup seja exibido */
  }
}
