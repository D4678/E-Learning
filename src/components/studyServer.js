var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});
customers = [
  {
    custId: 1,
    name: "ABC",
    password: "abc1234",
    role: "admin",
    email: "abc@gmail.com",
  },
  {
    custId: 2,
    name: "Willie",
    password: "willie1234",
    role: "student",
    email: "willie@gmail.com",
  },
  {
    custId: 3,
    name: "Jack",
    password: "jack1234",
    role: "faculty",
    email: "jack@gmail.com",
  },
  {
    custId: 4,
    name: "James",
    password: "james1234",
    role: "student",
    email: "james@gmail.com",
  },
  {
    custId: 5,
    name: "Harry",
    password: "harry1234",
    role: "faculty",
    email: "harry@gmail.com",
  },
  {
    custId: 6,
    name: "Tia",
    password: "tia1234",
    role: "student",
    email: "tia@gmail.com",
  },
  {
    custId: 7,
    name: "Aditya",
    password: "aditya123",
    role: "faculty",
    email: "aditya@gmail.com",
  },
  {
    custId: 8,
    name: "Sonu",
    password: "sonu1234",
    role: "student",
    email: "sonu@gmail.com",
  },
  {
    custId: 9,
    name: "Ellie",
    password: "ellie1234",
    role: "student",
    email: "ellie@gmail.com",
  },
  {
    custId: 10,
    name: "Gia",
    password: "gia1234",
    role: "faculty",
    email: "gia@gmail.com",
  },
];
courses = [
  {
    courseId: 1,
    name: "ANGULAR",
    code: "ANG97",
    description: "All fundamentals of Angular 7",
    faculty: ["Daniel", "Jack"],
    students: ["Sam"],
  },
  {
    courseId: 2,
    name: "JAVASCRIPT",
    code: "JS124",
    description: "Intoduction to javascript",
    faculty: ["Aditya"],
    students: ["James", "Joy", "Monu", "Rita"],
  },
  {
    courseId: 3,
    name: "REACT",
    code: "RCT56",
    description: "React Javascript library",
    faculty: ["Jack", "Gia"],
    students: ["Raima", "Rita", "Sonu", "James"],
  },
  {
    courseId: 4,
    name: "BOOTSTRAP",
    code: "BS297",
    description: "Bootstrap Designing Framework",
    faculty: [],
    students: ["James", "Tia", "Ellie"],
  },
  {
    courseId: 5,
    name: "CSS",
    code: "CS365",
    description: "Basic stylesheet language",
    faculty: [],
    students: ["James", "Rita", "Monica"],
  },
  {
    courseId: 6,
    name: "REST AND MICROSERVICES",
    code: "RM392",
    description: "Introduction to Microservices",
    faculty: [],
    students: ["Sam"],
  },
  {
    courseId: 7,
    name: "NODE",
    code: "ND725",
    description: "Introduction to Node",
    faculty: ["Sonia"],
    students: ["Saransh", "Shrey", "Monica"],
  },
];
faculties = [
  { id: 5, name: "Daniel", courses: ["ANGULAR"] },
  { id: 4, name: "Sonia", courses: ["NODE"] },
  { id: 3, name: "Jack", courses: ["REACT", "ANGULAR"] },
  { id: 2, name: "Gia", courses: ["REACT"] },
  { id: 1, name: "Aditya", courses: ["ANGULAR"] },
];
classes = [
  {
    classId: 1,
    course: "REACT",
    time: "07:45",
    endTime: "08:45",
    topic: "Redux",
    facultyName: "Jack",
  },
  {
    classId: 2,
    course: "ANGULAR",
    time: "15:45",
    endTime: "17:40",
    topic: "Component",
    facultyName: "Jack",
  },
  {
    classId: 3,
    course: "JAVASCRIPT",
    time: "15:45",
    endTime: "17:40",
    topic: "Component",
    facultyName: "Aditya",
  },
];
students = [
  {
    id: 16,
    name: "Willie",
    dob: "31-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["ANGULAR", "NODE"],
  },
  {
    id: 15,
    name: "Tia",
    dob: "30-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: [],
  },
  {
    id: 14,
    name: "Apoorv",
    dob: "31-August-1998",
    gender: "male",
    about: "Want to learn new technologies",
    courses: [],
  },
  {
    id: 13,
    name: "Joy",
    dob: "31-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT"],
  },
  {
    id: 12,
    name: "Rachel",
    dob: "31-August-1998",
    gender: "female",
    about: "Pursuing Graduation",
    courses: [],
  },
  {
    id: 11,
    name: "Monica",
    dob: "30-July-1997",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["CSS", "NODE"],
  },
  {
    id: 10,
    name: "Monu",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT"],
  },
  {
    id: 9,
    name: "Sonu",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["REACT"],
  },
  {
    id: 8,
    name: "Raima",
    dob: "30-July-1997",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["REACT"],
  },
  {
    id: 7,
    name: "Rita",
    dob: "31-August-1998",
    gender: "female",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT", "REACT", "CSS"],
  },
  {
    id: 6,
    name: "Shrey",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["NODE"],
  },
  {
    id: 5,
    name: "Saransh",
    dob: "31-July-1997",
    gender: "male",
    about: "Want to learn new technologies",
    courses: ["NODE"],
  },
  {
    id: 4,
    name: "Sanya",
    dob: "31-July-1997",
    gender: "male",
    about: "Want to learn new technologies",
    courses: [],
  },
  {
    id: 3,
    name: "James",
    dob: "12-July-1994",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT", "BOOTSTRAP", "CSS", "REACT"],
  },
  {
    id: 2,
    name: "Sam",
    dob: "12-July-1994",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["ANGULAR", "REST AND MICROSERVICES"],
  },
  {
    id: 1,
    name: "Ellie",
    dob: "12-June-1992",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["BOOTSTRAP"],
  },
];

