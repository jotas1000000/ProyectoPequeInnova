using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Services;
using PequeInnovaAPI.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PequeInnovaAPI.Models.ModelsRequests;
using Microsoft.AspNetCore.Authorization;

namespace PequeInnovaAPI.Controllers
{
    [Authorize(Roles = "Profesor, Estudiante, Administrador")]
    [Route("api/Area/{areaId:int}/Course/{courseId:int}/[Controller]")]
    public class LessonController : ControllerBase
    {
        private ILessonService lessonService;
        public LessonController(ILessonService lessonService)
        {
            this.lessonService = lessonService;
        }
        
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<LessonModel>>> getLessons(int courseId, int areaId, bool showComments = false, bool showQuestions = false)
        {
            try
            {
                return Ok(await lessonService.GetLessonsAsync(courseId, areaId,showComments, showQuestions));
            }
            catch (NotFoundException ex){
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{lessonId:int}")]
        public async Task<ActionResult<LessonModel>> getLesson(int courseId, int lessonId, int areaId, bool showComments = false, bool showQuestions = false)
        {
            try
            {
                var lesson = await lessonService.GetLessonAsync(courseId, lessonId, areaId, showComments,showQuestions);
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
        [Authorize(Roles = "Profesor, Administrador")]
        [HttpPost()]
        public async Task<ActionResult<LessonModel>> PostLesson(int areaId,int courseId, [FromBody] LessonModel lesson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var newLesson = await lessonService.AddLessonAsync(courseId, lesson);
                //return Created($"/api/area/courses/sections/{courseId}/lessons/{lesson.Id}", newLesson);
                return Created($"api/Area/{areaId:int}/Course/{courseId:int}/Lesson/{newLesson.Id}", newLesson);
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
        [Authorize(Roles = "Profesor, Administrador")]
        [HttpPost("CreateLesson")]
        public async Task<ActionResult<LessonModel>> PostLessonCreated(int areaId, int courseId, [FromBody] LessonModel lesson)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var newLesson = await lessonService.AddLessonAsync(courseId, lesson);
                ResponseIdModel rsp = new ResponseIdModel();
                rsp.id = newLesson.Id.GetValueOrDefault();
                //return Created($"/api/area/courses/sections/{courseId}/lessons/{lesson.Id}", newLesson);
                return Created($"api/Area/{areaId:int}/Course/{courseId:int}/Lesson/{newLesson.Id}", rsp);
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

        [Authorize(Roles = "Profesor, Administrador")]
        [HttpPut("{lessonId:int}")]
        public async Task<ActionResult<bool>> DeleteLesson(int lessonId, int courseId, int areaId)
        {
            try
            {
                if (!ModelState.IsValid)
                { 
                    return BadRequest("Algo salio mal en el proceso, revise la informacion");
                
                }

                return Ok(await lessonService.UpdateStatusAsync( lessonId, courseId, areaId));
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

        [HttpGet("{lessonId:int}/Questions")]
        public async Task<IActionResult> GetQuestionLesson(int courseId, int lessonId, int areaId, bool showComments = false, bool showQuestions = false)
        {
            try
            {
                var questions = await lessonService.GetQuestionsOnly(lessonId, courseId, areaId);
                return Ok(questions);
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
        /*
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<LessonModel>>> getLessons(int sectionID)
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
        public async Task<ActionResult<LessonModel>> PostLesson(int sectionID, [FromBody] LessonModel lesson)
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
        public async Task<ActionResult<LessonModel>> getLesson(int sectionId, int lessonId)
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
        */
        /*
        [HttpPut("{lessonId:int}/status")]
        public async Task<ActionResult<bool>> DeleteLesson(int lessonId)
        {
            try
            {
                //return Ok(await lessonService.UpdateStatusAsync(sectionId));
                return Ok(await lessonService.UpdateStatusAsync(lessonId)); //Cambios de Pablo
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
        */

        [Authorize(Roles = "Profesor, Administrador")]
        [HttpPut("{lessonId:int}/EditLesson")]
        public async Task<IActionResult> PutLesson(int courseId, int lessonId, [FromBody] LessonModel lesson)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Algo salio mal en el proceso, revise la informacion");

                }

                var lessonResponse = await lessonService.UpdateLessonAsync(courseId, lessonId, lesson);
                if (lessonResponse == null)
                {
                    throw new Exception("Algo salio mal en el proceso");
                }            
                return Ok(true);
            }
            catch
            {
                throw new Exception("Algo salio mal en el proceso");
            }
        }
        
    }
}
