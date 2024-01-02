const API_URL = "http://localhost:8000/api";

export const API = {
  INTERNSHIP_PROCESS: {
    INIT: `${API_URL}/internship-process/init`,
    GET_ALL: `${API_URL}/internship-process/get-all`,
    GET: (processId) =>
      `${API_URL}/internship-process/get?processId=${processId}`,
    GET_STUDENT_ALL_PROCESSES: (studentId) =>
      `${API_URL}/internship-process/get-student-all-processes?studentId=${studentId}`,
    UPDATE: `${API_URL}/internship-process/update`,
    DELETE: (processId) =>
      `${API_URL}/internship-process/delete?internshipProcessID=${processId}`,
    START_APPROVAL_PROCESS: (processId) =>
      `${API_URL}/internship-process/start?processId=${processId}`,
    EVALUATE: `${API_URL}/internship-process/evaluate`,
    CANCEL: (processId) =>
      `${API_URL}/internship-process/cancel?processId=${processId}`,
    EXTENSION: `${API_URL}/internship-process/extension`,
    LOAD_REPORT: `${API_URL}/internship-process/load-report`,
    GET_ASSIGNED_PROCESS: `${API_URL}/internship-process/get-assigned-process`,
    GET_ALL_PROCESS_ASSIGNED: (academicianId) =>
      `${API_URL}/internship-process/get-all-process-assigned?academicianId=${academicianId}`,
  },
  STUDENT: {
    REGISTER: `${API_URL}/student/auth/register`,
    LOGIN: `${API_URL}/student/auth/login`,
    FORGOT_PASSWORD: `${API_URL}/student/auth/forgotPassword`,
    RESET_PASSWORD: `${API_URL}/student/auth/resetPassword`,
  },
  ACADEMICIAN: {
    REGISTER: `${API_URL}/academician/auth/register`,
    LOGIN: `${API_URL}/academician/auth/login`,
    GET_ALL: `${API_URL}/academician/get-all`,
    GET_ALL_NOT_PAGEABLE: `${API_URL}/academician/get-all-not-pageable`,
    VALIDATE: `${API_URL}/academician/validate`,
    ASSIGN_DEPARTMENT: `${API_URL}/academician/assign-department`,
    ASSIGN_TASK_ONLY: `${API_URL}/academician/assignTaskOnly`,
    ASSIGN_TASK: `${API_URL}/academician/assignTask`,
  },
  COMPANY: {
    ADD: `${API_URL}/company/addCompany`,
    UPDATE: `${API_URL}/company/updateCompany`,
    GET: `${API_URL}/company/getCompany`,
    GET_ALL: `${API_URL}/company/getAll`,
  },
  HOLIDAY: {
    IS_HOLIDAY_EXISTS_BY_DATE: `${API_URL}/holiday/isHolidayExistsByDate`,
    ADD_HOLIDAY: `${API_URL}/holiday/addHoliday`,
    IS_GIVEN_WORK_DAY_TRUE: `${API_URL}/holiday/isGivenWorkDayTrue`,
  },
  COMPANY_STAFF: {
    ADD: `${API_URL}/staff/addCompanyStaff`,
    UPDATE: `${API_URL}/staff/updateCompanyStaff`,
    GET_ALL_BY_COMPANY: `${API_URL}/staff/getAllByCompany`,
  },
};
