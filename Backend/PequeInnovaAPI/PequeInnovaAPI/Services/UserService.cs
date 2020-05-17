using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PequeInnovaAPI.Data;
using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Data.Repository;
using PequeInnovaAPI.Models;
using PequeInnovaAPI.Models.Auth;
using PequeInnovaAPI.Models.ModelsRequests;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public class AuxiliarClass
    {
        public string aux1 { get; set; }
        public string aux2 { get; set; }

    }
    public class UserService : IUserService
    {
        private UserManager<ApplicationUser> UserManager;
        private RoleManager<IdentityRole> RoleManager;
        private ApiDbContext dbcontext;
        private IConfiguration configuration;
        private IPequeInnovaRepository repository;
        private IMapper mapper;

        
        public UserService(UserManager<ApplicationUser> UserManager, RoleManager<IdentityRole> RoleManager, IConfiguration configuration,
            ApiDbContext Dbcontext, IPequeInnovaRepository repository, IMapper mapper)
        {
            this.UserManager = UserManager;
            this.RoleManager = RoleManager;
            this.configuration = configuration;
            this.dbcontext = Dbcontext;
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<bool> approveInscription(int inscriptionId)
        {
            //Validar Inscription
            await repository.approveInscription(inscriptionId);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<UserManagerResponse> CreateRoleAsync(CreateRoleViewModel model)
        {
            var identityRole = new IdentityRole()
            {
                Name = model.Name,
                NormalizedName = model.NormalizedName
            };

            var result = await RoleManager.CreateAsync(identityRole);

            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Message = "El Rol ha sido creado",
                    IsSuccess = true,
                };
            }

            return new UserManagerResponse
            {
                Message = "El Rol no ha sido creado",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task<UserManagerResponse> CreateUserRoleAsync(CreateUserRoleViewModel model)
        {
            var role = await RoleManager.FindByIdAsync(model.RoleId);
            if (role == null)
            {
                return new UserManagerResponse
                {
                    Message = "El Rol no existe",
                    IsSuccess = false
                };
            }

            var user = await UserManager.FindByIdAsync(model.UserId);
            if (role == null)
            {
                return new UserManagerResponse
                {
                    Message = "El usuario no existe",
                    IsSuccess = false
                };
            }

            if (await UserManager.IsInRoleAsync(user, role.Name))
            {
                return new UserManagerResponse
                {
                    Message = "user has role already",
                    IsSuccess = false
                };
            }

            var result = await UserManager.AddToRoleAsync(user, role.Name);

            if (result.Succeeded)
            {
                return new UserManagerResponse
                {
                    Message = "Role assigned",
                    IsSuccess = true
                };
            }

            return new UserManagerResponse
            {
                Message = "something went wrong",
                IsSuccess = false
            };
        }

        public async Task<bool> CreateUserRoleAsync(string Id,string TypeUSer)
        {
            var role = await RoleManager.FindByNameAsync(TypeUSer);
            if (role == null)
            {
                return false;
            }

            var user = await UserManager.FindByIdAsync(Id);
            if (role == null)
            {
                return false;
            }

            if (await UserManager.IsInRoleAsync(user, role.Name))
            {
                return false;
            }

            var result = await UserManager.AddToRoleAsync(user, role.Name);

            if (result.Succeeded)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> deleteAssginment(int id)
        {
            await repository.deleteAssginment(id);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> deleteComment(string userId, int commentId)
        {
            await repository.deleteComment(userId, commentId);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> deleteInscription(int id)
        {
            //Validar Inscription
            await repository.deleteInscription(id);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> deleteUser(string userId)
        {
            //falta validar existencia de User
            await repository.deleteUser(userId);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<AssignmentRequestModel>> GetAssignments()
        {
            return await repository.GetAssignments();
        }

        public async Task<IEnumerable<InscriptionRequestModel>> GetInscriptions()
        {
            var inscriptionsEntity = await repository.GetInscriptions();
            return inscriptionsEntity;
        }

        public async Task<IEnumerable<GetStudentsModel>> getStudents()
        {
            return await repository.getStudents();
         }

        public async Task<List<GetTeachersModel>> GetTeachers()
        {
            var query = await (from u in dbcontext.Users
                               join ur in dbcontext.UserRoles on u.Id equals ur.UserId
                               join r in dbcontext.Roles on ur.RoleId equals r.Id
                               where r.NormalizedName == "PROFESOR" && u.Status == true
                               select new GetTeachersModel
                               {
                                   Id = u.Id,
                                   Name = u.Name,
                                   LastName = u.LastName,
                                   RoleName = r.Name,
                                   City = u.City,
                                   Degree = u.Degree,
                                   Email = u.Email
                               }
                               ).AsNoTracking().ToListAsync();

            return query;
        }

        public async Task<List<ApplicationUser>> GetUsersComments()
        {
            IQueryable<ApplicationUser> q = dbcontext.Users;
            q = q.AsNoTracking();
            q = q.Include(c => c.Comments);
            return await q.ToListAsync();
        }

        public async Task<List<GetUsersRoles>> GetUsersRoles()
        {
           // string id = "8b5cb740-8004-4d29-828b-122206aa3d39";
            var query = await (from u in dbcontext.Users
                               join ur in dbcontext.UserRoles on u.Id equals ur.UserId
                               join r in dbcontext.Roles on ur.RoleId equals r.Id
                               where u.Status == true
                               select new GetUsersRoles
                               {
                                   Id = u.Id,
                                   Name = u.Name,
                                   RoleName = r.Name
                               }).AsNoTracking().ToListAsync();

           /* var query2 = await dbcontext.Users
                              .Join(dbcontext.UserRoles,
                              u => u.Id,
                              p => p.UserId,
                              (u, p) => new { u, p })
                              .Join(dbcontext.Roles,
                              us => us.p.RoleId,
                              r => r.Id,
                              (u2, r) => new { u2, r }
                              ).Select(usr => new GetUsersRoles
                              {
                                  Id = usr.u2.u.Id,
                                  Name = usr.u2.u.Name,
                                  RoleName = usr.r.Name
                              }).AsNoTracking().ToListAsync();*/


                     return query;
        }

       
        public async Task<UserTokenResponse> LoginUserAsync(LoginViewModel model)
        {
            var user = await UserManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                throw new Exception("No se enviaron datos");
                /* return new UserManagerResponse
                 {
                     Message = "No hay un usuario registrado con ese Email",
                     IsSuccess = false,
                 };*/
            }

            var result = await UserManager.CheckPasswordAsync(user, model.Password);

            if (!result)
            {
                /* return new UserManagerResponse
                 {
                     Message = "Algo anda mal en el Email o contraseña",
                     IsSuccess = false,
                 };*/

                throw new Exception("El correo o la contraseña son incorrectos");

            }

            var roles = await UserManager.GetRolesAsync(user);

            var claims = new List<Claim>()
            {
                new Claim("Email", model.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AuthSettings:Key"]));

            var token = new JwtSecurityToken(
                issuer: configuration["AuthSettings:Issuer"],
                audience: configuration["AuthSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

            string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            /*   return new UserManagerResponse
               {
                   Message = tokenAsString,
                   IsSuccess = true,
                   ExpireDate = token.ValidTo
               };*/

            return new UserTokenResponse
            {
                Name = user.Name,
                LastName = user.LastName,
                Role = roles.FirstOrDefault(),
                Password = user.PasswordHash,
                Token = tokenAsString
            };

        }

        public async Task<bool> postAssignment(AssignmentModel assignment)
        {
            await repository.ValidateArea(assignment.AreaId);
            //falta validar existencia de teacher
            assignment.Id = null;
            assignment.CreateDate = DateTime.Now;
            assignment.UpdateDate = DateTime.Now;
            assignment.State = true;
            assignment.Status = true;
            var assignmentEntity = mapper.Map<AssignmentEntity>(assignment);
            repository.postAssignment(assignmentEntity);
            await repository.SaveChangesAsync();
            return true;

        }

        public async Task<CommentModel> postComment(CommentModel comment)
        {
            comment.Id = null;
            comment.CommentDate = DateTime.Now;
            comment.UpdateDate = DateTime.Now;
            comment.CreateDate = DateTime.Now;
            comment.State = true;
            comment.Status = true;
            var commentEntity = mapper.Map<CommentEntity>(comment);
            repository.postComment(commentEntity);
            await repository.SaveChangesAsync();
            return mapper.Map<CommentModel>(comment);
        }

        public async Task<bool> postInscription(InscriptionModel inscription)
        {
            inscription.Id = null;
            inscription.State = false;
            inscription.Status = true;
            inscription.UpdateDate = DateTime.Now;
            inscription.CreateDate = DateTime.Now;
            var inscriptionEntity = mapper.Map<InscriptionEntity>(inscription);
            repository.postInscription(inscriptionEntity);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model)
        {
            if (model==null)
            {
                throw new NullReferenceException("model is null");
            }
            if (model.Password!=model.ConfirmPassword)
            {
                return new UserManagerResponse()
                {
                    Message = "Confirm password doesn't match password",
                    IsSuccess = false
                };
            }

            var identityUser = new ApplicationUser//Cambiar esto despues por application user
            {
                Email = model.Email,
                UserName=model.UserName
            };

            var result =await UserManager.CreateAsync(identityUser,model.Password);
            if (result.Succeeded)
            {
                return new UserManagerResponse()
                {
                    Message= "User created successfully!",
                    IsSuccess=true
                };
            }

            return new UserManagerResponse()
            {
                Message = "El usuario no pudo ser creado",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task<UserManagerResponse> RegisterUserStudentAsync(RegisterStudentModel model)
        {
            if (model == null)
            {
                throw new NullReferenceException("No se enviaron datos");
            }
            if (model.Password != model.ConfirmPassword)
            {
                return new UserManagerResponse()
                {
                    Message = "Las contraseñas no coinciden",
                    IsSuccess = false
                };
            }
            var q = await UserManager.Users.Select(c => c.Id).AsNoTracking().ToListAsync();
            if (q.Count!=0 )
            {
                if (await UserManager.FindByEmailAsync(model.Email)!=null)
                {
                    return new UserManagerResponse()
                    {
                        Message = "Ya hay un usuario registrado con ese Email",
                        IsSuccess = false
                    };
                }                
            }
           var applicationUser = new ApplicationUser
            {
                Name = model.Name,
                LastName = model.LastName,
                UserName = model.UserName,
                Birthday = model.Birthday,
                School = model.School,
                Grade = model.Grade,
                Age = model.Age,
                Email = model.Email,
                Uid = model.Uid,
                State = true,
                Status = true,
                UpdateDate = DateTime.Now,
                CreateDate = DateTime.Now
            };
         /*   if (q.Count==0)
            {
                applicationUser.Id = "";
                dbcontext.Users.Add(applicationUser);
            }*/
            var result = await UserManager.CreateAsync(applicationUser, model.Password);
                                  
            if (result.Succeeded)
            {
                List<AuxiliarClass> query = await (from u in dbcontext.Users
                                               where u.Email == applicationUser.Email &&
                                                     u.Name == applicationUser.Name
                                               select new AuxiliarClass
                                               {
                                                   aux1 = u.Id
                                               }).AsNoTracking().ToListAsync();

                bool resp=await CreateUserRoleAsync(query.FirstOrDefault().aux1,"Estudiante");

                if (!resp)
                {
                    return new UserManagerResponse()
                    {
                        Message = "Algo salio mal, no se pudo asignar el rol de estudiante. Pero el Usuario se pudo crear.",
                        IsSuccess = true
                    };
                } else
                {
                    return new UserManagerResponse()
                    {
                        Message = "Usuario creado correctamente!",
                        IsSuccess = true
                    };                    
                }
            }

            return new UserManagerResponse()
            {
                Message = "El usuario no pudo ser creado",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };

        }

        public async Task<UserManagerResponse> RegisterUserTeacherAsync(RegisterTeacherModel model)
        {
            if (model == null)
            {
                throw new NullReferenceException("No se enviaron datos");
            }
            if (model.Password != model.ConfirmPassword)
            {
                return new UserManagerResponse()
                {
                    Message = "Las contraseñas no son iguales",
                    IsSuccess = false
                };
            }
            if (await UserManager.FindByEmailAsync(model.Email) != null)
            {
                return new UserManagerResponse()
                {
                    Message = "Ya hay un usuario registrado con ese Email",
                    IsSuccess = false
                };
            }
            var applicationUser = new ApplicationUser
            {
                Name = model.Name,
                LastName = model.LastName,
                UserName = model.UserName,
                Birthday = model.Birthday,
                Degree = model.Degree,
                City = model.City,
                Email = model.Email,
                Uid = model.Uid,
                State = true,
                Status = true,
                UpdateDate = DateTime.Now,
                CreateDate = DateTime.Now
            };
            
            var result = await UserManager.CreateAsync(applicationUser, model.Password);
           
            if (result.Succeeded==true)
            {
                List<AuxiliarClass> query = await (from u in dbcontext.Users
                                                   where u.Email == applicationUser.Email &&
                                                         u.Name == applicationUser.Name
                                                   select new AuxiliarClass
                                                   {
                                                       aux1 = u.Id
                                                   }).AsNoTracking().ToListAsync();

                bool resp = await CreateUserRoleAsync(query.FirstOrDefault().aux1,"Profesor");

                if (!resp)
                {
                    return new UserManagerResponse()
                    {
                        Message = "Algo salio mal, no se pudo asignar el rol de Maestro. Pero el Usuario se pudo crear.",
                        IsSuccess = true
                    };
                }
                else
                {
                    return new UserManagerResponse()
                    {
                        Message = "Usuario creado correctamente!",
                        IsSuccess = true
                    };
                }
            }

            return new UserManagerResponse()
            {
                Message = "El usuario no pudo ser creado",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };

        }

        public async Task<bool> updateStudent(UpdateStudent student)
        {
            //Validar Existencia de Student
            await repository.updateStudent(student);
            await repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> updateTeacher(UpdateTeacher teacher)
        {
            await repository.updateTeacher(teacher);
            await repository.SaveChangesAsync();
            return true;
         }
    }
}
