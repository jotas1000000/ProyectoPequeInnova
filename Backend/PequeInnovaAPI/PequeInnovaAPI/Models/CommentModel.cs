using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models
{
    public class CommentModel
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = "El id de usuario es requerido")] 
        public string UserId { get; set; }
        [Required(ErrorMessage = "El id de leccion es requerido")]
        public int LessonId { get; set; }
        public string Description { get; set; }
        public DateTime? CommentDate { get; set; }
        public string UserName { get; set; }
        // [Required]
        public string Uid { get; set; }
        //   [Required]
        public bool State { get; set; }
        //  [Required]
        public bool Status { get; set; }
        //  [Required]
        public DateTime? UpdateDate { get; set; }
        //  [Required]
        public DateTime? CreateDate { get; set; }
    }
}
