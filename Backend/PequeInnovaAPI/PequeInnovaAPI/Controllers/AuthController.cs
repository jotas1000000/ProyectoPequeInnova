using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models.Auth;
using PequeInnovaAPI.Models.ModelsRequests;
using Microsoft.AspNetCore.Authorization;
using PequeInnovaAPI.Services;

namespace PequeInnovaAPI.Controllers
{
    [Authorize(Roles = "Profesor, Estudiante, Administrador")]
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

        [AllowAnonymous]
        [HttpPost("UserStudent")]
        public async Task<IActionResult> CreateUserStudentAsync([FromBody]  RegisterStudentModel model)
        {
            if (ModelState.IsValid)
            {
                var Result = await Service.RegisterUserStudentAsync(model);
                if (Result.IsSuccess)
                {
                    return Ok(Result);
                }
                return Ok(Result);

            }
            return BadRequest("No se pudo registrar. Algo estuvo mal!");
        }
        [AllowAnonymous]
        [HttpPut("{userId:maxlength(38)}/EditUserStudent")]
        public async Task<IActionResult> updateUser(string userId,[FromBody]  RegisterStudentModel model)
        {
            if (ModelState.IsValid)
            {
                var Result = await Service.updateUser(userId,model);
                if (Result)
                {
                    return Ok(Result);
                }
                return Ok(Result);

            }
            return BadRequest("No se pudo registrar. Algo estuvo mal!");
        }
        [Authorize(Roles = "Administrador")]
        [HttpPost("UserTeacher")]
        public async Task<IActionResult> CreateUserTeacherAsync([FromBody] RegisterTeacherModel model)
        {
            if (ModelState.IsValid)
            {
                var Result = await Service.RegisterUserTeacherAsync(model);
                if (Result.IsSuccess)
                {
                    return Ok(Result);
                }
                return BadRequest(Result);

            }
            return BadRequest("No se pudo registrar. Algo estuvo mal!");
        }
        //[Authorize(Roles = "Administrador")]
        [AllowAnonymous]//Peligro
        [HttpPost("UserAdmin")]
        public async Task<IActionResult> CreateUserAdminAsync([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var Result = await Service.RegisterUserAdminAsync(model);
                if (Result.IsSuccess)
                {
                    return Ok(Result);
                }
                return BadRequest(Result);

            }
            return BadRequest("No se pudo registrar. Algo estuvo mal!");
        }

        [AllowAnonymous]//Peligro
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
        [AllowAnonymous]//Peligro
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
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> LoginAsync([FromBody]LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await Service.LoginUserAsync(model);

                if (result.Name != "")
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid");
        }
        [AllowAnonymous]//Peligro
        [HttpGet("Users")]
        public async Task<IActionResult> GetUsersRoles()
        {
            if (ModelState.IsValid)
            {
                var result = await Service.GetUsersRoles();

                if (result!=null)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid");
        }

        
    }
}