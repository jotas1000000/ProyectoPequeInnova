using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class CourseEntity
    {
        [Key]
        [Required]
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        [ForeignKey("AreaId")]
        public virtual AreaEntity Area { get; set; }
        public virtual ICollection<SectionEntity> Sections { get; set; }
        public virtual ICollection<InscriptionEntity> Inscriptions { get; set; }//add
        public virtual ICollection<TeachingEntity> Teachings { get; set; }//add
    }
}
