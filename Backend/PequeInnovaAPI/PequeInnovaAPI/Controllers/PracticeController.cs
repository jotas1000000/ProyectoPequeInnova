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
    [Route("api/area/{areaID:int}/courses/{courseID:int}/sections/{sectionID:int}/practices")]
    public class PracticeController : ControllerBase
    {
        private IPracticeService practiceService;
        public PracticeController(IPracticeService practiceService)
        {
            this.practiceService = practiceService;

        }
        /*
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Practice>>> getPractice(int sectionID)
        {
            try
            {
                return Ok(await practiceService.GetPractice(sectionID));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPost()]
        public async Task<ActionResult<Practice>> PostPractice(int sectionID, [FromBody] Practice practice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newPractice = await practiceService.AddPracticeAsync(sectionID, practice);
                return Created($"/api/area/courses/sections/{sectionID}/practices/{practice.Id}", newPractice);
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
        [HttpPut("{lessonId:int}/status")]
        public async Task<ActionResult<bool>> DeletePractice(int practiceId)
        {
            try
            {
                return true;
                //return Ok(await practiceId.UpdateStatusAsync(sectionId));
                //return Ok(await practiceService.UpdateStatusAsync(practiceId)); Cambios de Pablo
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
            //try
            //{
            //    var NoMoreSection = await practiceService.DeletePractice(sectionId, practiceId);
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
        */
    }
}
