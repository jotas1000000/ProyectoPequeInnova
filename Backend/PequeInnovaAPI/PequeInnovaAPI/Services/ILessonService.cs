﻿using PequeInnovaAPI.Models;
using PequeInnovaAPI.Models.ModelsRequests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface ILessonService
    {
        Task<LessonModel> GetLessonAsync(int courseId, int lessonId, int areaId, bool showComments, bool showQuestions);
        Task<IEnumerable<LessonModel>> GetLessonsAsync(int courseId, int areaId, bool showComments, bool showQuestions);
        Task<LessonModel> AddLessonAsync(int courseId, LessonModel lesson);
        Task<LessonModel> UpdateLessonAsync(int courseId, int id, LessonModel lesson);
        Task<bool> UpdateStatusAsync(int lessonId, int courseId, int areaId);
        //Task<bool> DeleteLesson(int sectionId, int id);
        Task<List<QuestionLessonMutedModel>> GetQuestionsOnly(int lessonId, int courseId, int areaId);

    }
}
