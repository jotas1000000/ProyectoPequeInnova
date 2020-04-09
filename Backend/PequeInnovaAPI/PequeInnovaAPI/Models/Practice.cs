using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class Practice
    {
        public int? Id { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public string TrueAnswer { get; set; }
        [Required]
        public string FalseAnswer1 { get; set; }
        [Required]
        public string FalseAnswer2 { get; set; }
        [Required]
        public string FalseAnswer3 { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        public int? SectionId { get; set; }
    }
}
