// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  root: 'http://localhost:3000',
  authenticate: 'http://localhost:3000/authenticate',
  sendMail:'http://localhost:3000/sendMail',
  activate: 'http://localhost:3000/activate/user',
  register: 'http://localhost:3000/signup',
  getAllEmployees: 'http://localhost:3000/employees',
  getEmployee: 'http://localhost:3000/employee',
  profilepic: 'http://localhost:3000/',
  profile: 'http://localhost:3000/profile',
  uploadStudentList: 'http://localhost:3000/upload/studentList',
  getStudentList: 'http://localhost:3000/get/students',
  updateAssignedStudents: 'http://localhost:3000/updateAssignedStudents',
  getAssignedStudents: 'http://localhost:3000/get/assignedStudents',
  calenderEvent: 'http://localhost:3000/calenderEvent',
  todo: 'http://localhost:3000/todo',
  getStudent: 'http://localhost:3000/getStudentByEmail',
  updateStudent: 'http://localhost:3000/enquiryStudentUpdate',
  registerStudent: 'http://localhost:3000/registerStudent',
  testtwilio:'http://localhost:3000/testtwilio'
};
