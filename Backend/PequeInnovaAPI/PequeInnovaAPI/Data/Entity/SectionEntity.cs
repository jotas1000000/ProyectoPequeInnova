using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class SectionEntity
    {
        [Key]
        [Required]
        public int? Id { get; set; }
        [Required]
        public string LessonType { get; set; }
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
        [ForeignKey("CourseId")]
        public virtual CourseEntity Course{ get; set; }
        public virtual ICollection<PracticeEntity> Practices { get; set; }
        public virtual ICollection<LessonEntity> Lessons { get; set; }
        public virtual ICollection<CommentEntity> Comments { get; set; }//Add

    }
}
