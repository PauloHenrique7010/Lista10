import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { DisciplinaService } from '../service/disciplina.service';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-form-disciplina',
  templateUrl: './form-disciplina.component.html',
  styleUrls: ['./form-disciplina.component.css']
})
export class FormDisciplinaComponent implements OnInit {
  public disciplina: Disciplina;
  public key: string = "";
  public disciplinas: Observable<any>;
  constructor(private servico: DisciplinaService) {}
  ngOnInit() {
    this.disciplina = new Disciplina();
    this.disciplinas = this.servico.selectDisciplina();
    this.servico.currentDisciplina.subscribe(data => {
      if (data.disciplina && data.key) {
        this.disciplina = new Disciplina();
        this.disciplina.nome = data.disciplina.nome;
        this.disciplina.carga = data.disciplina.carga;
        this.key = data.key;
      }
    });
  }


  salvar(): void {
    if (this.key) {
      this.disciplina.nome = this.disciplina.nome.trim();
      this.servico.updateDisciplina(this.disciplina, this.key);
    } else {
      this.disciplina.nome = this.disciplina.nome.trim();
      this.servico.insertDisciplina(this.disciplina);
    }
    this.reset();
  }
  reset(): void {
    this.disciplina = new Disciplina();
    this.key = "";
  }
  delete(key: string) {
    this.servico.deleteDisciplina(key);
    return false; /* para evitar que o menu popup seja exibido */
  }
  edit(aluno: Disciplina, key: string) {
    this.servico.changeDisciplina(aluno, key);
  }

}
