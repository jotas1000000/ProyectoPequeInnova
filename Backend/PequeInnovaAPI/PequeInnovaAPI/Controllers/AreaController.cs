using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Routing;
using PequeInnovaAPI.Models;
using Microsoft.AspNetCore.Http;
using RestaurantAPI.Exceptions;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/[controller]")]
    public class AreaController : ControllerBase
    {
        private IAreaService areaService;
        private ICourseService courseService;
        public AreaController(IAreaService areaService, ICourseService courseService)
        {
            this.areaService = areaService;
            this.courseService = courseService;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> Get(string orderBy = "Id", bool showCourses= false)
        {
            try
            {
                return Ok(await areaService.GetAreasAsync(orderBy, showCourses));
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
        [HttpGet("allCuorses")]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            try
            {
                return Ok(await courseService.GetAllCourses());
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
        [HttpGet("{areaID:int}")]
        public async Task<ActionResult<Area>> Get(int areaID, bool showCoures= true)
        {
            try
            {
                var artista = await this.areaService.GetAreaAsync(areaID, showCoures);
                return Ok(artista);

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
        public async Task<ActionResult<Area>> Post([FromBody] Area area)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newArea= await this.areaService.CreateAreaAsync(area);
            return Created($"/api/areas/{newArea.Id}", newArea);
        }

        [HttpDelete("{areaID:int}")]
        public async Task<ActionResult<bool>> Delete(int areaID)
        {
            try
            {
                return Ok(await this.areaService.DeleteAreaAsync(areaID));
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

        [HttpPut("{areaID}")]
        public async Task<ActionResult<Area>> Update(int areaID, [FromBody] Area area)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var artistaUpdated = await this.areaService.UpdateAreaAsync(areaID, area);
                return Ok(artistaUpdated);
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
