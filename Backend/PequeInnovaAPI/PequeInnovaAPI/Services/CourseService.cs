using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Exceptions;

namespace PequeInnovaAPI.Services
{
    public class CourseService : ICourseService
    {
        private IPequeInnovaRepository courseRapository;
        private readonly IMapper mapper;
        public CourseService(IPequeInnovaRepository courseRapository, IMapper mapper)
        {
            this.courseRapository = courseRapository;
            this.mapper = mapper;
        }
        public async Task<CourseModel> AddCourseAsync(int areaId, CourseModel course)
        {
            if (course.AreaId != null && areaId != course.AreaId)
            {
                throw new InvalidOperationException("URL artisttt id and artistId should be equal");
            }
            course.AreaId = areaId;
            course.Id = null;
            course.Lessons = null;
            //course.Image = "assets/images/areas/chemistry.jpg";
            var areaEntity = await validateAreaId(areaId);

            var courseEntity = mapper.Map<CourseEntity>(course);
            courseEntity.Area = areaEntity;
            //mapper.Map(cancion, cacnionEntity);

            courseRapository.AddCourse(courseEntity);
            if (await courseRapository.SaveChangesAsync())
            {
                return mapper.Map<CourseModel>(courseEntity);
            }
            throw new Exception("There were an error with the DB");
        }


        public async Task<bool> DeleteCourse(int areaId, int id)
        {
            var val = await validateAreaId(areaId);
            await courseRapository.DeleteCourses(id);
            if (await courseRapository.SaveChangesAsync())
                return true;
            return false;
        }

        public Task<IEnumerable<CourseModel>> GetAllCourses()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CourseModel>> GetCourse(int areaId)
        {
            var res = await courseRapository.GetCourse(areaId);
            var cancioness = mapper.Map<IEnumerable<CourseModel>>(res);
            foreach (CourseModel d in cancioness)
            {
                d.AreaId = areaId;
            }
            return cancioness;
        }

        public async Task<CourseModel> GetCourseAsync(int areaId, int id)
        {
            var res = await validateAreaId(areaId);
            var cacionEntity = await courseRapository.GetCoursesAsync(id);
            if (cacionEntity == null)
            {
                throw new Exception("Not Found");
            }
            var songe = mapper.Map<CourseModel>(cacionEntity);
            songe.AreaId = areaId;
            return songe;
        }

        public async Task<CourseModel> UpdateCourseAsync(int areaId, int id, CourseModel course)
        {
            var area = await validateAreaId(areaId);
            //if (id != course.Id && course.Id != null)
            //{
            //    throw new Exception("Id of the cancion in URL needs to be the same that the object");
            //}
            if (areaId != area.Id)
            {
                throw new Exception("The id of Artist isn't correct");
            }

            course.Id = id;
            var courseEntity = mapper.Map<CourseEntity>(course);
            await courseRapository.UpdateCourse(courseEntity);
            if (await courseRapository.SaveChangesAsync())
                return mapper.Map<CourseModel>(courseEntity);

            throw new Exception("There were an error with the DB");
        }
        private async Task<AreaEntity> validateAreaId(int id)
        {
            var area = await courseRapository.GetAreaAsync(id);
            if (area == null)
            {
                throw new NotFoundException($"cannot found artista with id {id}");
            }
            courseRapository.DetachEntity(area);
            return area;
        }

        private async Task<bool> validateAreaAndCourse(int areaId, int courseId)
        {

            var area = await courseRapository.GetAreaAsync(areaId);
            if (area == null)
            {
                throw new NotFoundException($"cannot found artista with id {areaId}");
            }

            var course = await courseRapository.GetCoursesAsync(courseId, true);
            if (course == null || course.Area.Id != areaId)
            {
                throw new NotFoundException($"Songe not found with id {courseId} for Artttist {areaId}");
            }

            return true;
        }

        private async Task ValidateCourse(int id)
        {
            var author = await courseRapository.GetCoursesAsync(id);
            if (author == null)
            {
                throw new NotFoundException("invalid course to delete");
            }
            courseRapository.DetachEntity(author);
        }

