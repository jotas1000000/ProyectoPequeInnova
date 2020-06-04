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
        Task<UserManagerResponse> RegisterUserAdminAsync(RegisterViewModel model);


        Task<UserManagerResponse> CreateRoleAsync(CreateRoleViewModel model);

        //Task<UserManagerResponse> LoginUserAsync(LoginViewModel model);
        Task<UserTokenResponse> LoginUserAsync(LoginViewModel model);
        Task<UserManagerResponse> CreateUserRoleAsync(CreateUserRoleViewModel model);
        Task<bool> CreateUserRoleAsync(string Id,string TypeUser);

        Task<List<GetUsersRoles>> GetUsersRoles();
        Task<List<ApplicationUser>> GetUsersComments();

        Task<List<GetTeachersModel>> GetTeachers();

        Task<IEnumerable<AssignmentRequestModel>> GetAssignments();
        Task<AssignmentRequestModel> getAssignment(string userId);
        Task<bool> postAssignment(AssignmentModel assignment);
        Task<bool> deleteAssginment(int id);
        Task<IEnumerable<TeacherAssignmentModel>> getTeacherForAssignment();

        Task<CommentModel> postComment(CommentModel comment);
        Task<bool> deleteComment(string userId, int commentId);

        Task<bool> deleteUser(string userId);

        Task<IEnumerable<GetStudentsModel>> getStudents();

        Task<bool> updateStudent(UpdateStudent student);
        Task<bool> updateTeacher(UpdateTeacher teacher);
        
        //Inscriptions
        Task<IEnumerable<InscriptionRequestModel>> GetInscriptions();
        Task<bool> approveInscription(int inscriptionId);
        Task<bool> postInscription(InscriptionModel inscription);
        Task<bool> deleteInscription(int id);
        Task<IEnumerable<InscriptionRequestModel>> getInscriptionsUser(string userId);
        Task<GetTeachersModel> GetTeacher(string userId);

    }
}
