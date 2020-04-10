using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Services;
using RestaurantAPI.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/area/{areaID:int}/courses")]
    public class CourseController : ControllerBase
    {
        private ICourseService courseService;
        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService;

        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Course>>> getCourses(int artistaId)
        {
            try
            {
                return Ok(await courseService.GetCourse(artistaId));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPost()]
        public async Task<ActionResult<Course>> PostCourse(int areaId, [FromBody] Course course)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newCourse= await courseService.AddCourseAsync(areaId, course);
                return Created($"/api/area/{areaId}/courses/{course.Id}", newCourse);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{courseId:int}")]
        public async Task<ActionResult<Course>> getCourse(int areaId, int courseId)
        {
            try
            {
                var course = await courseService.GetCourseAsync(areaId, courseId);
                return Ok(course);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete("{courseId:int}")]
        public async Task<ActionResult<bool>> DeleteCourse(int courseId, int areaId)
        {
            try
            {
                var NoMoreCourse = await courseService.DeleteCourse(areaId, courseId);
                return Ok(NoMoreCourse);
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Something bad happened: {ex.Message}");
            }
        }



        [HttpPut("{cancionId:int}")]
        public async Task<ActionResult<Course>> PutCourse(int areaId, int courseId, [FromBody] Course course)
        {
            try
            {
                return Ok(await courseService.UpdateCourseAsync(areaId, courseId, course));
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
        }
    }
}
