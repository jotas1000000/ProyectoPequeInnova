using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace PequeInnovaAPI.Controllers
{
    [Authorize(Roles = "Profesor, Estudiante, Administrador")]
    [Route("api/[controller]")]
    public class TeachingController : ControllerBase
    {

        private ITeachingService service;
        public TeachingController(ITeachingService service)
        {
            this.service = service;
        }
        [Authorize(Roles = "Profesor, Administrador")]
        [HttpGet]
        public async Task<IActionResult> getTeachings()
        {
            try
            {
                return Ok(await service.getTeachings());
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
        [Authorize(Roles = "Profesor, Administrador")]
        [HttpPost]
        public async Task<IActionResult> postTeaching([FromBody] TeachingModel teaching)
        {
            try
            {
                var response = await service.postTeaching(teaching);
                return Created("api/response", response);
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
    }
}
