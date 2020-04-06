using PequeInnovaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PequeInnovaAPI.Data.Repository
{
    public class PequeInnovaRepository : IPequeInnovaRepository
    {
        private ApiDbContext PIDBContext;

        public PequeInnovaRepository(ApiDbContext PIDBContext)
        {
            this.PIDBContext = PIDBContext;
        }
        public void UpdateAreaAsync(AreaEntity area)
        {
            var areaPut = PIDBContext.Areas.Single(c => c.Id == area.Id);
            areaPut.Name = area.Name;
            areaPut.Description = area.Description;
        }

        public void UpdateCourse(CourseEntity curso)
        {
            var cursoPut = PIDBContext.Courses.Single(c => c.Id == curso.Id);
            cursoPut.Name = curso.Name;
            cursoPut.Description = curso.Description;
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

            return await query.ToArrayAsync();
        }

        public async Task<IEnumerable<CourseEntity>> GetCourse(int areaId)
        {
            IQueryable<CourseEntity> query = PIDBContext.Courses;
            query = query.AsNoTracking();
            return await query.Where(b => b.Area.Id == areaId).ToArrayAsync();
        }

        public Task<CourseEntity> GetCoursesAsync(int id, bool mostrarArea = false)
        {
            IQueryable<CourseEntity> query = PIDBContext.Courses;
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
    }
}
