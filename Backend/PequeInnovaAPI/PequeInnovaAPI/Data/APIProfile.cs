﻿using AutoMapper;
using PequeInnovaAPI.Data.Entity;
//using PequeInnovaAPI.Data.Entities;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Models.ModelsRequests;
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
            this.CreateMap<CourseEntity, CourseModel>()
                .ReverseMap();
            this.CreateMap<SectionEntity, Section>()
                .ReverseMap();
            this.CreateMap<LessonEntity, LessonModel>()
                .ReverseMap();
            this.CreateMap<PracticeEntity, Practice>()
                .ReverseMap();
            this.CreateMap<CommentEntity, CommentModel>()
               .ReverseMap();
            this.CreateMap<QuestionEntity, QuestionModel>()
               .ReverseMap();
            this.CreateMap<SchoolEntity, School>()
               .ReverseMap();
            this.CreateMap<QuestionLessonMutedEntity, QuestionLessonMutedModel>()
               .ReverseMap();
            this.CreateMap<AssignmentEntity, AssignmentModel>()
               .ReverseMap();
            this.CreateMap<InscriptionEntity, InscriptionModel>()
               .ReverseMap();
        }
    }
}
