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


import { ModalModule, TooltipModule, PopoverModule, ButtonsModule,CollapseModule,WavesModule,TableModule,InputsModule,CardsModule} from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/services/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/services/interceptors/error.interceptor';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';


//import { WavesModule } from 'ng-uikit-pro-standard'
import {AreaService} from './services/area.service';
import {CourseService} from './services/course.service';
import { MainPageAdminComponent } from './pages/Admin/main-page-admin/main-page-admin.component';
import { TeacherContolPageComponent } from './pages/Admin/teacher-contol-page/teacher-contol-page.component';
import { SchoolControlPageComponent } from './pages/Admin/school-control-page/school-control-page.component';
import { AreaControlPageComponent } from './pages/Admin/area-control-page/area-control-page.component';
import { CourseControlPageComponent } from './pages/Admin/course-control-page/course-control-page.component';
import { CreateCoursePageComponent } from './pages/Admin/create-course-page/create-course-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FilterStatusPipe } from './Pipes/pipeFilter/filter-status.pipe';
import { RegisterComponent } from './pages/register/register.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { CardsAreasComponent } from './components/cards-areas/cards-areas.component';
import { SearchLocalPipe } from './pipes/search-local.pipe';
import { ShufflePipe } from './pipes/shuffle.pipe';
import { SafeVideoPipe } from './pipes/safe-video.pipe';
import { SearchLessonPipe } from './pipes/search-lesson.pipe';
import { RegisterTeacherComponent } from './pages/registerTeacher/register-teacher/register-teacher.component';
import { EditCourseComponent } from './pages/Admin/edit-course/edit-course.component';
import { MainPageTeacherComponent } from './pages/Teacher/main-page-teacher/main-page-teacher.component';
import { CourseTeacherPageComponent } from './pages/Teacher/course-teacher-page/course-teacher-page.component';
import { AreaTeacherPageComponent } from './pages/Teacher/area-teacher-page/area-teacher-page.component';
import { CourseTeacherOwnerComponent } from './pages/Teacher/course-teacher-owner/course-teacher-owner.component';
import { CreateCourseTeacherComponent } from './pages/Teacher/create-course-teacher/create-course-teacher.component';
import { EditCourseTeacherComponent } from './pages/Teacher/edit-course-teacher/edit-course-teacher.component';
import { StudentControlComponent } from './pages/Admin/student-control/student-control.component';
import { EditTeacherComponent } from './pages/edit-teacher/edit-teacher.component';
import { InscripctionsComponent } from './pages/Admin/inscripctions/inscripctions.component';

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
    CreateCoursePageComponent,
    FilterStatusPipe,
    BreadcrumbComponent,
    RegisterComponent,
    CardsAreasComponent,
    SearchLocalPipe,
    ShufflePipe,
    SafeVideoPipe,
    SearchLessonPipe,
    RegisterTeacherComponent,
    EditCourseComponent,
    MainPageTeacherComponent,
    CourseTeacherPageComponent,
    AreaTeacherPageComponent,
    CourseTeacherOwnerComponent,
    CreateCourseTeacherComponent,
    EditCourseTeacherComponent,
    StudentControlComponent,
    EditTeacherComponent,
    InscripctionsComponent
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
    InputsModule,

    CarouselModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatDialogModule,

    CardsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      AreaService,
      CourseService,
      FilterStatusPipe,
    //  {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
