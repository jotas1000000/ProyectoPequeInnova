using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class InscriptionEntity
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("CourseId")]
        public virtual CourseEntity Course { get; set; }

        // [Required]
        public string Uid { get; set; }
        //   [Required]
        public bool State { get; set; }
        //  [Required]
        public bool Status { get; set; }
        //  [Required]
        public DateTime UpdateDate { get; set; }
        //  [Required]
        public DateTime CreateDate { get; set; }
    }
}
