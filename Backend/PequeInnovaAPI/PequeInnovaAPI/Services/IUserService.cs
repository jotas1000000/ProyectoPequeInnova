using PequeInnovaAPI.Models;
using PequeInnovaAPI.Models.Auth;
using PequeInnovaAPI.Models.ModelsRequests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PequeInnovaAPI.Services
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterUserAsync(RegisterViewModel model);
        Task<UserManagerResponse> RegisterUserStudentAsync(RegisterStudentModel model);
        Task<UserManagerResponse> RegisterUserTeacherAsync(RegisterTeacherModel model);

        Task<UserManagerResponse> CreateRoleAsync(CreateRoleViewModel model);

        //Task<UserManagerResponse> LoginUserAsync(LoginViewModel model);
        Task<UserTokenResponse> LoginUserAsync(LoginViewModel model);
        Task<UserManagerResponse> CreateUserRoleAsync(CreateUserRoleViewModel model);
        Task<bool> CreateUserRoleAsync(string Id,string TypeUser);

        Task<List<GetUsersRoles>> GetUsersRoles();
        Task<List<ApplicationUser>> GetUsersComments();

        Task<List<GetTeachersModel>> GetTeachers();

        Task<IEnumerable<AssignmentRequestModel>> GetAssignments();
        Task<bool> postAssignment(AssignmentModel assignment);
        Task<bool> deleteAssginment(int id);

        Task<bool> postComment(CommentModel comment);
        Task<bool> deleteComment(string userId, int commentId);

    }
}
