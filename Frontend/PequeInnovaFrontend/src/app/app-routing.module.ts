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
import {MainPageAdminComponent} from './pages/Admin/main-page-admin/main-page-admin.component';
import {TeacherContolPageComponent} from './pages/Admin/teacher-contol-page/teacher-contol-page.component';
import {SchoolControlPageComponent} from './pages/Admin/school-control-page/school-control-page.component';
import {AreaControlPageComponent} from './pages/Admin/area-control-page/area-control-page.component';
import {CourseControlPageComponent} from './pages/Admin/course-control-page/course-control-page.component';
import { CreateCoursePageComponent } from './pages/Admin/create-course-page/create-course-page.component';

import {AuthGuard} from './guards/AuthGuard/auth.guard';
import {AdminGuard} from './guards/AdminGuard/admin.guard';
import {TeacherGuard} from './guards/TeacherGuard/teacher.guard';
import {StudentGuard} from './guards/StudentGuard/student.guard';
import {RegisterComponent} from './pages/register/register.component';
import { RegisterTeacherComponent } from './pages/registerTeacher/register-teacher/register-teacher.component';
import {EditCourseComponent} from './pages/Admin/edit-course/edit-course.component';
import {MainPageTeacherComponent} from './pages/Teacher/main-page-teacher/main-page-teacher.component';
import {AreaTeacherPageComponent} from './pages/Teacher/area-teacher-page/area-teacher-page.component';
import {CourseTeacherPageComponent} from './pages/Teacher/course-teacher-page/course-teacher-page.component';
import {CourseTeacherOwnerComponent} from './pages/Teacher/course-teacher-owner/course-teacher-owner.component';
import {CreateCourseTeacherComponent} from './pages/Teacher/create-course-teacher/create-course-teacher.component';
import {EditCourseTeacherComponent} from './pages/Teacher/edit-course-teacher/edit-course-teacher.component';
import { EditTeacherComponent } from './pages/edit-teacher/edit-teacher.component';
import { StudentControlComponent } from './pages/Admin/student-control/student-control.component';
import { InscripctionsComponent } from './pages/Admin/inscripctions/inscripctions.component';

const routes: Routes = [
  //{ path: 'register', component:RegisterStudentComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },

  { path: 'areas', component: AreasComponent},
  { path: 'areas/:areaId/courses', component:  AreaComponent},
  { path: 'areas/:areaId/courses/:courseId/lessons', component:  CourseComponent, canActivate: [StudentGuard]},
  { path: 'areas/:areaId/courses/:courseId/lessons/:lessonId/theoretical', component:  LessonComponent, canActivate: [StudentGuard]},
  { path: 'areas/:areaId/courses/:courseId/lessons/:lessonId/practice', component:  TestComponent, canActivate: [StudentGuard]},
  { path: 'logOutTest', component:  NavigationBarLoggedInComponent},
  { path: 'areas/:areaId', redirectTo: 'areas/:areaId/courses', pathMatch: 'full'},

  // { path: 'areas', component: AreasComponent , canActivate:[AuthGuard]},
  // { path: 'areas/:areaId/courses', component:  AreaComponent, canActivate:[AuthGuard]},
  // { path: 'areas/:areaId/courses/:courseId', component:  CourseComponent, canActivate:[AuthGuard]},
  // { path: 'lesson', component:  LessonComponent, canActivate:[AuthGuard]},
  // { path: 'test', component:  TestComponent, canActivate:[AuthGuard]},
  // { path: 'logOutTest', component:  NavigationBarLoggedInComponent, canActivate:[AuthGuard]},
  // { path: 'areas/:areaId', redirectTo: 'areas/:areaId/courses', pathMatch:'full', canActivate:[AuthGuard]},

  { path: 'mainAdmin', component:  MainPageAdminComponent, canActivate: [AdminGuard]},
  { path: 'teacherControl', component:  TeacherContolPageComponent, canActivate: [AdminGuard]},
  { path: 'schoolControl', component:  SchoolControlPageComponent, canActivate: [AdminGuard]},
  { path: 'studentControl', component:  StudentControlComponent, canActivate: [AdminGuard]},
  { path: 'studentControl/:userId/inscriptions', component:  InscripctionsComponent, canActivate: [AdminGuard]},
  { path: 'mainAdmin/areaControl', component:  AreaControlPageComponent, canActivate: [AdminGuard]},
  { path: 'mainAdmin/areaControl/:areaId/courseControl', component:  CourseControlPageComponent, canActivate: [AdminGuard]},
  { path: 'mainAdmin/areaControl/:areaId/courseControl/createCourse', component:  CreateCoursePageComponent, canActivate: [AdminGuard]},
  { path: 'registerStudent', component:  RegisterComponent },
  { path: 'registerTeacher', component:  RegisterTeacherComponent, canActivate: [AdminGuard] },
  { path: 'mainAdmin/areaControl/:areaId/courseControl/:courseId/editCourse', component:  EditCourseComponent, canActivate: [AdminGuard] },

  { path: 'mainTeacher', component:  MainPageTeacherComponent, canActivate: [TeacherGuard]},
  { path: 'mainTeacher/areaTeacher', component:  AreaTeacherPageComponent, canActivate: [TeacherGuard]},
  { path: 'mainTeacher/areaTeacher/:areaId/courseTeacher', component:  CourseTeacherPageComponent, canActivate: [TeacherGuard]},
  { path: 'mainTeacher/CourseOwner', component:  CourseTeacherOwnerComponent, canActivate: [TeacherGuard]},
  { path: 'mainTeacher/CourseOwner/Area/:areaId', component:  CreateCourseTeacherComponent, canActivate: [TeacherGuard]},
  { path: 'mainTeacher/CourseOwner/Area/:areaId/Course/:courseId/EditCourse', component:  EditCourseTeacherComponent, canActivate: [TeacherGuard]},

  { path: 'editTeacher/:id', component: EditTeacherComponent, canActivate: [AdminGuard]},
  { path: '**', component: NotFoundComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
