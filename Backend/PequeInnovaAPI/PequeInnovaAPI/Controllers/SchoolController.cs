using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Routing;
using PequeInnovaAPI.Models;
using Microsoft.AspNetCore.Http;
using PequeInnovaAPI.Models.ModelsRequests;
using PequeInnovaAPI.Exceptions;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/[Controller]")]
    public class SchoolController : ControllerBase
    {
        private ISchoolService schoolService;
        public SchoolController(ISchoolService schoolService)
        {
            this.schoolService = schoolService;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<School>>> Get(string orderBy = "Id")
        {
            try
            {
                return Ok(await schoolService.GetSchoolAsync(orderBy));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Something bad happened: {ex.Message}");

            }
        }
        [HttpGet("{schoolID:int}")]
        public async Task<ActionResult<School>> Get(int schoolID)
        {
            try
            {
                var school = await this.schoolService.GetSchoolAsync(schoolID);
                return Ok(school);

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
        [HttpPost]
        public async Task<ActionResult<School>> Post([FromBody] School school)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newSchool = await this.schoolService.CreateSchoolAsync(school);
            return Created($"/api/school/{newSchool.Id}", newSchool);
        }

        [HttpPut("{schoolID:int}/status")]
        public async Task<ActionResult<bool>> Delete(int schoolID)
        {
            try
            {
                return Ok(await schoolService.UpdateStatusAsync(schoolID));
            }
            catch
            {
                throw new Exception("Not possible to show");
            }

        }
        [HttpPut("{schoolID}")]
        public async Task<ActionResult<School>> Update(int schoolID, [FromBody] School school)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var schoolUpdated = await this.schoolService.UpdateSchoolAsync(schoolID, school);
                return Ok(schoolUpdated);
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Something bad happened: {ex.Message}");
            }
        }
    }
}