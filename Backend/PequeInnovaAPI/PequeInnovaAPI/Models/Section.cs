using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class Section
    {
        public int? Id { get; set; }
        [Required]
        public string LessonTpye { get; set; }
        public bool Active { get; set; }
        public bool Erased { get; set; }
        public int? CourseId { get; set; }
        public IEnumerable<CommentModel> Comments { get; set; }//Add
    }
}
