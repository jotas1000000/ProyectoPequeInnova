using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PequeInnovaAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public class UserService : IUserService
    {
        private UserManager<IdentityUser> UserManager;
        private RoleManager<IdentityRole> RoleManager;
        private IConfiguration configuration;

        public UserService(UserManager<IdentityUser> UserManager, RoleManager<IdentityRole> RoleManager, IConfiguration configuration)
        {
            this.UserManager = UserManager;
            this.RoleManager = RoleManager;
            this.configuration = configuration;
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
                    Message = "Role does not exist",
                    IsSuccess = false
                };
            }

            var user = await UserManager.FindByIdAsync(model.UserId);
            if (role == null)
            {
                return new UserManagerResponse
                {
                    Message = "user does not exist",
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

        public async Task<UserManagerResponse> LoginUserAsync(LoginViewModel model)
        {
            var user = await UserManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return new UserManagerResponse
                {
                    Message = "No hay un usuario registrado con ese Email",
                    IsSuccess = false,
                };
            }

            var result = await UserManager.CheckPasswordAsync(user, model.Password);

            if (!result)
                return new UserManagerResponse
                {
                    Message = "Algo anda mal en el Email o contraseña",
                    IsSuccess = false,
                };

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

            return new UserManagerResponse
            {
                Message = tokenAsString,
                IsSuccess = true,
                ExpireDate = token.ValidTo
            };
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

            var identityUser = new IdentityUser
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
    }
}
