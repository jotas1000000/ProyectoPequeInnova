using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public class QuestionService : IQuestionService
    {
        private IPequeInnovaRepository repository;
        private readonly IMapper mapper;
        public QuestionService(IPequeInnovaRepository repository, IMapper mapper)
        {
            this.repository =repository;
            this.mapper = mapper;

        }
        public async Task<bool> DeleteQuestionAsync(int areaId, int courseId, int lessonId, int questionId)
        {
            await repository.ValidateArea(areaId);
            await repository.ValidateCourse(courseId);
            await repository.ValidateLesson(lessonId, courseId, areaId);
            await repository.DeleteQuestionAsync(areaId, courseId, lessonId, questionId);
            if (await repository.SaveChangesAsync())
            {
                return true;
            }
            throw new Exception("Hubo un error en la base de datos");
        }

        public async Task<IEnumerable<QuestionModel>> getQuestionAsync(int areaId, int courseId, int lessonId)
        {
            await repository.ValidateArea(areaId);
            await repository.ValidateCourse(courseId);
            await repository.ValidateLesson(lessonId, courseId, areaId);
            var resp = await repository.getQuestionAsync(areaId,courseId,lessonId);
            return mapper.Map<IEnumerable<QuestionModel>>(resp);
        }

        public async Task<QuestionModel> postQuestionAsync(int areaId, int courseId, int lessonId, QuestionModel question)
        {
            await repository.ValidateArea(areaId);
            await repository.ValidateCourse(courseId);
            await repository.ValidateLesson(lessonId, courseId, areaId);
            question.Id = null;
            question.LessonId = lessonId;
            question.Uid = "123";
            question.Title = "Titulo";
            var questionEntity = mapper.Map<QuestionEntity>(question);
            repository.postQuestionAsync(areaId, courseId, lessonId, questionEntity);
            if (await repository.SaveChangesAsync())
            {
                return mapper.Map<QuestionModel>(questionEntity);
            }
            throw new Exception("Hubo un error en la base de datos y no se pudo registrar la pregunta");

        }

        public async Task<QuestionModel> putQuestionAsync(int areaId, int courseId, int lessonId, QuestionModel question, int questionId)
        {
            await repository.ValidateCourse(courseId);
            await repository.ValidateLesson(lessonId, courseId, areaId);
            question.Id = questionId;
            var questionEntity = mapper.Map<QuestionEntity>(question);
            await repository.putQuestionAsync(areaId, courseId, lessonId, questionEntity,questionId);
            if (await repository.SaveChangesAsync())
            {
                return mapper.Map<QuestionModel>(questionEntity);
            }
            throw new Exception("Hubo un error en la base de datos y no se pudo actualizar la pregunta");
        }
    }
}
