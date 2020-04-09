using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class CommentModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int SectionId { get; set; }
        public string Description { get; set; }
        public DateTime CommentDate { get; set; }

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
