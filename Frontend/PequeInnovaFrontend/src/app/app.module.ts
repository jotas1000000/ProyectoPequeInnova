import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

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
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TestComponent } from './pages/test/test.component';


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
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
