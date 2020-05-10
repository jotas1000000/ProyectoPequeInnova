﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Exceptions;

namespace PequeInnovaAPI.Services
{
    public class CourseService : ICourseService
    {
        private IPequeInnovaRepository courseRapository;
        private readonly IMapper mapper;
        public CourseService(IPequeInnovaRepository courseRapository, IMapper mapper)
        {
            this.courseRapository = courseRapository;
            this.mapper = mapper;
        }
        public async Task<CourseModel> AddCourseAsync(int areaId, CourseModel course)
        {
            if (course.AreaId != null && areaId != course.AreaId)
            {
                throw new InvalidOperationException("URL artisttt id and artistId should be equal");
            }
            course.AreaId = areaId;
            var areaEntity = await validateAreaId(areaId);

            var courseEntity = mapper.Map<CourseEntity>(course);
            courseEntity.Area = areaEntity;
            //mapper.Map(cancion, cacnionEntity);

            courseRapository.AddCourse(courseEntity);
            if (await courseRapository.SaveChangesAsync())
            {
                return mapper.Map<CourseModel>(courseEntity);
            }
            throw new Exception("There were an error with the DB");
        }


        public async Task<bool> DeleteCourse(int areaId, int id)
        {
            var val = await validateAreaId(areaId);
            await courseRapository.DeleteCourses(id);
            if (await courseRapository.SaveChangesAsync())
                return true;
            return false;
        }

        public Task<IEnumerable<CourseModel>> GetAllCourses()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CourseModel>> GetCourse(int areaId)
        {
            var res = await courseRapository.GetCourse(areaId);
            var cancioness = mapper.Map<IEnumerable<CourseModel>>(res);
            foreach (CourseModel d in cancioness)
            {
                d.AreaId = areaId;
            }
            return cancioness;
        }

        public async Task<CourseModel> GetCourseAsync(int areaId, int id)
        {
            var res = await validateAreaId(areaId);
            var cacionEntity = await courseRapository.GetCoursesAsync(id);
            if (cacionEntity == null)
            {
                throw new Exception("Not Found");
            }
            var songe = mapper.Map<CourseModel>(cacionEntity);
            songe.AreaId = areaId;
            return songe;
        }

        public async Task<CourseModel> UpdateCourseAsync(int areaId, int id, CourseModel course)
        {
            var area = await validateAreaId(areaId);
            //if (id != course.Id && course.Id != null)
            //{
            //    throw new Exception("Id of the cancion in URL needs to be the same that the object");
            //}
            if (areaId != area.Id)
            {
                throw new Exception("The id of Artist isn't correct");
            }

            course.Id = id;
            var courseEntity = mapper.Map<CourseEntity>(course);
            await courseRapository.UpdateCourse(courseEntity);
            if (await courseRapository.SaveChangesAsync())
                return mapper.Map<CourseModel>(courseEntity);

            throw new Exception("There were an error with the DB");
        }
        private async Task<AreaEntity> validateAreaId(int id)
        {
            var area = await courseRapository.GetAreaAsync(id);
            if (area == null)
            {
                throw new NotFoundException($"cannot found artista with id {id}");
            }
            courseRapository.DetachEntity(area);
            return area;
        }

        private async Task<bool> validateAreaAndCourse(int areaId, int courseId)
        {

            var area = await courseRapository.GetAreaAsync(areaId);
            if (area == null)
            {
                throw new NotFoundException($"cannot found artista with id {areaId}");
            }

            var course = await courseRapository.GetCoursesAsync(courseId, true);
            if (course == null || course.Area.Id != areaId)
            {
                throw new NotFoundException($"Songe not found with id {courseId} for Artttist {areaId}");
            }

            return true;
        }

        private async Task ValidateCourse(int id)
        {
            var author = await courseRapository.GetCoursesAsync(id);
            if (author == null)
            {
                throw new NotFoundException("invalid course to delete");
            }
            courseRapository.DetachEntity(author);
        }

        public async Task<bool> UpdateStatusAsync(int courseId)
        {
            await ValidateCourse(courseId);

            courseRapository.UpdateStatusCourse(courseId);
            if (await courseRapository.SaveChangesAsync())
                return true;

            throw new Exception("There were an error with the DB");
        }
    }
}
