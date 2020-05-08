using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Services;
using PequeInnovaAPI.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/area/{areaID:int}/courses/{courseID:int}/sections/{sectionID:int}/lessons")]
    public class LessonController : ControllerBase
    {
        private ILessonService lessonService;
        public LessonController(ILessonService lessonService)
        {
            this.lessonService = lessonService;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Lesson>>> getLessons(int sectionID)
        {
            try
            {
                return Ok(await lessonService.GetLesson(sectionID));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPost()]
        public async Task<ActionResult<Lesson>> PostLesson(int sectionID, [FromBody] Lesson lesson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newLesson = await lessonService.AddLessonAsync(sectionID, lesson);
                return Created($"/api/area/courses/sections/{sectionID}/lessons/{lesson.Id}", newLesson);
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

        [HttpGet("{lessonId:int}")]
        public async Task<ActionResult<Lesson>> getLesson(int sectionId, int lessonId)
        {
            try
            {
                var lesson = await lessonService.GetLessonAsync(sectionId, lessonId);
                return Ok(lesson);
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
        [HttpPut("{lessonId:int}/status")]
        public async Task<ActionResult<bool>> DeleteLesson(int lessonId, int sectionId)
        {
            try
            {
                return Ok(await lessonService.UpdateStatusAsync(sectionId));
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
            //try
            //{
            //    var NoMoreSection = await lessonService.DeleteLesson(sectionId, lessonId);
            //    return Ok(NoMoreSection);
            //}
            //catch (NotFoundException ex)
            //{
            //    return NotFound(ex.Message);
            //}
            //catch (Exception ex)
            //{
            //    return this.StatusCode(StatusCodes.Status500InternalServerError, $"Something bad happened: {ex.Message}");
            //}
        }



        [HttpPut("{lessonId:int}")]
        public async Task<ActionResult<Lesson>> PutLesson(int sectionId, int lessonId, [FromBody] Lesson lesson)
        {
            try
            {
                return Ok(await lessonService.UpdateLessonAsync(sectionId, lessonId, lesson));
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
        }
    }
}
