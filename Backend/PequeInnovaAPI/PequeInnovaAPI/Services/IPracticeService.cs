using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface IPracticeService
    {
        Task<IEnumerable<Practice>> GetPractice(int sectionId);
        Task<Practice> GetPracticeAsync(int sectionId, int id);
        Task<Practice> AddPracticeAsync(int sectionId, Practice practice);
        Task<Practice> UpdatePracticeAsync(int sectionId, int id, Practice practice);
        Task<bool> UpdateStatusAsync(int precticeId);
        Task<bool> DeletePractice(int sectionId, int id);
    }
}
