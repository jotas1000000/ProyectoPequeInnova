using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.ModelsRequests
{
    public class RegisterTeacherModel
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime Birthday { get; set; }
        public string Degree { get; set; }
        /* [Required]
         [StringLength(50)]
         [EmailAddress]*/
        public string Email { get; set; }

        /*   [Required]
           [StringLength(50, MinimumLength = 5)]*/
        public string Password { get; set; }

        /*  [Required]
          [StringLength(50, MinimumLength = 5)]*/
        public string UserName { get; set; }

        /*[Required]
        [StringLength(50, MinimumLength = 5)]*/
        public string ConfirmPassword { get; set; }

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
