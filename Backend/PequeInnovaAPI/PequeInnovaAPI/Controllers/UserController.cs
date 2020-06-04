using Microsoft.AspNetCore.Mvc;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Models.ModelsRequests;
using PequeInnovaAPI.Services;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class UserController : ControllerBase
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
                if (result != null)
                {
                    return Ok(result);
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        [HttpPut("{userId:maxlength(38)}/DeleteUser")]
        public async Task<IActionResult> deleteUser(string userId)
        {
            if (ModelState.IsValid)
            {
                var result = await service.deleteUser(userId);
                if (result)
                {
                    return Ok(Tuple.Create(result));
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

        [HttpGet("Students")]
        public async Task<IActionResult> GetStudents()
        {
            if (ModelState.IsValid)
            {
                var result = await service.getStudents();

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
                if (result != null)
                {
                    return Created("api/",result);
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }

        [HttpPut("{userId:maxlength(38)}/DeleteComment/{commentId:int}")]//regex(^[[a-z]]{{8}}-[[a-z]]{{4}}-[[a-z]]{{4}}-[[a-z]]{{4}}-[[a-z]]{{12}}$)
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


        [HttpPut("UpdateStudent")]
        public async Task<IActionResult> updateStudent([FromBody] UpdateStudent student)
        {
            if (ModelState.IsValid)
            {
                var result = await service.updateStudent(student);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }

        [HttpPut("UpdateTeacher")]
        public async Task<IActionResult> updateTeacher([FromBody] UpdateTeacher teacher)
        {
            if (ModelState.IsValid)
            {
                var result = await service.updateTeacher(teacher);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        
        [HttpGet("Inscriptions")]
        public async Task<IActionResult> getInscriptions()
        {
            if (ModelState.IsValid)
            {
                var result = await service.GetInscriptions();
                if (result!= null)
                {
                    return Ok(result);
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        
        
        [HttpPut("ApproveInscription/{inscriptionId:int}")]
        public async Task<IActionResult> approveInscription(int inscriptionId)
        {
            if (ModelState.IsValid)
            {
                var result = await service.approveInscription(inscriptionId);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        
        
        [HttpPut("DeleteInscription/{inscriptionId:int}")]
        public async Task<IActionResult> deleteInscription(int inscriptionId)
        {
            if (ModelState.IsValid)
            {
                var result = await service.deleteInscription(inscriptionId);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }


        [HttpPost("CreateInscription")]
        public async Task<IActionResult> postInscription([FromBody] InscriptionModel inscription)
        {
            if (ModelState.IsValid)
            {
                var result = await service.postInscription(inscription);
                if (result)
                {
                    return Ok(Tuple.Create(result));
                }
            }

            return BadRequest("Algo salio mal en la peticion");
        }
        
    }
}
