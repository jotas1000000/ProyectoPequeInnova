using PequeInnovaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Repository
{
    public interface IPequeInnovaRepository
    {
        //areas
        Task<AreaEntity> GetAreaAsync(int id, bool mostrarCursos = true);
        Task<IEnumerable<AreaEntity>> GetAreas(string orderBy = "id", bool mostrarCursos = true);
        Task DeleteAreaAsync(int id);
        Task UpdateAreaAsync(AreaEntity area);
        void AddAreaAsync(AreaEntity area);
        void UpdateStatus(int areaId);

        //cursos
        Task<IEnumerable<CourseEntity>> GetCourse(int areaId);
        Task<IEnumerable<CourseEntity>> GetAllCourses();
        Task<CourseEntity> GetCoursesAsync(int id, bool mostrarArea = false);
        void AddCourse(CourseEntity curso);
        Task UpdateCourse(CourseEntity curso);
        Task DeleteCourses(int id);

        //seccion
        Task<IEnumerable<SectionEntity>> GetSection(int courseId);
        Task<SectionEntity> GetSectionsAsync(int id, bool mostrarCourse= false);
        void AddSection(SectionEntity section);
        Task UpdateSection(SectionEntity section);
        Task DeleteSection(int id);

        //leccion
        Task<IEnumerable<LessonEntity>> GetLesson(int sectionId);
        Task<LessonEntity> GetLessonsAsync(int id, bool mostrarsection= false);
        void AddLesson(LessonEntity lesson);
        Task UpdateLesson(LessonEntity lesson);
        Task DeleteLesson(int id);

        //practica
        Task<IEnumerable<PracticeEntity>> GetPractice(int sectionId);
        Task<PracticeEntity> GetPracticesAsync(int id, bool mostrarSection= false);
        void AddPractice(PracticeEntity practice);
        Task UpdatePractice(PracticeEntity practice);
        Task DeletePractice(int id);

        //esto que no recuerdo
        void DetachEntity<t>(t entity) where t : class;
        Task<bool> SaveChangesAsync();
    }
}
