using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.ModelsRequests
{
    public class SetPasswordModel
    {
        public string Id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
