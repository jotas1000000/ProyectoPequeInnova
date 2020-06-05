using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public class TeachingService:ITeachingService
    {
        private IPequeInnovaRepository repository;
        private IMapper mapper;
        public TeachingService(IMapper mapper, IPequeInnovaRepository repository)
        {
            this.mapper = mapper;
            this.repository = repository;
        }

        public async Task<IEnumerable<TeachingModel>> getTeachings()
        {
            var teachings = await repository.getTeachings();
            return mapper.Map<IEnumerable<TeachingModel>>(teachings);
        }

        public async Task<bool> postTeaching(TeachingModel teaching)
        {
            teaching.Id = null;
            teaching.UpdateDate = DateTime.Now;
            teaching.CreateDate = DateTime.Now;
            teaching.State = true;
            teaching.Status = true;
            var teachingEntity = mapper.Map<TeachingEntity>(teaching);
            repository.postTeaching(teachingEntity);
            await repository.SaveChangesAsync();
            return true;
        }
    }
}
