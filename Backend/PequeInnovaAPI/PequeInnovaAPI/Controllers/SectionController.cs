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
    [Route("api/area/{areaID:int}/courses/{courseID:int}/sections")]
    public class SectionController : ControllerBase
    {
        private ISectionService sectionService;
        public SectionController(ISectionService sectionService)
        {
            this.sectionService = sectionService;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Section>>> getSections(int courseID)
        {
            try
            {
                return Ok(await sectionService.GetSection(courseID));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }

        }

        [HttpPost()]
        public async Task<ActionResult<Section>> PostSection(int courseID, [FromBody] Section section)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newSection = await sectionService.AddSectionAsync(courseID, section);
                return Created($"/api/area/courses/{courseID}/sections/{section.Id}", newSection);
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

        [HttpGet("{sectionId:int}")]
        public async Task<ActionResult<Section>> getSection(int areaId, int sectionId)
        {
            try
            {
                var section = await sectionService.GetSectionAsync(areaId, sectionId);
                return Ok(section);
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
        [HttpPut("{sectionId:int}/status")]
        public async Task<ActionResult<bool>> DeleteSection(int sectionId)
        {
            try
            {
                return Ok(await sectionService.UpdateStatusAsync(areaId));
                //return Ok(await sectionService.UpdateStatusAsync(sectionId)); Cambios de Pablo
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
            //try
            //{
            //    var NoMoreSection = await sectionService.DeleteSection(areaId, sectionId);
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



        [HttpPut("{sectionId:int}")]
        public async Task<ActionResult<Section>> PutSection(int areaId, int sectionId, [FromBody] Section section)
        {
            try
            {
                return Ok(await sectionService.UpdateSectionAsync(areaId, sectionId, section));
            }
            catch
            {
                throw new Exception("Not possible to show");
            }
        }
    }
}
