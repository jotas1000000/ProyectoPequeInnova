using AutoMapper;
using PequeInnovaAPI.Data.Entities;
using PequeInnovaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Data
{
    public class APIProfile:Profile
    {
        public APIProfile()
        {
            this.CreateMap<CommentEntity, CommentModel>()
               .ReverseMap();
        }
    }
}
