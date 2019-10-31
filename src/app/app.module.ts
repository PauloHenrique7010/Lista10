import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormAlunoComponent } from './form-aluno/form-aluno.component';
import { FormDisciplinaComponent } from './form-disciplina/form-disciplina.component';
import { FormMatriculaComponent } from './form-matricula/form-matricula.component';
import { AlunoService } from './service/aluno.service';
import { DisciplinaService } from './service/disciplina.service';
import { MatriculaService } from './service/matricula.service';




/* faz a inicialização do App */
import { AngularFireModule } from '@angular/fire';
/* módulo do Real Time Database */
import { AngularFireDatabaseModule } from '@angular/fire/database';

var firebaseConfig = {
    apiKey: "AIzaSyD6E6T_KdcrcZkeqKlK484k5ktzzJQ4n2U",
    authDomain: "lista10-fatec.firebaseapp.com",
    databaseURL: "https://lista10-fatec.firebaseio.com",
    projectId: "lista10-fatec",
    storageBucket: "lista10-fatec.appspot.com",
    messagingSenderId: "998465295758",
    appId: "1:998465295758:web:2b4fed53c37ac86b0d00df",
    measurementId: "G-WYH9J5DKCM"
  };


const rotas: Routes = [
/* será chamado o componente FormAluno quando a URL endereçar /aluno */
{path: 'aluno', component: FormAlunoComponent},
/* será chamado o componente FormDisciplina quando a URL endereçar /disciplina */
{path: 'disciplina', component: FormDisciplinaComponent},
/* será chamado o componente FormMatricula quando a URL endereçar /matricula */
{path: 'matricula', component: FormMatriculaComponent},
/* será redirecionado para a URL /aluno quando a URL terminar na raiz / */
{path: '', redirectTo: '/aluno', pathMatch: 'full'},
/* será redirecionado para a URL /matricula quando a URL for desconhecida, por exemplo, /teste */
{path: '**', redirectTo: '/matricula' }
];
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    /* é necessário registrar as rotas usando RouterModule.forRoot()
    Ao usar forRoot o serviço Router estará disponível em toda a aplicação */
    RouterModule.forRoot(rotas)
  ],
  declarations: [
    AppComponent,
    FormAlunoComponent,
    FormDisciplinaComponent,
    FormMatriculaComponent
    ],
  bootstrap: [ AppComponent ],
  providers: [ AlunoService, DisciplinaService, MatriculaService ]
})
export class AppModule { }
