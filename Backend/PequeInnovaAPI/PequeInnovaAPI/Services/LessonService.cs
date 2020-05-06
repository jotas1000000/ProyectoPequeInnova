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
        private IPequeInnovaRepository lessonRapository;
        private readonly IMapper mapper;
        public LessonService(IPequeInnovaRepository lessonRapository, IMapper mapper)
        {
            this.lessonRapository = lessonRapository;
            this.mapper = mapper;
        }
        public async Task<Lesson> AddLessonAsync(int sectionId, Lesson lesson)
        {
            if (lesson.SectionId != null && sectionId != lesson.SectionId)
            {
                throw new InvalidOperationException("URL artisttt id and artistId should be equal");
            }
            lesson.SectionId = sectionId;

            var sectionEntity = await validateSectionId(sectionId);

            var sectiontype = await lessonRapository.GetSectionsAsync(sectionId);
            if (sectiontype.LessonType!="Lesson" && sectiontype.LessonType != "lesson")
            {          
                throw new Exception("Una leccion no puede formar parte de seccion de practicas");
            }
            var lessonEntity = mapper.Map<LessonEntity>(lesson);
            lessonEntity.Section = sectionEntity;

            lessonRapository.AddLesson(lessonEntity);
            if (await lessonRapository.SaveChangesAsync())
            {
                return mapper.Map<Lesson>(lessonEntity);
            }
            throw new Exception("There were an error with the DB");
        }

        public async Task<bool> DeleteLesson(int sectionId, int id)
        {
            var val = await validateSectionId(sectionId);
            await lessonRapository.DeleteLesson(id);
            if (await lessonRapository.SaveChangesAsync())
                return true;
            return false;
        }


        public async Task<IEnumerable<Lesson>> GetLesson(int sectionId)
        {
            var res = await lessonRapository.GetLesson(sectionId);
            var lessons = mapper.Map<IEnumerable<Lesson>>(res);
            foreach (Lesson d in lessons)
            {
                d.SectionId = sectionId;
            }
            return lessons;
        }

        public async Task<Lesson> GetLessonAsync(int sectionId, int id)
        {
            var res = await validateSectionId(sectionId);
            var LessonEntity = await lessonRapository.GetLessonsAsync(id);
            if (LessonEntity == null)
            {
                throw new Exception("Not Found");
            }
            var less = mapper.Map<Lesson>(LessonEntity);
            less.SectionId = sectionId;
            return less;
        }

        public async Task<Lesson> UpdateLessonAsync(int sectionId, int id, Lesson lesson)
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
            await lessonRapository.UpdateLesson(lessonEntity);
            if (await lessonRapository.SaveChangesAsync())
                return mapper.Map<Lesson>(lessonEntity);
            throw new Exception("There were an error with the DB");
        }
        private async Task<SectionEntity> validateSectionId(int id)
        {
            var section = await lessonRapository.GetSectionsAsync(id);
            if (section == null)
            {
                throw new NotFoundException($"cannot found artista with id {id}");
            }
            lessonRapository.DetachEntity(section);
            return section;
        }
        private async Task ValidateLesson(int id)
        {
            var author = await lessonRapository.GetLessonsAsync(id);
            if (author == null)
            {
                throw new NotFoundException("invalid lesson to delete");
            }
            lessonRapository.DetachEntity(author);
        }
        public async Task<bool> UpdateStatusAsync(int lessonId)
        {
            await ValidateLesson(lessonId);

            lessonRapository.UpdateStatusLesson(lessonId);
            if (await lessonRapository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
    }
}
