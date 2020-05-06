using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface ILessonService
    {
        Task<IEnumerable<Lesson>> GetLesson(int sectionId);
        Task<Lesson> GetLessonAsync(int sectionId, int id);
        Task<Lesson> AddLessonAsync(int sectionId, Lesson lesson);
        Task<Lesson> UpdateLessonAsync(int sectionId, int id, Lesson lesson);
        Task<bool> UpdateStatusAsync(int lessonId);
        Task<bool> DeleteLesson(int sectionId, int id);
    }
}
