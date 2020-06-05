using PequeInnovaAPI.Data.Entity;
using PequeInnovaAPI.Models.ModelsRequests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ubiety.Dns.Core;

namespace PequeInnovaAPI.Data.Repository
{
    public interface IPequeInnovaRepository
    {
        //User
            //Assignment
        void postAssignment(AssignmentEntity assignment);
        Task deleteAssginment(int id);
        Task<IEnumerable<AssignmentRequestModel>> GetAssignments();
        Task<AssignmentRequestModel> getAssignment(string userId);
        Task<IEnumerable<TeacherAssignmentModel>> getTeacherForAssignment();
        Task putAssignment(int assignmentId, AssignmentEntity assignment);

        //Comments
        void postComment(CommentEntity comment);
        Task deleteComment(string userId, int commentId);
            //User
        Task deleteUser(string userId);
        Task<IEnumerable<GetStudentsModel>> getStudents();
        Task updateStudent(UpdateStudent student);
        Task updateTeacher(UpdateTeacher teacher);
        //Incription
        Task<IEnumerable<InscriptionRequestModel>> GetInscriptions();
        Task approveInscription(int inscriptionId);
        void postInscription(InscriptionEntity inscription);
        Task deleteInscription(int id);
        Task<InscriptionEntity> GetInscription(int courseId, string userId);
        Task<IEnumerable<InscriptionRequestModel>> getInscriptionsUser(string userId);




        //areas
        Task<AreaEntity> GetAreaAsync(int id, bool mostrarCursos = true);
        Task<IEnumerable<AreaEntity>> GetAreas(string orderBy = "id", bool mostrarCursos = true);
        Task DeleteAreaAsync(int id);
        Task UpdateAreaAsync(AreaEntity area);
        void AddAreaAsync(AreaEntity area);
        void UpdateStatus(int areaId);

        //cursos
        Task<IEnumerable<CourseEntity>> GetCourse(int areaId);
        Task<IEnumerable<CourseEntity>> GetAllCourses();
        Task<CourseEntity> GetCoursesAsync(int id, bool mostrarArea = false);
        void AddCourse(CourseEntity curso);
        Task UpdateCourse(CourseEntity curso);
        Task DeleteCourses(int id);
        void UpdateStatusCourse(int courseId);
        Task<CourseEntity> GetCourserforEdit(int areaId, int id);
        Task<IEnumerable<CourseEntity>> getCoursesByOwner(string userId);



        void PostCourseComplete(CourseEntity courseComplete);
        void PostLessonComplete(LessonEntity lessonComplete);
        void PostQuestionComplete(QuestionEntity questionComplete);

        //seccion
        Task<IEnumerable<SectionEntity>> GetSection(int courseId);
        Task<CourseEntity> GetCourseAsync(int id, bool mostrarCourse= false);
        void AddSection(SectionEntity section);
        Task UpdateSection(SectionEntity section);
        Task DeleteSection(int id);
        void UpdateStatusSection(int secctionId);

        //Teachings
        void postTeaching(TeachingEntity teaching);
        Task<IEnumerable<TeachingEntity>> getTeachings();

        //leccion
        Task<LessonEntity> GetLessonAsync(int lessonId,int courseId, int areaId, bool showComments, bool showQuestions);
        Task<IEnumerable<LessonEntity>> GetLessonsAsync(int courseId, int areaId, bool showComments, bool showQuestions);
        void AddLessonAsync(LessonEntity lesson);
        //Task UpdateLesson(LessonEntity lesson);
        Task DeleteLesson(int id);
        void UpdateStatusLesson(int lessonId);
        Task<List<QuestionLessonMutedEntity>> GetQuestionsOnly(int lessonId, int courseId, int areaId);
        Task UpdateLessonAsync(int courseId, int id, LessonEntity lesson);

        //practica
        Task<IEnumerable<PracticeEntity>> GetPractice(int sectionId);
        Task<PracticeEntity> GetPracticesAsync(int id, bool mostrarSection= false);
        void AddPractice(PracticeEntity practice);
        Task UpdatePractice(PracticeEntity practice);
        Task DeletePractice(int id);
        void UpdateStatusPractice(int practiceId);

        //Question
        Task<IEnumerable<QuestionEntity>> getQuestionAsync(int areaId, int courseId, int lessonId);
        void postQuestionAsync(int areaId, int courseId, int lessonId, QuestionEntity question);
        Task putQuestionAsync(int areaId, int courseId, int lessonId, QuestionEntity question, int questionId);
        Task DeleteQuestionAsync(int areaId, int courseId, int lessonId, int questionId);

        //colegio
        Task<SchoolEntity> GetSchoolAsync(int id);
        Task<IEnumerable<SchoolEntity>> GetSchools(string orderBy = "id");
        Task UpdateSchoolAsync(SchoolEntity school);
        void AddSchoolAsync(SchoolEntity school);
        void UpdateStatusSchool(int schoolId);

        //esto que no recuerdo
        void DetachEntity<t>(t entity) where t : class;
        Task<bool> SaveChangesAsync();

        Task ValidateArea(int areaId);
        Task ValidateCourse(int courseId);
        Task ValidateLesson(int lessonId, int courseId, int areaId);
    }
}