        public async Task<bool> UpdateStatusAsync(int courseId)
        {
            await ValidateCourse(courseId);

            courseRapository.UpdateStatusCourse(courseId);
            if (await courseRapository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
        public CourseModel CleanCourse(CourseModel courseC)
        {
            CourseModel courseAux = new CourseModel();
            courseAux.Id = null;
            courseAux.Image = courseC.Image;
            courseAux.Name = courseC.Name;
            courseAux.Description = courseC.Description;
            courseAux.Uid = courseC.Uid;
            courseAux.State = true;
            courseAux.Status = true;
            courseAux.UpdateDate = DateTime.Now;
            courseAux.CreateDate = DateTime.Now;
            courseAux.AreaId = courseC.AreaId;
            courseAux.Lessons = null;
            courseAux.Teachings = null;
            courseAux.Inscriptions = null;
            return courseAux;
        }

        public LessonModel CleanLesson(LessonModel lesson, int courseId)
        {
            LessonModel lessonAux = new LessonModel();
            lessonAux.Id = null;
            lessonAux.Title = lesson.Title;
            lessonAux.Document = lesson.Document;
            lessonAux.URLVideo = lesson.URLVideo;
            lessonAux.Description = lesson.Description;
            lessonAux.Type = lesson.Type;
            lessonAux.Uid = lesson.Uid;
            lessonAux.State = true;
            lessonAux.Status = true;
            lessonAux.UpdateDate = DateTime.Now;
            lessonAux.CreateDate = DateTime.Now;
            lessonAux.CourseId = courseId;
            lessonAux.Comments = null;
            lessonAux.Questions = null;
            return lessonAux;
        }

        public QuestionModel CleanQuestion(QuestionModel question, int lessonId)
        {
            QuestionModel questionAux = new QuestionModel();
            questionAux.Id = null;
            questionAux.Title = question.Title;
            questionAux.Question = question.Question;
            questionAux.TrueAnswer = question.TrueAnswer;
            questionAux.FalseAnswer1 = question.FalseAnswer1;
            questionAux.FalseAnswer2 = question.FalseAnswer2;
            questionAux.FalseAnswer3 = question.FalseAnswer3;
            questionAux.Uid = question.Uid;
            questionAux.State = true;
            questionAux.Status = true;
            questionAux.UpdateDate = DateTime.Now;
            questionAux.CreateDate = DateTime.Now;
            questionAux.LessonId = lessonId;
            return questionAux;
        }
        public async Task<bool> PostCourseComplete(CourseModel courseComplete)
        {            
            if(courseComplete != null)
            {
                courseComplete.Id = null;
                if(courseComplete.Lessons != null)
                {
                    if (courseComplete.Lessons.Count() > 0)
                    {
                        foreach (var el in courseComplete.Lessons)
                        {
                            el.Id = null;
                            el.CourseId = null;
                            if (el.Type == "practice")
                            {
                                foreach (var q in el.Questions)
                                {
                                    q.Id = null;
                                    //q.LessonId = null;
                                }
                            }
                        }
                    }
                }
            }

            var CourseEntity = mapper.Map<CourseEntity>(CleanCourse(courseComplete));
            courseRapository.PostCourseComplete(CourseEntity);
            await courseRapository.SaveChangesAsync();
            int courseId = CourseEntity.Id.GetValueOrDefault();
            CourseEntity = null;
            foreach (var lesson in courseComplete.Lessons)//devolvio null
            {
                var lessonEntity = mapper.Map<LessonEntity>(CleanLesson(lesson,courseId));
                courseRapository.PostLessonComplete(lessonEntity);
                await courseRapository.SaveChangesAsync();
                if (lessonEntity.Type == "practice") 
                {
                    foreach (var question in lesson.Questions) 
                    {
                        var questionEntity = mapper.Map<QuestionEntity>(CleanQuestion(question,lessonEntity.Id.GetValueOrDefault()));
                        courseRapository.PostQuestionComplete(questionEntity);
                        await courseRapository.SaveChangesAsync();
                    }
                }
            }
            /*
                        throw new Exception("There were an error with the DB");*/
            return true;
        }
    
    }
}
