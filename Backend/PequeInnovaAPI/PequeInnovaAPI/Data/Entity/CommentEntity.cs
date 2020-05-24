using PequeInnovaAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class CommentEntity
    {
        public int Id { get; set; }
       /* [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }*/
        public string UserId { get; set; }

        [ForeignKey("LessonId")]
        public virtual LessonEntity Lesson { get; set; }

        public string Description { get; set; }
        public DateTime CommentDate { get; set; }
        public string UserName { get; set; }
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
