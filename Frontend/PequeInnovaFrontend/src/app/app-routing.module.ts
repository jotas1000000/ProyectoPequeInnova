import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterStudentComponent } from './components/register-student/register-student.component';


const routes: Routes = [
  {path: 'register', component:RegisterStudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
