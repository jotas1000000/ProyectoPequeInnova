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
    public class LessonService : ILessonService
    {
        private IPequeInnovaRepository repository;
        private readonly IMapper mapper;
        public LessonService(IPequeInnovaRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        
        public async Task<LessonModel> AddLessonAsync(int courseId, LessonModel lesson)
        {
            lesson.Id = null;
            lesson.CourseId = courseId;
            lesson.Questions = null;
            var coursevalidate = await validateCourse(courseId);
            var lessonEntity = mapper.Map<LessonEntity>(lesson);

            repository.AddLessonAsync(lessonEntity);
            if (await repository.SaveChangesAsync())
            {
                return mapper.Map<LessonModel>(lessonEntity);
            }
            throw new Exception("Hubo un error en la DB");
        }
        
        /*
        public async Task<bool> DeleteLesson(int sectionId, int id)
        {
            var val = await validateSectionId(sectionId);
            await repository.DeleteLesson(id);
            if (await repository.SaveChangesAsync())
                return true;
            return false;
        }
        */

        public async Task<LessonModel> GetLessonAsync(int courseId, int lessonId, int areaId, bool showComments, bool showQuestions)
        {
            await validateCourse(courseId);
            var res = await repository.GetLessonAsync(lessonId,courseId, areaId, showComments,showQuestions);
            var lessons = mapper.Map<LessonModel>(res);
            return lessons;
        }
        
       
        public async Task<IEnumerable<LessonModel>> GetLessonsAsync(int courseId, int areaId, bool showComments, bool showQuestions)
        {
            var res = await validateCourse(courseId);
            var LessonEntity = await repository.GetLessonsAsync(courseId, areaId, showComments, showQuestions);
            if (LessonEntity == null)
            {
                throw new Exception("Not Found");
            }
            var resp = mapper.Map<IEnumerable<LessonModel>>(LessonEntity);
           // less.SectionId = sectionId;
            return resp;
        }

        /*
        public async Task<LessonModel> UpdateLessonAsync(int sectionId, int id, LessonModel lesson)
        {
            var section = await validateSectionId(sectionId);
            //if (id != lesson.Id && lesson.Id != null)
            //{
            //    throw new Exception("Id of the cancion in URL needs to be the same that the object");
            //}
            if (sectionId != section.Id)
            {
                throw new Exception("The id of Artist isn't correct");
            }

            lesson.Id = id;
            var lessonEntity = mapper.Map<LessonEntity>(lesson);
            await repository.UpdateLesson(lessonEntity);
            if (await repository.SaveChangesAsync())
                return mapper.Map<LessonModel>(lessonEntity);
            throw new Exception("There were an error with the DB");
        }
        */
       

        private async Task<CourseEntity> validateCourse(int id)
        {
            var course = await repository.GetCourseAsync(id);
            if (course == null)
            {
                throw new NotFoundException($"No se pudo encontrar el curso con id: {id}");
            }
            return course;
        }
        
        private async Task ValidateLesson(int lessonId, int courseId, int areaId)
        {
            var lesson = await repository.GetLessonAsync(lessonId, courseId, areaId,false, false);
            if (lesson == null)
            {
                throw new NotFoundException("No se encontro la leccion.");
            }
        }
        

        public async Task<bool> UpdateStatusAsync(int lessonId, int courseId, int areaId)
        {
            await ValidateLesson(lessonId, courseId,  areaId);

            repository.UpdateStatusLesson(lessonId);
            if (await repository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
        
    }
}
