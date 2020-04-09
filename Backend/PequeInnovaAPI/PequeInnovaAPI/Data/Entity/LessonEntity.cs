using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class LessonEntity
    {
        [Key]
        [Required]
        public int? Id { get; set; }
        public string Document { get; set; }
        [Required]
        public string URLVideo { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        [ForeignKey("SectionId")]
        public virtual SectionEntity Section { get; set; }
    }
}
