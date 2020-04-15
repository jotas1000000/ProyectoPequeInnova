using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class PracticeEntity
    {
        [Key]
        [Required]
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
        [ForeignKey("SectionId")]
        public virtual SectionEntity Section { get; set; }
    }
}
