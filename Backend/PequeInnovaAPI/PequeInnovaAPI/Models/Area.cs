using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class Area
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        public IEnumerable<Course> Courses { get; set; }
        public IEnumerable<AssignmentModel> Assignments { get; set; }//Add 

    }
}
