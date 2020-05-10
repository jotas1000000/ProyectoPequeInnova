using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class LessonModel
    {
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

        public int? CourseId { get; set; }

        public IEnumerable<CommentModel> Comments { get; set; }

        public IEnumerable<QuestionModel> Questions  { get; set; }

    }
}
