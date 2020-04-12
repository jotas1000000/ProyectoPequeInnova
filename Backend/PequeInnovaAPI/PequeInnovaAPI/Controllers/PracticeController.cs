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
    [Route("api/area/courses/sections/{sectionID:int/practices")]
    public class PracticeController : ControllerBase
    {
        private IPracticeService practiceService;
        public PracticeController(IPracticeService practiceService)
        {
            this.practiceService = practiceService;

        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Practice>>> getPractice(int sectionId)
        {
            try
            {
                return Ok(await practiceService.GetPractice(sectionId));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPost()]
        public async Task<ActionResult<Practice>> PostPractice(int sectionId, [FromBody] Practice practice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newPractice = await practiceService.AddPracticeAsync(sectionId, practice);
                return Created($"/api/area/courses/sections/{sectionId}/practices/{practice.Id}", newPractice);
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
        public async Task<ActionResult<Practice>> getPractice(int sectionId, int practiceId)
        {
            try
            {
                var lesson = await practiceService.GetPracticeAsync(sectionId, practiceId);
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
        [HttpDelete("{lessonId:int}")]
        public async Task<ActionResult<bool>> DeletePractice(int practiceId, int sectionId)
        {
            try
            {
                var NoMoreSection = await practiceService.DeletePractice(sectionId, practiceId);
                return Ok(NoMoreSection);
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



        [HttpPut("{lessonId:int}")]
        public async Task<ActionResult<Practice>> PutPractice(int sectionId, int practiceId, [FromBody] Practice practice)
        {
            try
            {
                return Ok(await practiceService.UpdatePracticeAsync(sectionId, practiceId, practice));
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
        }
    }
}
