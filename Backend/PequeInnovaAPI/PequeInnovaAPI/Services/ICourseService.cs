using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<CourseModel>> GetCourse(int areaId);
        Task<CourseModel> GetCourseAsync(int areaId, int id);
        Task<IEnumerable<CourseModel>> GetAllCourses();
        Task<CourseModel> AddCourseAsync(int areaId, CourseModel course);
        Task<CourseModel> UpdateCourseAsync(int areaId, int id, CourseModel course);
        Task<bool> UpdateStatusAsync(int courseId);
        Task<bool> DeleteCourse(int areaId, int id);
    }
}
