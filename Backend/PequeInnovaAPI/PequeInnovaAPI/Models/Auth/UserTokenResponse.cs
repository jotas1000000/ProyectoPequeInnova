using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Models.Auth
{
    public class UserTokenResponse
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Id { get; set; }
        public string Token { get; set; }
    }
}
