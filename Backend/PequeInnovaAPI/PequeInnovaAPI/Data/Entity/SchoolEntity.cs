using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data.Entity
{
    public class SchoolEntity
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Name { get; set; }
        public string City { get; set; }
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
