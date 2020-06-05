using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.ModelsRequests
{
    public class TeacherAssignmentModel
    {
        public string Id { get; set; }
        public int? AreaId { get; set; }
        public string AreaName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string RoleName { get; set; }
        public string City { get; set; }
        public string Degree { get; set; }
        public string Email { get; set; }
        public int AssignmentId { get; set; }
    }
}
