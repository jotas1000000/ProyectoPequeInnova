using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Models;
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

        [HttpPost("Assignment")]
        public async Task<IActionResult> postAssignment([FromBody] AssignmentModel assignment)
        {
            if (ModelState.IsValid)
            {
                var result = await service.postAssignment(assignment);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        [HttpGet("Assignment")]
        public async Task<IActionResult> getAssignments()
        {
            if (ModelState.IsValid)
            {
                var result = await service.GetAssignments();
                if (result != null)
                {
                    return Ok(result);
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }

        [HttpPut("Assignment/{assignmentId:int}/DeleteAssignment")]
        public async Task<IActionResult> deleteAssignment(int assignmentId)
        {
            if (ModelState.IsValid)
            {
                var result = await service.deleteAssginment(assignmentId);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }

        [HttpGet("UsersComments")]
        public async Task<IActionResult> GetUsersComments()
        {
            if (ModelState.IsValid)
            {
                var result = await service.GetUsersComments();

                if (result != null)
                {
                    return Ok(result);
                }

                return BadRequest(result);
            }

            return BadRequest("Some properties are not valid");
        }

        [HttpPost("CreateComment")]
        public async Task<IActionResult> postComments([FromBody] CommentModel comment)
        {
            if (ModelState.IsValid)
            {
                var result = await service.postComment(comment);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }

        [HttpPut("{userId:regex(^\\d{{8}}-\\d{{4}}-\\d{{4}}-\\d{{4}}-\\d{{12}}$)}/DeleteComment/{commentId:int}")]
        public async Task<IActionResult> deleteComment(string userId, int commentId)
        {
            if (ModelState.IsValid)
            {
                var result = await service.deleteComment(userId, commentId);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        
    }
}
