using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class Lesson
    {
        public int? Id { get; set; }
        public string Document { get; set; }
        [Required]
        public string URLVideo { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        public int? SectionId { get; set; }
    }
}
