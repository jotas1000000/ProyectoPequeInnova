using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class Course
    {
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        public int? AreaId { get; set; }
        public IEnumerable<InscriptionModel> Inscriptions { get; set; }//Add
        public IEnumerable<TeachingModel> Teachings { get; set; }//Add

    }
}
