import { TestComponent } from './pages/test/test.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { CourseComponent } from './pages/course/course.component';
import { AreaComponent } from './pages/area/area.component';
import { AreasComponent } from './pages/areas/areas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';


const routes: Routes = [
  { path: 'register', component:RegisterStudentComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'areas', component: AreasComponent },
  { path: 'area', component:  AreaComponent},
  { path: 'course', component:  CourseComponent},
  { path: 'lesson', component:  LessonComponent},
  { path: 'test', component:  TestComponent},
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
