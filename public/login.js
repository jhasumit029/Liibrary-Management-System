const ADMIN_PASSWORD = "admin"
const STUDENT_PASSWORD = "student"

const username = document.getElementById("username");
const password = document.getElementById("password");
const role = document.getElementById("role");
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", (e) => {
    if(role.value == "administrator") {
        if(password.value != ADMIN_PASSWORD) {
            alert("Incorrect password for adminstrator");
            return
        }
        window.location.assign("./administrator.html");
    } else {
        if(password.value != STUDENT_PASSWORD) {
            alert("Incorrect password for student.");
            return
        }
        window.location.assign("./student.html");
    }
})