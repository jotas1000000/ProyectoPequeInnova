using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface ISchoolService
    {
        Task<School> CreateSchoolAsync(School nuevaArea);
        Task<IEnumerable<School>> GetSchoolAsync(string orderBy);
        Task<School> GetSchoolAsync(int id);
        Task<School> UpdateSchoolAsync(int id, School nuevaArea);
        Task<bool> UpdateStatusAsync(int schoolId);
    }
}
