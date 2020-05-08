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
    public class PracticeService : IPracticeService
    {
        private IPequeInnovaRepository practiceRapository;
        private readonly IMapper mapper;
        public PracticeService(IPequeInnovaRepository practiceRapository, IMapper mapper)
        {
            this.practiceRapository = practiceRapository;
            this.mapper = mapper;
        }
        public async Task<Practice> AddPracticeAsync(int sectionId, Practice practice)
        {
            if (practice.SectionId != null && sectionId != practice.SectionId)
            {
                throw new InvalidOperationException("URL artisttt id and artistId should be equal");
            }
            practice.SectionId = sectionId;
           
            var sectionEntity = await validateSectionId(sectionId);

            var sectiontype = await practiceRapository.GetSectionsAsync(sectionId);
            if (sectiontype.LessonType != "Practice" && sectiontype.LessonType != "practice")
            {
                throw new Exception("Una practica no puede formar parte de seccion de lecciones");
            }
            var practiceEntity = mapper.Map<PracticeEntity>(practice);
            practiceEntity.FalseAnswer2 = "Falso";
            practiceEntity.Section = sectionEntity;

            practiceRapository.AddPractice(practiceEntity);
            if (await practiceRapository.SaveChangesAsync())
            {
                return mapper.Map<Practice>(practiceEntity);
            }
            throw new Exception("There were an error with the DB");
        }

        public async Task<bool> DeletePractice(int sectionId, int id)
        {
            var val = await validateSectionId(sectionId);
            await practiceRapository.DeleteSection(id);
            if (await practiceRapository.SaveChangesAsync())
                return true;
            return false;
        }

        public async Task<IEnumerable<Practice>> GetPractice(int sectionId)
        {
            var res = await practiceRapository.GetPractice(sectionId);
            var practices = mapper.Map<IEnumerable<Practice>>(res);
            foreach (Practice d in practices)
            {
                d.SectionId = sectionId;
            }
            return practices;
        }

        public async Task<Practice> GetPracticeAsync(int sectionId, int id)
        {
            var res = await validateSectionId(sectionId);
            var practiceEntity = await practiceRapository.GetPracticesAsync(id);
            if (practiceEntity == null)
            {
                throw new Exception("Not Found");
            }
            var prac = mapper.Map<Practice>(practiceEntity);
            prac.SectionId = sectionId;
            return prac;
        }

        public async Task<Practice> UpdatePracticeAsync(int sectionId, int id, Practice practice)
        {
            var section = await validateSectionId(sectionId);
            //if (id != practice.Id && practice.Id != null)
            //{
            //    throw new Exception("Id of the cancion in URL needs to be the same that the object");
            //}
            if (sectionId != section.Id)
            {
                throw new Exception("The id of Artist isn't correct");
            }

            practice.Id = id;
            var practiceEntity = mapper.Map<PracticeEntity>(practice);
            await practiceRapository.UpdatePractice(practiceEntity);
            if (await practiceRapository.SaveChangesAsync())
                return mapper.Map<Practice>(practiceEntity);
            throw new Exception("There were an error with the DB");
        }
        private async Task<SectionEntity> validateSectionId(int id)
        {
            var section = await practiceRapository.GetSectionsAsync(id);
            if (section == null)
            {
                throw new NotFoundException($"cannot found artista with id {id}");
            }
            practiceRapository.DetachEntity(section);
            return section;
        }
        private async Task ValidatePractice(int id)
        {
            var author = await practiceRapository.GetPracticesAsync(id);
            if (author == null)
            {
                throw new NotFoundException("invalid practice to delete");
            }
            practiceRapository.DetachEntity(author);
        }
        public async Task<bool> UpdateStatusAsync(int precticeId)
        {
            await ValidatePractice(precticeId);

            practiceRapository.UpdateStatusPractice(precticeId);
            if (await practiceRapository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
    }
}