//for registering new user
app.post("/register", function (req, res) {
  let email = req.body.email;
  let obj = customers.find((item) => item.email === email);
  if (obj === undefined) {
    const cust = {
      custId: customers.length + 1,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
    };
    customers.push(cust);
    if (cust.role === "student") {
      let body = {
        id: students.length + 1,
        name: cust.name,
        dob: "",
        gender: "",
        about: "",
        courses: [],
      };
      console.log("student body", body);
      students.unshift(body);
    }
    if (cust.role === "faculty") {
      let body = { id: faculties.length + 1, name: cust.name, courses: [] };
      faculties.unshift(body);
      console.log(body);
    }
    let customerRes = {
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
    };
    res.send(customerRes);
  } else res.status(500).send("Email already present");
});

app.post("/login", function (req, res) {
  //find that customer
  console.log(req.body);
  let custObj = customers.find(
    (item) =>
      item.email === req.body.email && item.password === req.body.password
  );
  console.log(custObj);
  let resObj = null;
  if (custObj != undefined) {
    resObj = {
      name: custObj.name,
      email: custObj.email,
      role: custObj.role,
    };
    res.status(200).send(resObj);
  } else res.status(500).send("Login Unsuccessful");
});
app.get("/getCourses", function (req, res) {
  res.send(courses);
});

app.get("/getStudents", function (req, res) {
  let studentList = students;
  students = [];
  studentList.map((item) => {
    let arr = [];
    courses.map((itm) => {
      let ind = itm.students.findIndex((it) => it === item.name);
      if (ind != -1) {
        arr.push(itm.name);
      }
    });
    let body = { ...item, courses: arr };
    students.push(body);
  });
  let pageNo = +req.query.page;
  let course = req.query.course;
  let list = students;
  console.log(list);
  if (course != undefined) {
    let arrCourse = course.split(",");
    //console.log(arrCourse);
    list = [];
    studentList.map(function (item) {
      arrCourse.map(function (itm) {
        let ind = item.courses.findIndex((it) => it === itm);
        //console.log(ind);
        if (ind != -1) {
          let obj = list.find((it1) => it1.name === item.name);
          if (obj === undefined) list.push(item);
        }
      });
    });
    //console.log("Filtered List", list);
  }

  let result = pagination(list, parseInt(pageNo));
  res.json({
    page: pageNo,
    items: result,
    totalItems: result.length,
    totalNum: list.length,
  });
  //res.send(studentList);
});
app.put("/putCourse", function (req, res) {
  let body = req.body;
  //let duplicate= false;
  console.log(req.body);
  let ind = courses.findIndex((itm) => itm.courseId === body.courseId);
  if (ind != -1) {
    let course = [];
    let arr = req.body.students.map((st) => {
      courses[ind].students.find((c1) => (c1 === st ? "" : course.push(st)));
    });
    for (let i = 0; i < course.length; i++) {
      let index = students.findIndex((st) => st.name === course[i]);
      if (index !== -1) {
        students[index].courses.push(req.body.name);
      }
    }
    courses[ind].name = req.body.name;
    courses[ind].code = req.body.code;
    courses[ind].description = req.body.description;
    courses[ind].faculty = req.body.faculty;
    courses[ind].students = req.body.students;
  }
  console.log(courses[ind]);
  res.send(courses[ind]);
});
app.get("/getStudentNames", function (req, res) {
  let list = [];
  students.map((itm) => {
    list.push(itm.name);
  });
  res.send(list);
});
app.get("/getFaculties", function (req, res) {
  let facultyList = faculties;
  faculties = [];
  facultyList.map((item) => {
    let arr = [];
    courses.map((itm) => {
      let ind = itm.faculty.findIndex((it) => it === item.name);
      if (ind != -1) {
        arr.push(itm.name);
      }
    });
    let body = { ...item, courses: arr };
    faculties.push(body);
  });
  let pageNo = +req.query.page;
  let course = req.query.course;
  let list = faculties;
  if (course != undefined) {
    let arrCourse = course.split(",");
    list = [];
    faculties.map(function (item) {
      arrCourse.map(function (itm) {
        let ind = item.courses.findIndex((it) => it === itm);
        //console.log(ind);
        if (ind != -1) {
          let obj = list.find((it1) => it1.name === item.name);
          if (obj === undefined) list.push(item);
        }
      });
    });
    //console.log("Filtered List", list);
  }
  let list1 = [];
  list1 = list;
  console.log(list1);
  let result = pagination(list, parseInt(pageNo));
  console.log("Array ", result);

  res.json({
    page: pageNo,
    items: result,
    totalItems: result.length,
    totalNum: list.length,
  });
  //res.send(facultyList);
});
app.get("/getStudentNames", function (req, res) {
  res.send(students);
});
app.get("/getFacultyNames", function (req, res) {
  let list = [];
  faculties.map((itm) => {
    list.push(itm.name);
  });
  res.send(list);
});
app.get("/getFacultyCourse/:facultyName", function (req, res) {
  let name = req.params.facultyName;
  console.log(name);
  let arr = courses.filter((item) => {
    let obj = item.faculty.find((itm) => itm === name);
    if (obj === undefined) return false;
    else return true;
  });
  let list1 = [];
  console.log("Filtered array of courses", arr);
  arr.map((itm) => {
    let obj = {
      courseId: itm.courseId,
      name: itm.name,
      code: itm.code,
      description: itm.description,
    };
    list1.push(obj);
  });
  res.send(list1);
});
app.get("/getFacultyClass/:facultyName", function (req, res) {
  let name = req.params.facultyName;
  console.log(name);
  let arr = classes.filter((item) => item.facultyName === name);
  console.log("Filtered array of courses", arr);
  res.send(arr);
});

