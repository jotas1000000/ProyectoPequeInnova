using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.ModelsRequests
{
    public class InscriptionRequestModel
    {
        public int id { get; set; }
        public string userId { get; set; }
        public int areaId { get; set; }
        public int courseId { get; set; }
        public string courseName { get; set; }
        public string areaName { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public bool State { get; set; }
    }
}
