using Microsoft.AspNetCore.Identity;
using PequeInnovaAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.Auth
{
    public class ApplicationUser:IdentityUser
    {
        //Common Data in Users
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public virtual ICollection<CommentEntity> Comments { get; set; }
        public virtual ICollection<InscriptionEntity> Inscriptions { get; set; }
        public virtual ICollection<TeachingEntity> Teachings { get; set; }
        public virtual ICollection<AssignmentEntity> Assignment { get; set; }

        //Data for Teachers
        public string Degree { get; set; }

        //Data for Students
        public string School { get; set; }
        public string Grade { get; set; }
        public int Age { get; set; }

        //Data for Data Control USer
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
