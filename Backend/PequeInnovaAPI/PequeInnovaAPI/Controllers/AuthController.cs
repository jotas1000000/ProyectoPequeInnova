using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models.Auth;
using PequeInnovaAPI.Services;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService Service;
        public AuthController(IUserService Service)
        {
            this.Service = Service;
        }
        [HttpPost("User")]
        public async Task<IActionResult> CreateUserAsync([FromBody] RegisterViewModel RegisterView)
        {
            if (ModelState.IsValid)
            {
                var Result = await Service.RegisterUserAsync(RegisterView);
                if (Result.IsSuccess)
                {
                    return Ok(Result);
                }
                return BadRequest(Result);

            }
            return BadRequest("No se pudo registrar. Algo estuvo mal!");
        }

        [HttpPost("Role")]
        public async Task<IActionResult> CreateRoleAsync([FromBody] CreateRoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await Service.CreateRoleAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid");
        }

        [HttpPost("UserRole")]
        public async Task<IActionResult> CreateUserRole([FromBody] CreateUserRoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await Service.CreateUserRoleAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }
            return BadRequest("Some properties are not valid");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await Service.LoginUserAsync(model);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid");
        }
    }
}