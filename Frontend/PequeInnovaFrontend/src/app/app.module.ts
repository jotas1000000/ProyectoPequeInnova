import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { InfoCarouselComponent } from './components/info-carousel/info-carousel.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AreasComponent } from './pages/areas/areas.component';
import { FooterComponent } from './components/footer/footer.component';
import { AreaComponent } from './pages/area/area.component';
import { CourseComponent } from './pages/course/course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { ListAreasComponent } from './components/list-areas/list-areas.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TestComponent } from './pages/test/test.component';
import { NavigationBarLoggedInComponent } from './components/navigation-bar-logged-in/navigation-bar-logged-in.component';


import { ModalModule, TooltipModule, PopoverModule, ButtonsModule,CollapseModule,WavesModule,TableModule,InputsModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/services/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/services/interceptors/error.interceptor';
//import { WavesModule } from 'ng-uikit-pro-standard'
import {AreaService} from './services/area.service';
import {CourseService} from './services/course.service';
import { MainPageAdminComponent } from './pages/Admin/main-page-admin/main-page-admin.component';
import { TeacherContolPageComponent } from './pages/Admin/teacher-contol-page/teacher-contol-page.component';
import { SchoolControlPageComponent } from './pages/Admin/school-control-page/school-control-page.component';
import { AreaControlPageComponent } from './pages/Admin/area-control-page/area-control-page.component';
import { CourseControlPageComponent } from './pages/Admin/course-control-page/course-control-page.component';
import { CreateCoursePageComponent } from './pages/Admin/create-course-page/create-course-page.component';
@NgModule({
  declarations: [
    AppComponent,
    InfoCarouselComponent,
    HomeComponent,
    NavigationBarComponent,
    AreasComponent,
    FooterComponent,
    AreaComponent,
    CourseComponent,
    LessonComponent,
    CoursesComponent,
    ListAreasComponent,
    NotFoundComponent,
    RegisterStudentComponent,
    TestComponent,
    NavigationBarLoggedInComponent,
    MainPageAdminComponent,
    TeacherContolPageComponent,
    SchoolControlPageComponent,
    AreaControlPageComponent,
    CourseControlPageComponent,
    CreateCoursePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,

    ModalModule,
    TooltipModule,
    PopoverModule,
    ButtonsModule,

    FormsModule,
    ReactiveFormsModule,

    LayoutModule,
    CollapseModule,
    WavesModule,

    TableModule,
    InputsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      AreaService,
      CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
