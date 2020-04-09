using AutoMapper;
using PequeInnovaAPI.Data.Entity;
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
            this.CreateMap<AreaEntity, Area>()
                .ReverseMap();
            this.CreateMap<CourseEntity, Course>()
                .ReverseMap();
            this.CreateMap<SectionEntity, Section>()
                .ReverseMap();
            this.CreateMap<LessonEntity, Lesson>()
                .ReverseMap();
            this.CreateMap<PracticeEntity, Practice>()
                .ReverseMap();
            this.CreateMap<CommentEntity, CommentModel>()
               .ReverseMap();
        }
    }
}
