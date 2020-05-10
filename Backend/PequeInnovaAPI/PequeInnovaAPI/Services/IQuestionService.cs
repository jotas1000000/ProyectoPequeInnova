using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface IQuestionService
    {
        Task<IEnumerable<QuestionModel>> getQuestionAsync(int areaId, int courseId, int lessonId);
        Task<QuestionModel> postQuestionAsync(int areaId, int courseId, int lessonId, QuestionModel question);
        Task<QuestionModel> putQuestionAsync(int areaId, int courseId, int lessonId, QuestionModel question, int questionId);
        Task<bool> DeleteQuestionAsync(int areaId, int courseId, int lessonId, int questionId);


    }
}
