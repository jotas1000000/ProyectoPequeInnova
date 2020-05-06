using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public class AreaService : IAreaService
    {
        private IPequeInnovaRepository areaRapository;
        private readonly IMapper mapper;
        public AreaService(IPequeInnovaRepository pequeInovaRepository, IMapper mapper)
        {
            this.areaRapository = pequeInovaRepository;
            this.mapper = mapper;
        }
        public async Task<Area> UpdateAreaAsync(int id, Area nuevaArea)
        {
            //if (id != nuevaArea.Id)
            //{
            //    throw new InvalidOperationException("URL id needs to be the same as Author id");
            //}
            await ValidateArea(id);

            nuevaArea.Id = id;
            var areaEntity = mapper.Map<AreaEntity>(nuevaArea);
            await areaRapository.UpdateAreaAsync(areaEntity);
            if (await areaRapository.SaveChangesAsync())
            {
                return mapper.Map<Area>(areaEntity);
            }

            throw new Exception("There were an error with the DB");
        }

        public async Task<bool> DeleteAreaAsync(int id)
        {
            await ValidateArea(id);
            await areaRapository.DeleteAreaAsync(id);
            if (await areaRapository.SaveChangesAsync())
            {
                return true;
            }
            return false;
        }

        public async Task<Area> CreateAreaAsync(Area nuevaArea)
        {
            var areaEntity = mapper.Map<AreaEntity>(nuevaArea);

            areaRapository.AddAreaAsync(areaEntity);
            if (await areaRapository.SaveChangesAsync())
            {
                return mapper.Map<Area>(areaEntity);
            }

            throw new Exception("There were an error with the DB");
        }

        public async Task<Area> GetAreaAsync(int id, bool mostrarCursos)
        {
            var areaEntity = await areaRapository.GetAreaAsync(id, mostrarCursos);

            if (areaEntity == null)
            {
                throw new NotFoundException("area not found");
            }

            return mapper.Map<Area>(areaEntity);
        }

        public async Task<IEnumerable<Area>> GetAreasAsync(string orderBy, bool mostrarCursos)
        {
            orderBy = orderBy.ToLower();
            var areaEntities = await areaRapository.GetAreas(orderBy, mostrarCursos);
            return mapper.Map<IEnumerable<Area>>(areaEntities);
        }
        private async Task ValidateArea(int id)
        {
            var author = await areaRapository.GetAreaAsync(id);
            if (author == null)
            {
                throw new NotFoundException("invalid area to delete");
            }
            areaRapository.DetachEntity(author);
        }

        public async Task<bool> UpdateStatusAsync(int areaId)
        {
            await ValidateArea(areaId);

            areaRapository.UpdateStatus(areaId);
            if (await areaRapository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
    }
}
