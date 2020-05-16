using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.ModelsRequests
{
    public class GetStudentsModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string RoleName { get; set; }
        public string Email { get; set; }
        public string School { get; set; }
        public string Grade { get; set; }
        public int Age { get; set; }
        public DateTime Birthday { get; set; }


    }
}
