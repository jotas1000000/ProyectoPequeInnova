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
import { NavigationBarLoggedInComponent } from './components/navigation-bar-logged-in/navigation-bar-logged-in.component';

import {AuthGuard} from './guards/AuthGuard/auth.guard';
import {AdminGuard} from './guards/AdminGuard/admin.guard';
import {TeacherGuard} from './guards/TeacherGuard/teacher.guard';
import {StudentGuard} from './guards/StudentGuard/student.guard';

const routes: Routes = [
  { path: 'register', component:RegisterStudentComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'areas', component: AreasComponent, canActivate:[AuthGuard] },
  { path: 'areas/:areaId/courses', component:  AreaComponent, canActivate: [AuthGuard]},
  { path: 'areas/:areaId/courses/:courseId', component:  CourseComponent, canActivate:[AuthGuard]},
  { path: 'lesson', component:  LessonComponent, canActivate: [AuthGuard]},
  { path: 'test', component:  TestComponent, canActivate: [AuthGuard]},
  { path: 'logOutTest', component:  NavigationBarLoggedInComponent, canActivate: [AuthGuard]},
  { path: 'areas/:areaId', redirectTo: 'areas/:areaId/courses', pathMatch:'full', canActivate:[AuthGuard]},
  { path: '**', component: NotFoundComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
