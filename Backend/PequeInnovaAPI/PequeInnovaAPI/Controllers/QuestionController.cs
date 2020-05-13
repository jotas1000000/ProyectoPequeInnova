using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Exceptions;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Models.ModelsRequests;
using PequeInnovaAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/Area/{areaId:int}/Course/{courseId:int}/Lesson/{lessonId:int}/[Controller]")]
    public class QuestionController:ControllerBase
    {
        private IQuestionService service;

        public QuestionController(IQuestionService service)
        {
            this.service = service;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<QuestionModel>>> getQuestions(int areaId, int courseId, int lessonId)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                return Ok(await service.getQuestionAsync(areaId,courseId,lessonId));
            } catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost()]
        public async Task<ActionResult<IEnumerable<QuestionModel>>> postQuestion(int areaId, int courseId, int lessonId, [FromBody] QuestionModel question)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var resp = await service.postQuestionAsync(areaId, courseId, lessonId, question);
                return Created($"api/Area/{areaId:int}/Course/{courseId:int}/Lesson/{lessonId:int}/Question/{resp.Id:int}",resp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreateQuestion")]
        public async Task<ActionResult<IEnumerable<QuestionModel>>> postQuestionCreate(int areaId, int courseId, int lessonId, [FromBody] QuestionModel question)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var resp = await service.postQuestionAsync(areaId, courseId, lessonId, question);
                ResponseIdModel rsp = new ResponseIdModel();
                rsp.id = resp.Id.GetValueOrDefault();
                return Created($"api/Area/{areaId:int}/Course/{courseId:int}/Lesson/{lessonId:int}/Question/{resp.Id:int}", rsp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