app.post("/postClass", function (req, res) {
  let obj = req.body;
  //let ind = classes.findIndex(item => item.classId === obj.classId);
  //if (ind === -1) {
  let obj3 = { classId: classes.length + 1, ...obj };
  classes.push(obj3);
  res.status(200).send(obj3);
  //add student Id
});
app.put("/postClass/:id", function (req, res) {
  let classId = +req.params.id;
  let obj = req.body;
  let ind = classes.findIndex((obj) => obj.classId === +classId);
  classes[ind] = { classId: classId, ...obj };
  console.log(classes[ind]);
  res.status(200).send(classes[ind]);
});

app.post("/postStudentDetails", function (req, res) {
  console.log(req.body);
  let ind = students.findIndex((itm) => itm.name === req.body.name);
  let ob = students[ind];
  console.log(ind);
  let obj = req.body;
  let body = { id: ob.id, ...obj };
  students[ind] = body;

  console.log(body);

  res.status(200).send(body);
});
app.get("/getStudentDetails/:studentName", function (req, res) {
  let name = req.params.studentName;
  //add student Id
  let obj = students.find((item) => item.name === name);
  if (obj != undefined) res.status(200).send(obj);
  else res.status(500).send("No Details Found");
});
app.get("/getStudentClass/:studentName", function (req, res) {
  let name = req.params.studentName;
  let list = [];
  let obj = students.find((itm) => itm.name === name);
  console.log(obj);
  obj.courses.map((itm) => {
    let arr = classes.filter((it1) => it1.course === itm);
    arr.map((it2) => {
      list.push(it2);
    });
  });
  console.log(list);
  res.status(200).send(list);
});
app.get("/getStudentCourse/:studentName", function (req, res) {
  let name = req.params.studentName;
  //add student Id
  console.log(name);
  console.log(students);
  let obj = students.find((item) => item.name === name);
  console.log(obj.courses);
  let arr = obj.courses;
  let list = [];
  arr.map((item) => {
    console.log(item);
    let obj = courses.find((itm) => itm.name === item);
    if (obj != undefined) list.push(obj);
  });
  let list1 = [];
  list.map((itm) => {
    let obj = {
      courseId: itm.courseId,
      name: itm.name,
      code: itm.code,
      description: itm.description,
    };
    list1.push(obj);
  });

  res.status(200).send(list1);
});
app.get("/getStudents/:courseName", function (req, res) {
  let cname = req.params.courseName;

  let obj = students.filter(function (item) {
    let ind = item.courses.findIndex((itm) => itm === cname);
    if (ind != -1) return true;
    return false;
  });
  console.log("Filter list of students", obj);
  if (obj != null) res.status(200).send(obj);
  else res.status(400).send("No Students in this course Found");
});
function pagination(obj, page) {
  const postCount = obj.length;
  const perPage = 10;
  //const pageCount = Math.ceil(postCount / perPage);
  var resArr = obj;
  resArr = resArr.slice(page * 3 - 3, page * 3);
  return resArr;
}
const port = 2450;
app.listen(port, () => console.log(`Listening on ${port}!`));
