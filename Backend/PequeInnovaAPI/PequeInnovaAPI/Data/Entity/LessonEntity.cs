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
        [Required]
        public string Title { get; set; }
        public string Document { get; set; }
        [Required]
        public string URLVideo { get; set; }
        [Required]
        public string Description { get; set; }

        public string Type { get; set; }

        public int Order { get; set; }
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
        public virtual CourseEntity Course { get; set; }

        public virtual ICollection<CommentEntity> Comments { get; set; }

        public virtual ICollection<QuestionEntity> Questions { get; set; }
    }
}
