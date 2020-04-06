using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface IAreaService
    {
        Task<Area> CreateAreaAsync(Area nuevaArea);
        Task<IEnumerable<Area>> GetAreasAsync(string orderBy, bool mpstrarCursos);
        Task<Area> GetAreaAsync(int id, bool mostrarCursos);
        Task<Area> UpdateAreaAsync(int id, Area nuevaArea);
        Task<bool> DeleteAreaAsync(int id);
    }
}
