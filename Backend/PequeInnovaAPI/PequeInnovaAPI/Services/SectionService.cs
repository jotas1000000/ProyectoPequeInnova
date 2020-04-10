using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using RestaurantAPI.Exceptions;

namespace PequeInnovaAPI.Services
{
    public class SectionService : ISectionService
    {
        private IPequeInnovaRepository sectionRapository;
        private readonly IMapper mapper;
        public SectionService(IPequeInnovaRepository sectionRapository, IMapper mapper)
        {
            this.sectionRapository = sectionRapository;
            this.mapper = mapper;
        }
        public async Task<Section> AddSectionAsync(int courseId, Section section)
        {
            if (section.CourseId != null && courseId != section.CourseId)
            {
                throw new InvalidOperationException("URL artisttt id and artistId should be equal");
            }
            section.CourseId = courseId;

            var courseEntity = await validateCourseId(courseId);

            var sectionEntity = mapper.Map<SectionEntity>(section);
            sectionEntity.Course = courseEntity;

            sectionRapository.AddSection(sectionEntity);
            if (await sectionRapository.SaveChangesAsync())
            {
                return mapper.Map<Section>(sectionEntity);
            }
            throw new Exception("There were an error with the DB");
        }

        public async Task<bool> DeleteSection(int courseId, int id)
        {
            var val = await validateCourseId(courseId);
            await sectionRapository.DeleteSection(id);
            if (await sectionRapository.SaveChangesAsync())
                return true;
            return false;
        }

        public async Task<IEnumerable<Section>> GetSection(int courseId)
        {
            var res = await sectionRapository.GetSection(courseId);
            var sections = mapper.Map<IEnumerable<Section>>(res);
            foreach (Section d in sections)
            {
                d.CourseId = courseId;
            }
            return sections;
        }

        public async Task<Section> GetSectionAsync(int courseId, int id)
        {
            var res = await validateCourseId(courseId);
            var sectionEntity = await sectionRapository.GetSectionsAsync(id);
            if (sectionEntity == null)
            {
                throw new Exception("Not Found");
            }
            var sect = mapper.Map<Section>(sectionEntity);
            sect.CourseId = courseId;
            return sect;
        }

        public async Task<Section> UpdateSectionAsync(int courseId, int id, Section section)
        {
            var course = await validateCourseId(courseId);
            if (id != section.Id && section.Id != null)
            {
                throw new Exception("Id of the cancion in URL needs to be the same that the object");
            }
            if (courseId != course.Id)
            {
                throw new Exception("The id of Artist isn't correct");
            }

            section.Id = id;
            var sectionEntity = mapper.Map<SectionEntity>(section);
            sectionRapository.UpdateSection(sectionEntity);
            if (await sectionRapository.SaveChangesAsync())
                return mapper.Map<Section>(sectionEntity);
            throw new Exception("There were an error with the DB");

        }
        private async Task<CourseEntity> validateCourseId(int id)
        {
            var course = await sectionRapository.GetCoursesAsync(id);
            if (course == null)
            {
                throw new NotFoundException($"cannot found artista with id {id}");
            }
            sectionRapository.DetachEntity(course);
            return course;
        }
    }
}
