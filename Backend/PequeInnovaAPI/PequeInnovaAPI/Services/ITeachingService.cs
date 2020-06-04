using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface ITeachingService
    {
        Task<bool> postTeaching(TeachingModel teaching);
        Task<IEnumerable<TeachingModel>> getTeachings();
    }
}
