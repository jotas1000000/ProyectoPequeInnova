using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface ICourseService
    {
        Task<IEnumerable<Course>> GetCourse(int areaId);
        Task<Course> GetCourseAsync(int areaId, int id);
        Task<IEnumerable<Course>> GetAllCourses();
        Task<Course> AddCourseAsync(int areaId, Course course);
        Task<Course> UpdateCourseAsync(int areaId, int id, Course course);
        Task<bool> UpdateStatusAsync(int courseId);
        Task<bool> DeleteCourse(int areaId, int id);
    }
}
