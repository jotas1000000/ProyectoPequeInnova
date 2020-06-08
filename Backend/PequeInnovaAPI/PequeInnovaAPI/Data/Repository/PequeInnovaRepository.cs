using PequeInnovaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Remotion.Linq.Parsing.ExpressionVisitors.MemberBindings;
using PequeInnovaAPI.Exceptions;
using PequeInnovaAPI.Models.ModelsRequests;
using Microsoft.AspNetCore.Internal;
using System.Net.Security;
using PequeInnovaAPI.Models;

namespace PequeInnovaAPI.Data.Repository
{
    public class PequeInnovaRepository : IPequeInnovaRepository
    {
        private ApiDbContext PIDBContext;

        public PequeInnovaRepository(ApiDbContext PIDBContext)
        {
            this.PIDBContext = PIDBContext;
        }
        public async Task UpdateAreaAsync(AreaEntity area)
        {
            var areaPut = await PIDBContext.Areas.SingleAsync(c => c.Id == area.Id);
            areaPut.Name = area.Name;
            areaPut.Description = area.Description;
            areaPut.Image = area.Image;
            areaPut.UpdateDate = area.UpdateDate;
            areaPut.Uid = area.Uid;
        }

        public async Task UpdateCourse(CourseEntity curso)
        {
            var cursoPut = await PIDBContext.Courses.SingleAsync(c => c.Id == curso.Id);
            cursoPut.Name = curso.Name;
            cursoPut.Description = curso.Description;
            cursoPut.Image = curso.Image;
            cursoPut.UpdateDate = DateTime.Now;
            cursoPut.Uid = curso.Uid;
        }

        public void AddAreaAsync(AreaEntity area)
        {
            var saveArea = PIDBContext.Areas.Add(area);
        }

        public void AddCourse(CourseEntity curso)
        {
            curso.Status = true;
            curso.State = true;
            curso.UpdateDate = DateTime.Now;
            curso.CreateDate = DateTime.Now;
            curso.Uid = "123";
            PIDBContext.Entry(curso.Area).State = EntityState.Unchanged;
            PIDBContext.Courses.Add(curso);
        }

        public void DetachEntity<t>(t entity) where t : class
        {
            PIDBContext.Entry(entity).State = EntityState.Detached;
        }

        public async Task DeleteAreaAsync(int id)
        {
            var area = await PIDBContext.Areas.SingleAsync(a => a.Id == id);
            PIDBContext.Areas.Remove(area);
        }

        public async Task DeleteCourses(int id)
        {
            var cursoEliminado = await PIDBContext.Courses.SingleAsync(d => d.Id == id);
            PIDBContext.Courses.Remove(cursoEliminado);
        }

