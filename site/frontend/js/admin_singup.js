const singup_button = document.getElementById("singup");
const password_input = document.getElementById("password");
const id_input = document.getElementById("id");

function check_password(login, password) {
    // check password logic...
    return true;
}

singup_button.addEventListener("click", () => {
    let login = id_input.value;
    let password = password_input.value;

    if (check_password(login, password)) {
        document.location.href = "../html/admin_panel.html";
    }
});