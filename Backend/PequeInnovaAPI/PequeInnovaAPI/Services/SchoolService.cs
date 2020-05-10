using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Exceptions;
using PequeInnovaAPI.Models;

namespace PequeInnovaAPI.Services
{
    public class SchoolService : ISchoolService
    {
        private IPequeInnovaRepository schoolRapository;
        private readonly IMapper mapper;
        public SchoolService(IPequeInnovaRepository pequeInovaRepository, IMapper mapper)
        {
            this.schoolRapository = pequeInovaRepository;
            this.mapper = mapper;
        }
        public async Task<School> CreateSchoolAsync(School nuevaArea)
        {
            var schoolEntity = mapper.Map<SchoolEntity>(nuevaArea);

            schoolRapository.AddSchoolAsync(schoolEntity);
            if (await schoolRapository.SaveChangesAsync())
            {
                return mapper.Map<School>(schoolEntity);
            }

            throw new Exception("There were an error with the DB");
        }

        public async Task<IEnumerable<School>> GetSchoolAsync(string orderBy)
        {
            orderBy = orderBy.ToLower();
            var schoolEntity = await schoolRapository.GetSchools(orderBy);
            return mapper.Map<IEnumerable<School>>(schoolEntity);
        }

        public async Task<School> GetSchoolAsync(int id)
        {
            var schoolEntity = await schoolRapository.GetSchoolAsync(id);

            if (schoolEntity == null)
            {
                throw new NotFoundException("area not found");
            }

            return mapper.Map<School>(schoolEntity);
        }

        public async Task<School> UpdateSchoolAsync(int id, School nuevaArea)
        {
            nuevaArea.Id = id;
            var schoolEntity = mapper.Map<SchoolEntity>(nuevaArea);
            await schoolRapository.UpdateSchoolAsync(schoolEntity);
            if (await schoolRapository.SaveChangesAsync())
            {
                return mapper.Map<School>(schoolEntity);
            }

            throw new Exception("There were an error with the DB");
        }

        public async Task<bool> UpdateStatusAsync(int schoolId)
        {
            schoolRapository.UpdateStatusSchool(schoolId);
            if (await schoolRapository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
    }
}