        public async Task<AreaEntity> GetAreaAsync(int id, bool mostrarCursos = true)
        {
            IQueryable<AreaEntity> query = PIDBContext.Areas;
            if (mostrarCursos)
            {
                query = query.Include(r => r.Courses);
            }
            query = query.Where(a => a.Status == true);
            query = query.AsNoTracking();
            return await query.SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<AreaEntity>> GetAreas(string orderBy = "id", bool mostrarCursos = true)
        {
            IQueryable<AreaEntity> query = PIDBContext.Areas;
            if (mostrarCursos)
            {
                query = query.Include(a => a.Courses);
            }
            switch (orderBy)
            {
                case "id":
                    query = query.OrderBy(a => a.Id);
                    break;
                case "name":
                    query = query.OrderBy(a => a.Name);
                    break;
                default:
                    break;
            }
            query = query.Where(a => a.Status==true);
            query.AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<IEnumerable<CourseEntity>> GetCourse(int areaId)
        {
            IQueryable<CourseEntity> query = PIDBContext.Courses;
            query = query.Where(c => c.Status == true);
            query = query.AsNoTracking();
            return await query.Where(b => b.Area.Id == areaId).ToArrayAsync();
        }

        public Task<CourseEntity> GetCoursesAsync(int id, bool mostrarArea = false)
        {
            IQueryable<CourseEntity> query = PIDBContext.Courses;
            query = query.Where(c => c.Status == true);
            query = query.AsNoTracking();
            return query.SingleAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<CourseEntity>> GetAllCourses()
        {
            IQueryable<CourseEntity> query = PIDBContext.Courses;
            query = query.AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            try
            {
                return (await PIDBContext.SaveChangesAsync()) > 0;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<SectionEntity>> GetSection(int courseId)
        {
            IQueryable<SectionEntity> query = PIDBContext.Sections;
            query = query.AsNoTracking();
            return await query.Where(b => b.Course.Id == courseId).ToArrayAsync();
        }

        public Task<CourseEntity> GetCourseAsync(int id, bool mostrarCourse = false)
        {
            IQueryable<CourseEntity> query = PIDBContext.Courses;
            query = query.AsNoTracking();
            return query.SingleAsync(b => b.Id == id);
        }

        public void AddSection(SectionEntity section)
        {
            PIDBContext.Entry(section.Course).State = EntityState.Unchanged;
            PIDBContext.Sections.Add(section);
        }

        public async Task UpdateSection(SectionEntity section)
        {
            var sectionPut = await PIDBContext.Sections.SingleAsync(c => c.Id == section.Id);
            sectionPut.LessonType = section.LessonType;
        }

        public async Task DeleteSection(int id)
        {
            var seccionEliminada = await PIDBContext.Sections.SingleAsync(d => d.Id == id);
            PIDBContext.Sections.Remove(seccionEliminada);
        }
        
        public async Task<LessonEntity> GetLessonAsync(int lessonId, int courseId, int areaId, bool showComments, bool showQuestions)
        {
            /* IQueryable<LessonEntity> query = PIDBContext.Lessons;
             query = query.Where(b => b.Course.Id == courseId && b.Id == lessonId && b.Course.Area.Id == areaId);
             query = query.Include(l =>l.Course);
             if (showQuestions)
             {
                 query = query.Include(q => q.Questions);
             }
             if (showComments)
             {
                 query = query.Include(q => q.Comments);
             }
             query = query.AsNoTracking();
             return await query.SingleOrDefaultAsync();*/
            IQueryable<LessonEntity> query = PIDBContext.Lessons
                                            .Where(l => l.Course.Id == courseId &&
                                                   l.Status == true &&
                                                   l.Course.Area.Id == areaId &&
                                                   l.Id == lessonId)
                                            .Select(l => new LessonEntity
                                            {
                                                Id = l.Id,
                                                Title = l.Title,
                                                Document = l.Document,
                                                URLVideo = l.URLVideo,
                                                Description = l.Description,
                                                Type = l.Type,
                                                Order = l.Order,
                                                Uid = l.Uid,
                                                State = l.State,
                                                Status = l.Status,
                                                UpdateDate = l.UpdateDate,
                                                CreateDate = l.CreateDate,
                                                Course = l.Course,
                                                Comments = l.Comments.Where(c => c.Status == true && showComments == true).OrderBy(c => c.CommentDate).ToList(),
                                                Questions = l.Questions.Where(q => q.Status == true && showQuestions == true).ToList()

                                            }).OrderBy(l => l.Order)
                                            .AsNoTracking();
            return await query.SingleAsync();
        }
        
        public async Task<IEnumerable<LessonEntity>> GetLessonsAsync(int courseId, int areaId, bool showComments, bool showQuestions)
        {

            IQueryable<LessonEntity> query = PIDBContext.Lessons
                                            .Where(l => l.Course.Id == courseId &&
                                                   l.Status == true &&
                                                   l.Course.Area.Id == areaId)
                                            .Select(l => new LessonEntity {
                                                Id = l.Id,
                                                Title = l.Title,
                                                Document = l.Document,
                                                URLVideo = l.URLVideo,
                                                Description = l.Description,
                                                Type = l.Type,
                                                Order = l.Order,
                                                Uid = l.Uid,
                                                State = l.State,
                                                Status = l.Status,
                                                UpdateDate = l.UpdateDate,
                                                CreateDate = l.CreateDate,
                                                Course = l.Course,
                                                Comments = l.Comments.Where(c => c.Status==true && showComments == true).OrderByDescending(c => c.CommentDate).ToList(),
                                                Questions = l.Questions.Where(q => q.Status==true && showQuestions ==true).ToList()

                                            }).OrderBy(l => l.Order)
                                            .AsNoTracking();
            return await query.ToArrayAsync();
            /*
            IQueryable<LessonEntity> query = PIDBContext.Lessons;
            query = query.Where(l =>l.Course.Id==courseId && l.Status==true && l.Course.Area.Id == areaId);
            if (showQuestions)
            {
                query = query.Include(q => q.Questions);
            }
            if (showComments)
            {
                query = query.Include(q => q.Comments);
            }
            query = query.OrderBy(x => x.Order);
            query = query.AsNoTracking();
            return await query.ToArrayAsync();
            */
        }
        
        public void AddLessonAsync(LessonEntity lesson)
        {
            lesson.State = true;
            lesson.Status = true;
            lesson.UpdateDate = DateTime.Now;
            lesson.CreateDate = DateTime.Now;
            lesson.Uid = "123";
            PIDBContext.Entry(lesson.Course).State = EntityState.Unchanged;
            PIDBContext.Lessons.Add(lesson);
        }
        /*
        public async Task UpdateLesson(LessonEntity lesson)
        {
            var lessonPut = await PIDBContext.Lessons.SingleAsync(c => c.Id == lesson.Id);
            lessonPut.Title = lessonPut.Title;
            lessonPut.URLVideo = lesson.URLVideo;
            lessonPut.Description = lesson.Description;
        }*/

        public async Task DeleteLesson(int id)
        {
            var leccionEliminada = await PIDBContext.Lessons.SingleAsync(d => d.Id == id);
            PIDBContext.Lessons.Remove(leccionEliminada);
        }

        public async Task<IEnumerable<PracticeEntity>> GetPractice(int sectionId)
        {
            IQueryable<PracticeEntity> query = PIDBContext.Practices;
            query = query.AsNoTracking();
            return await query.Where(b => b.Section.Id == sectionId).ToArrayAsync();
        }


        public Task<PracticeEntity> GetPracticesAsync(int id, bool mostrarSection = false)
        {
            IQueryable<PracticeEntity> query = PIDBContext.Practices;
            query = query.AsNoTracking();
            return query.SingleAsync(b => b.Id == id);
        }

        public void AddPractice(PracticeEntity practice)
        {
            PIDBContext.Entry(practice.Section).State = EntityState.Unchanged;
            PIDBContext.Practices.Add(practice);
        }

        public async Task UpdatePractice(PracticeEntity practice)
        {
            var practicePut = await PIDBContext.Practices.SingleAsync(c => c.Id == practice.Id);
            practicePut.Title = practice.Title;
            practicePut.Question = practice.Question;
            practicePut.TrueAnswer = practice.TrueAnswer;
            practicePut.FalseAnswer1 = practice.FalseAnswer1;
            practicePut.FalseAnswer2 = practice.FalseAnswer2;
            practicePut.FalseAnswer3 = practice.FalseAnswer3;

        }

        public async Task DeletePractice(int id)
        {
            var practicaEliminada = await PIDBContext.Practices.SingleAsync(d => d.Id == id);
            PIDBContext.Practices.Remove(practicaEliminada);
        }

        public void UpdateStatus(int areaId)
        {
            var area= PIDBContext.Areas.Single(c => c.Id == areaId);
            area.Status = false;
        }

        public void UpdateStatusCourse(int courseId)
        {
            var course = PIDBContext.Courses.Single(c => c.Id == courseId);
            course.Status = false;
        }

        public void UpdateStatusSection(int secctionId)
        {
            var section = PIDBContext.Sections.Single(c => c.Id == secctionId);
            section.Status = false;
        }

        public void UpdateStatusLesson(int lessonId)
        {
            var lesosn = PIDBContext.Lessons.Single(c => c.Id == lessonId);
            lesosn.Status = false;
        }

        public void UpdateStatusPractice(int practiceId)
        {
            var practice = PIDBContext.Practices.Single(c => c.Id == practiceId);
            practice.Status = false;
        }

        public async Task<IEnumerable<QuestionEntity>> getQuestionAsync(int areaId, int courseId, int lessonId)
        {
            IQueryable<QuestionEntity> query = PIDBContext.Questions;

            query = query.Where(q => 
                                q.Status == true && 
                                q.Lesson.Id == lessonId &&
                                q.Lesson.Course.Id == courseId &&
                                q.Lesson.Course.Area.Id == areaId);
            query = query.Include(q => q.Lesson);
            query = query.AsNoTracking();

            return await query.ToArrayAsync();
        }

        public void postQuestionAsync(int areaId, int courseId, int lessonId, QuestionEntity question)
        {
            question.State = true;
            question.Status = true;
            question.CreateDate = DateTime.Now;
            question.UpdateDate = DateTime.Now;
            PIDBContext.Entry(question.Lesson).State = EntityState.Unchanged;
            PIDBContext.Questions.Add(question);            
        }

        public async Task putQuestionAsync(int areaId, int courseId, int lessonId, QuestionEntity question, int questionId)
        {
            var questionPut = await PIDBContext.Questions
                                             .SingleAsync(  q => 
                                                            q.Id == question.Id &&
                                                            q.Status == true &&
                                                            q.Lesson.Id == lessonId &&
                                                            q.Lesson.Course.Id == courseId &&
                                                            q.Lesson.Course.Area.Id == areaId);

            questionPut.Title = question.Title;
            questionPut.Question = question.Question;
            questionPut.TrueAnswer = question.TrueAnswer;
            questionPut.FalseAnswer1 = question.FalseAnswer1;
            questionPut.FalseAnswer2 = question.FalseAnswer2;
            questionPut.FalseAnswer3 = question.FalseAnswer3;
            questionPut.Status = question.Status;
           // questionPut.State = question.State;
            questionPut.UpdateDate = DateTime.Now;
        }

        public async Task DeleteQuestionAsync(int areaId, int courseId, int lessonId, int questionId)
        {
            var questionPut = await PIDBContext.Questions
                                                .SingleAsync(q =>
                                                                q.Status == true &&
                                                                q.Lesson.Id == lessonId &&
                                                                q.Lesson.Course.Id == courseId &&
                                                                q.Lesson.Course.Area.Id == areaId);

            questionPut.Status = false;
        }

        public async Task ValidateArea(int areaId)
        {
            var area = await GetAreaAsync(areaId, false);
            if (area == null)
            {
                throw new NotFoundException("No se encontro el Area indicada");
            }
        }

        public async Task ValidateCourse(int courseId)
        {
            var course = await GetCourseAsync(courseId);
            if (course == null)
            {
                throw new NotFoundException($"No se pudo encontrar el curso con id: {courseId}");
            }
        }

        public async Task ValidateLesson(int lessonId, int courseId, int areaId)
        {
            var lesson = await GetLessonAsync(lessonId, courseId, areaId, false, false);
            if (lesson == null)
            {
                throw new NotFoundException("No se encontro la leccion.");
            }
        }

        public async Task<SchoolEntity> GetSchoolAsync(int id)
        {
            IQueryable<SchoolEntity> query = PIDBContext.Schools;
            query = query.AsNoTracking();

            return await query.SingleOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<SchoolEntity>> GetSchools(string orderBy = "id")
        {
            IQueryable<SchoolEntity> query = PIDBContext.Schools;

            switch (orderBy)
            {
                case "id":
                    query = query.OrderBy(a => a.Id);
                    break;
                case "name":
                    query = query.OrderBy(a => a.Name);
                    break;
                case "city":
                    query = query.OrderBy(a => a.Name);
                    break;
                default:
                    break;
            }

            return await query.ToArrayAsync();
        }

        public async Task UpdateSchoolAsync(SchoolEntity school)
        {
            var schoolPut = await PIDBContext.Schools.SingleAsync(c => c.Id == school.Id);
            schoolPut.Name = school.Name;
            schoolPut.City = school.City;
        }

        public void AddSchoolAsync(SchoolEntity school)
        {
            var saveSchool= PIDBContext.Schools.Add(school);
        }

        public void UpdateStatusSchool(int schoolId)
        {
            var school = PIDBContext.Schools.Single(c => c.Id == schoolId);
            school.Status = false;
        }

        public void PostCourseComplete(CourseEntity courseComplete)
        {
            PIDBContext.Entry(courseComplete.Area).State = EntityState.Unchanged;
            PIDBContext.Courses.Add(courseComplete);
        }

        public void PostLessonComplete(LessonEntity lessonComplete)
        {
            PIDBContext.Entry(lessonComplete.Course).State = EntityState.Unchanged;
            PIDBContext.Lessons.Add(lessonComplete);
        }

        public void PostQuestionComplete(QuestionEntity questionComplete)
        {
            PIDBContext.Entry(questionComplete.Lesson).State = EntityState.Unchanged;
            PIDBContext.Questions.Add(questionComplete);
        }


        public async Task<List<QuestionLessonMutedEntity>> GetQuestionsOnly(int lessonId, int courseId, int areaId)
        {
            var query = await (from q in PIDBContext.Questions
                              where q.Lesson.Id == lessonId
                              select new QuestionLessonMutedEntity
                              {
                                  Question = q.Question,
                                  answers = new List<Tuple<string, bool>> {
                                        Tuple.Create(q.TrueAnswer,true),
                                        Tuple.Create(q.FalseAnswer1,false),
                                        Tuple.Create(q.FalseAnswer2,false),
                                        Tuple.Create(q.FalseAnswer3,false),
                                    }
                              }
                              ).AsNoTracking().ToListAsync();
            return query;
        }

        public void postAssignment(AssignmentEntity assignment)
        {
            PIDBContext.Assignments.Add(assignment);
        }

        public async Task deleteAssginment(int id)
        {
            var assignment = await PIDBContext.Assignments.SingleAsync(a => a.Id == id);
            PIDBContext.Assignments.Remove(assignment);
        }

        public async Task<IEnumerable<AssignmentRequestModel>> GetAssignments()
        {
            var query = await (from a in PIDBContext.Assignments
                               join ar in PIDBContext.Areas on a.AreaId equals ar.Id
                               join u in PIDBContext.Users on a.UserId equals u.Id
                               where a.Status == true && ar.Status == true && u.Status == true
                               select new AssignmentRequestModel
                               {
                                   id = a.Id.GetValueOrDefault(),
                                   nameArea = ar.Name,
                                   nameUser = u.Name+" "+u.LastName,
                                   areaId = ar.Id,
                                   userId = u.Id
                               }
                               ).AsNoTracking().ToListAsync();
            return query;
        }

        public void postComment(CommentEntity comment)
        {
            PIDBContext.Entry(comment.Lesson).State = EntityState.Unchanged;
            PIDBContext.Comments.Add(comment);
        }

        public async Task deleteComment(string userId, int commentId)
        {
            var comment = await PIDBContext.Comments.SingleAsync(c =>  c.Id == commentId);
            comment.Status = false;
            comment.UpdateDate = DateTime.Now;
            comment.Uid = userId;
            
        }

        public async Task deleteUser(string userId)
        {
            var userEntity = await PIDBContext.Users.SingleAsync(u => u.Id == userId);
            userEntity.Status = false;
            userEntity.UpdateDate = DateTime.Now;
         }

        public async Task<IEnumerable<GetStudentsModel>> getStudents()
        {
            var query = await (from u in PIDBContext.Users
                               join ur in PIDBContext.UserRoles on u.Id equals ur.UserId
                               join r in PIDBContext.Roles on ur.RoleId equals r.Id
                               where u.Status == true && r.NormalizedName == "ESTUDIANTE"
                               select new GetStudentsModel { 
                                    Id = u.Id,
                                    Name = u.Name,
                                    LastName = u.LastName,
                                    RoleName = r.Name,
                                    Email = u.Email,
                                    School = u.School,
                                    Grade = u.Grade,
                                    Age = u.Age,
                                    Birthday = u.Birthday
                               }).AsNoTracking().ToListAsync();
            return query;

         }

        public async Task updateStudent(UpdateStudent student)
        {
            var studentEntity = await PIDBContext.Users.SingleAsync(u => u.Id == student.Id);
            studentEntity.UpdateDate = DateTime.Now;
            studentEntity.UserName = student.UserName;
            studentEntity.Email = student.Email;
            studentEntity.Name = student.Name;
            studentEntity.LastName = student.LastName;
            studentEntity.Age = student.Age;
            studentEntity.Birthday = student.Birthday;
            studentEntity.School = student.School;
            studentEntity.Grade = student.Grade;
            studentEntity.Uid = student.Uid;

        }

        public async Task updateTeacher(UpdateTeacher teacher)
        {
            var teacherEntity = await PIDBContext.Users.SingleAsync(u => u.Id == teacher.Id);
            teacherEntity.UpdateDate = DateTime.Now;
            teacherEntity.UserName = teacher.UserName;
            teacherEntity.Email = teacher.Email;
            teacherEntity.Name = teacher.Name;
            teacherEntity.LastName = teacher.LastName;
            teacherEntity.Degree = teacher.Degree;
            teacherEntity.City = teacher.City;
            teacherEntity.Uid = teacher.Uid;
         }

        public async Task<IEnumerable<InscriptionRequestModel>> GetInscriptions()
        {
            var query = await (from i in PIDBContext.Inscriptions
                               join u in PIDBContext.Users on i.UserId equals u.Id
                               join c in PIDBContext.Courses on i.Course.Id equals c.Id
                               join a in PIDBContext.Areas on c.Area.Id equals a.Id
                               join ur in PIDBContext.UserRoles on u.Id equals ur.UserId
                               join r in PIDBContext.Roles on ur.RoleId equals r.Id
                               where i.Status == true && u.Status == true &&
                                     c.Status == true && a.Status == true
                               select new InscriptionRequestModel { 
                                    id = i.Id,
                                    userId = u.Id,
                                    RoleName = r.Name,
                                    areaId = a.Id,
                                    courseId = c.Id.GetValueOrDefault(),
                                    courseName = c.Name,
                                    areaName = a.Name,
                                    Name = u.Name,
                                    LastName = u.LastName,
                                    State = i.State
                               }                               
                               ).AsNoTracking().ToArrayAsync();
            return query;
        }

        public async Task approveInscription(int inscriptionId)
        {
            var inscriptionEntity = await PIDBContext.Inscriptions.SingleAsync(i => i.Id == inscriptionId);
            inscriptionEntity.State = true;
            inscriptionEntity.UpdateDate = DateTime.Now;
        }

        public void postInscription(InscriptionEntity inscription)
        {
            PIDBContext.Entry(inscription.Course).State = EntityState.Unchanged;
            PIDBContext.Inscriptions.Add(inscription);
        }

        public async Task deleteInscription(int id)
        {
            var inscriptionEntity = await PIDBContext.Inscriptions.SingleAsync(i => i.Id == id);
            inscriptionEntity.Status = false;
            inscriptionEntity.UpdateDate = DateTime.Now;
        }

        public async Task<CourseEntity> GetCourserforEdit(int areaId, int id)
        {
            var query = await (from c in PIDBContext.Courses
                               where c.Status == true && c.Id == id
                               select new CourseEntity
                               {
                                   Id = c.Id,
                                   Name = c.Name,
                                   Description = c.Description,
                                   Image = c.Image,
                                   Uid = c.Uid,
                                   State = c.State,
                                   Status = c.Status,
                                   UpdateDate = c.UpdateDate,
                                   CreateDate = c.CreateDate,
                                   Area = c.Area,
                                   Lessons = (from l in PIDBContext.Lessons
                                              where l.Status == true && l.Course.Id == id
                                              select new LessonEntity {
                                                  Id = l.Id,
                                                  Title = l.Title,
                                                  Document = l.Document,
                                                  URLVideo = l.URLVideo,
                                                  Description = l.Description,
                                                  Type = l.Type,
                                                  Order = l.Order,
                                                  Uid = l.Uid,
                                                  State = l.State,
                                                  Status = l.Status,
                                                  UpdateDate = l.UpdateDate,
                                                  CreateDate = l.CreateDate,
                                                  Course = l.Course,
                                                  Questions = l.Questions.Where(q => q.Status == true && q.Lesson.Id == l.Id).ToList()
                                              }).OrderBy(l => l.Order).AsNoTracking().ToArray()
                               }).AsNoTracking().ToArrayAsync();

            var query2 = query.SingleOrDefault(c => c.Area.Id == areaId && c.Id == id);
            return query2;
           
        }

        public async Task<CourseEntity> test(int areaId, int id) {

            var query = await (from c in PIDBContext.Courses
                               where c.Status == true && c.Id == id
                               select new CourseEntity
                               {
                                   Id = c.Id,
                                   Name = c.Name,
                                   Description = c.Description,
                                   Image = c.Image,
                                   Uid = c.Uid,
                                   State = c.State,
                                   Status = c.Status,
                                   UpdateDate = c.UpdateDate,
                                   CreateDate = c.CreateDate,
                                   Area = c.Area,
                                   Lessons = (PIDBContext.Lessons.Where(l=>l.Status == true &&
                                                                        l.Course.Id == id)).Include(l =>l.Questions).ToList()
                               }).AsNoTracking().ToArrayAsync();

            var query2 = query.SingleOrDefault(c => c.Area.Id == areaId && c.Id == id);
            return query2;
        }

        public async Task UpdateLessonAsync(int courseId, int id, LessonEntity lesson)
        {
            var lessonPut = await PIDBContext.Lessons.SingleAsync(c => c.Id == lesson.Id);
            lessonPut.Title = lesson.Title;
            lessonPut.URLVideo = lesson.URLVideo;
            lessonPut.Description = lesson.Description;
            lessonPut.Order = lesson.Order;
            lessonPut.Uid = lesson.Uid;
            lessonPut.Status = lesson.Status;
            lessonPut.UpdateDate = DateTime.Now;
        }

        public async Task<AssignmentRequestModel> getAssignment(string userId)
        {
            var query = await(from a in PIDBContext.Assignments
                              join ar in PIDBContext.Areas on a.AreaId equals ar.Id
                              join u in PIDBContext.Users on a.UserId equals u.Id
                              where a.Status == true && ar.Status == true && u.Status == true
                              select new AssignmentRequestModel
                              {
                                  id = a.Id.GetValueOrDefault(),
                                  nameArea = ar.Name,
                                  nameUser = u.Name + " " + u.LastName,
                                  areaId = ar.Id,
                                  userId = u.Id
                              }
                               ).AsNoTracking().FirstOrDefaultAsync();
            return query;
        }

        public async Task<IEnumerable<CourseEntity>> getCoursesByOwner(string userId)
        {
            var query = await (from t in PIDBContext.Teachings
                                                    join c in PIDBContext.Courses on t.CourseId equals c.Id
                                                    where t.UserId == userId && c.Status == true && t.Status == true
                                                    select new CourseEntity
                                                    {
                                                        Id = c.Id,
                                                        Name = c.Name,
                                                        Description = c.Description,
                                                        Image = c.Image,
                                                        Area = c.Area                                                       

                                                    }).AsNoTracking().ToArrayAsync();
            return query;
        }

        public void postTeaching(TeachingEntity teaching)
        {
            //PIDBContext.Entry(teaching.CourseId).State = EntityState.Unchanged;
            PIDBContext.Teachings.Add(teaching);
        }

        public async Task<IEnumerable<TeachingEntity>> getTeachings()
        {
            IQueryable<TeachingEntity> query = PIDBContext.Teachings.Where(t => t.Status == true);
            query = query.AsNoTracking();
            return await query.ToArrayAsync();
        }

        public async Task<InscriptionEntity> GetInscription(int courseId, string userId)
        {
            IQueryable<InscriptionEntity> query = PIDBContext.Inscriptions;
            query = query.AsNoTracking();
            return await query.SingleOrDefaultAsync(i => i.Course.Id == courseId && i.UserId == userId && i.Status == true);
        }

        public async Task<IEnumerable<InscriptionRequestModel>> getInscriptionsUser(string userId)
        {
            var query = await (from i in PIDBContext.Inscriptions
                               join u in PIDBContext.Users on i.UserId equals u.Id
                               join c in PIDBContext.Courses on i.Course.Id equals c.Id
                               join a in PIDBContext.Areas on c.Area.Id equals a.Id
                               join ur in PIDBContext.UserRoles on u.Id equals ur.UserId
                               join r in PIDBContext.Roles on ur.RoleId equals r.Id
                               where i.Status == true && u.Status == true &&
                                     c.Status == true && a.Status == true && 
                                     u.Id == userId
                               select new InscriptionRequestModel
                               {
                                   id = i.Id,
                                   userId = u.Id,
                                   RoleName = r.Name,
                                   areaId = a.Id,
                                   courseId = c.Id.GetValueOrDefault(),
                                   courseName = c.Name,
                                   areaName = a.Name,
                                   Name = u.Name,
                                   LastName = u.LastName,
                                   State = i.State
                               }
                               ).AsNoTracking().ToArrayAsync();
            return query;
        }

        public async Task<IEnumerable<TeacherAssignmentModel>> getTeacherForAssignment()
        {
            var query = await (from teacher in PIDBContext.Users
                               join userRole in PIDBContext.UserRoles on teacher.Id equals userRole.UserId
                               join role in PIDBContext.Roles on userRole.RoleId equals role.Id
                               join assignment in PIDBContext.Assignments on teacher.Id equals assignment.UserId into TA
                               from subassignment in TA.DefaultIfEmpty()
                               join area in PIDBContext.Areas on subassignment.AreaId equals area.Id into SA
                               from subarea in SA.DefaultIfEmpty()
                               where role.NormalizedName == "PROFESOR" && teacher.Status == true &&
                                     (subassignment == null ? true :(subassignment.Status == true ? true : false) )
                               select new TeacherAssignmentModel
                               {
                                    Id = teacher.Id,
                                    Name = teacher.Name,
                                    LastName = teacher.LastName,
                                    RoleName = role.Name,
                                    City = teacher.City,
                                    Degree = teacher.Degree,
                                    Email = teacher.Email,
                                    AreaId = subassignment.AreaId,
                                    AreaName = subarea.Name ?? "Sin Area",
                                    AssignmentId = subassignment.Id.GetValueOrDefault()
                               }).AsNoTracking().ToArrayAsync();
            return query;
        }

        public async Task putAssignment(int assignmentId, AssignmentEntity assignment)
        {
            var assignmentPut = await PIDBContext.Assignments.SingleOrDefaultAsync(a => a.Id == assignmentId);
            assignmentPut.AreaId = assignment.AreaId;
            assignmentPut.UpdateDate = DateTime.Now;
        }
    }
}
