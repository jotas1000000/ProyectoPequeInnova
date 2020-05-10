using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class QuestionModel
    {
        public int? Id { get; set; }
        [Required]
        public string Title { get; set; }
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
        public int? LessonId { get; set; }
    }
}
