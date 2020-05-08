using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UserController:ControllerBase
    {
        private IUserService service;
        public UserController(IUserService service)
        {
            this.service = service;
        }

        [HttpGet("Teachers")]
        public async Task<IActionResult> getTeachers()
        {
            if (ModelState.IsValid)
            {
                var result = await service.GetTeachers();
                if(result!=null)
                {
                    return Ok(result);
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }

    }
}
