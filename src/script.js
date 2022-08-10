let students = [
  creatStudent(
    "Иванов Иван Иванович",
    "09/18/1998",
    "09/01/2016",
    "Математический"
  ),

  creatStudent(
    "Петров Петр Петрович",
    "12/15/1998",
    "09/01/2016",
    "Математический"
  ),
  creatStudent(
    "Николаев Николай Николаевич",
    "3/27/1998",
    "09/01/2016",
    "Математический"
  ),
  creatStudent(
    "Яковлев Ярослав Александрович",
    "4/29/1999",
    "09/01/2017",
    "Биологический"
  ),
  creatStudent(
    "Борисов Алексей Юрьевич",
    "12/27/1999",
    "09/01/2017",
    "Архитектурный"
  ),
  creatStudent(
    "Тонсков Алексей Данилович",
    "12/27/1999",
    "09/01/20",
    "Архитектурный"
  ),
];

let tableStudent = document.createElement("table");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");

tableStudent.appendChild(thead);
tableStudent.appendChild(tbody);

document.getElementById("body").appendChild(tableStudent);

let row_0 = document.createElement("tr");
let input_1 = document.createElement("input");
input_1.placeholder = "ФИО";
let input_2 = document.createElement("input");
input_2.placeholder = "Факультет";
let input_3 = document.createElement("input");
input_3.placeholder = "Год начала обучения";
input_3.type = "date";
let input_4 = document.createElement("input");
input_4.placeholder = "Год окончания обучения";
input_4.type = "date";
let row_1 = document.createElement("tr");
let heading_1 = document.createElement("th");
let heading_2 = document.createElement("th");
let heading_3 = document.createElement("th");
let heading_4 = document.createElement("th");
heading_1.innerHTML = "ФИО";
heading_2.innerHTML = "Дата рождения,возраст";
heading_3.innerHTML = "Годы обучения и курс";
heading_4.innerHTML = "Факультет";
row_0.appendChild(input_1);
row_0.appendChild(input_2);
row_0.appendChild(input_3);
row_0.appendChild(input_4);
row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
thead.appendChild(row_0);
thead.appendChild(row_1);

function creatStudent(a, b, c, d) {
  return {
    fullname: a,
    birthdayDate: new Date(b),
    startYear: new Date(c),
    faculty: d,
  };
}

let age = function (student) {
  let today = new Date();
  let birthDate = student.birthdayDate;
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m > 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

let finishYear = function (student) {
  let start = student.startYear;
  let finish = new Date(start);
  finish.setFullYear(finish.getFullYear() + 4);
  return finish.getFullYear();
};

let courseOfStudy = function (student) {
  let begin = student.startYear;
  let now = new Date();
  let diff = now.getFullYear() - begin.getFullYear();
  if (diff > 4) {
    return "Закончил";
  } else {
    return diff + " " + "курс";
  }
};
console.log(courseOfStudy(students[0]));

function renderStudent(student) {
  let row_2 = document.createElement("tr");
  let row_2_data_1 = document.createElement("td");
  row_2_data_1.innerHTML = student.fullname;
  let row_2_data_2 = document.createElement("td");
  row_2_data_2.innerHTML =
    student.birthdayDate.toLocaleDateString() +
    " " +
    "(" +
    age(student) +
    " " +
    "года" +
    ")";
  let row_2_data_3 = document.createElement("td");
  row_2_data_3.innerHTML =
    student.startYear.getFullYear() +
    "-" +
    finishYear(student) +
    "(" +
    courseOfStudy(student) +
    ")";
  let row_2_data_4 = document.createElement("td");
  row_2_data_4.innerHTML = student.faculty;
  row_2.appendChild(row_2_data_1);
  row_2.appendChild(row_2_data_2);
  row_2.appendChild(row_2_data_3);
  row_2.appendChild(row_2_data_4);
  tbody.appendChild(row_2);
}

function renderTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((student) => renderStudent(student));
}
renderTable(students);
// students.forEach((student) => renderStudent(student));

let button = document.querySelector(".btn");
let form = document.getElementById("form");
let inputFullName = document.getElementById("fullname");
let inputBirthday = document.getElementById("date_bithsday");
let inputDateStartYear = document.getElementById("learning_start_year");
let inputFuculty = document.getElementById("fuculty");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let newStudent = creatStudent(
    inputFullName.value,
    inputBirthday.value,
    inputDateStartYear.value,
    inputFuculty.value
  );
  students.push(newStudent);
  renderStudent(newStudent);
  inputBirthday.value = "";
  inputFullName.value = "";
  inputDateStartYear.value = "";
  inputFuculty.value = "";
});

button.addEventListener("click", function () {
  form.classList.add("form-view");
});

heading_1.addEventListener("click", function () {
  const newStudents = students.slice();
  newStudents.sort(function (a, b) {
    if (a.fullname > b.fullname) {
      return 1;
    }
    if (a.fullname < b.fullname) {
      return -1;
    }

    return 0;
  });
  renderTable(newStudents);
});
heading_2.addEventListener("click", function () {
  const newStudents = students.slice();
  newStudents.sort(function (a, b) {
    if (a.birthdayDate > b.birthdayDate) {
      return 1;
    }
    if (a.birthdayDate < b.birthdayDate) {
      return -1;
    }

    return 0;
  });
  renderTable(newStudents);
});
heading_3.addEventListener("click", function () {
  const newStudents = students.slice();
  newStudents.sort(function (a, b) {
    if (a.startYear > b.startYear) {
      return 1;
    }
    if (a.startYear < b.startYear) {
      return -1;
    }

    return 0;
  });
  renderTable(newStudents);
});
heading_4.addEventListener("click", function () {
  const newStudents = students.slice();
  newStudents.sort(function (a, b) {
    if (a.faculty > b.faculty) {
      return 1;
    }
    if (a.faculty < b.faculty) {
      return -1;
    }

    return 0;
  });
  renderTable(newStudents);
});

input_1.addEventListener("input", function () {
  const arrStudents = students.filter((student) => {
    if (student.fullname.includes(input_1.value)) {
      return 1;
    }
  });
  renderTable(arrStudents);
});
input_2.addEventListener("input", function () {
  const arrStudents = students.filter((student) => {
    if (student.faculty.includes(input_2.value)) {
      return 1;
    }
  });
  renderTable(arrStudents);
});
input_3.addEventListener("change", function () {
  const arrStudents = students.filter((student) => {
    return (
      student.startYear.toLocaleString().substring(0, 10) ===
      new Date(input_3.value).toLocaleString().substring(0, 10)
    );
  });
  renderTable(arrStudents);

  console.log(new Date(input_3.value));
});
input_4.addEventListener("change", function () {
  const arrStudents = students.filter((student) => {
    return (
      student.startYear.toLocaleString().substring(0, 10) ===
      new Date(input_4.value).toLocaleString().substring(0, 10)
    );
  });
  renderTable(arrStudents);
  console.log({
    value: students[0].startYear.toLocaleString().substring(0, 10),
    type: typeof students[0].startYear.toLocaleString().substring(0, 10),
  });
  console.log({
    value: new Date(input_4.value).toLocaleString().substring(0, 10),
    type: typeof new Date(input_4.value).toLocaleString().substring(0, 10),
  });
  console.log(
    students[0].startYear.toLocaleString().substring(0, 10) ===
      new Date(input_4.value).toLocaleString().substring(0, 10)
  );
});
