using PequeInnovaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Remotion.Linq.Parsing.ExpressionVisitors.MemberBindings;
using PequeInnovaAPI.Exceptions;

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
        }

        public async Task UpdateCourse(CourseEntity curso)
        {
            var cursoPut = await PIDBContext.Courses.SingleAsync(c => c.Id == curso.Id);
            cursoPut.Name = curso.Name;
            cursoPut.Description = curso.Description;
            cursoPut.Image = curso.Image;
        }

        public void AddAreaAsync(AreaEntity area)
        {
            var saveArea = PIDBContext.Areas.Add(area);
        }

        public void AddCourse(CourseEntity curso)
        {
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
                case "nombre":
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
            IQueryable<LessonEntity> query = PIDBContext.Lessons;
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
            return await query.SingleOrDefaultAsync();
        }
        
        public async Task<IEnumerable<LessonEntity>> GetLessonsAsync(int courseId, int areaId, bool showComments, bool showQuestions)
        {
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
            query = query.AsNoTracking();
            return await query.ToArrayAsync();
        }
        
        public void AddLessonAsync(LessonEntity lesson)
        {
            PIDBContext.Entry(lesson.Course).State = EntityState.Unchanged;
            PIDBContext.Lessons.Add(lesson);
        }
        
        public async Task UpdateLesson(LessonEntity lesson)
        {
            var lessonPut = await PIDBContext.Lessons.SingleAsync(c => c.Id == lesson.Id);
            lessonPut.Title = lessonPut.Title;
            lessonPut.URLVideo = lesson.URLVideo;
            lessonPut.Description = lesson.Description;
        }

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
            questionPut.TrueAnswer = question.TrueAnswer;
            questionPut.FalseAnswer1 = question.FalseAnswer1;
            questionPut.FalseAnswer2 = question.FalseAnswer2;
            questionPut.FalseAnswer3 = question.FalseAnswer3;
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
    }
}
