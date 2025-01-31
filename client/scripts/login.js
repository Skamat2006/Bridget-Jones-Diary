document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();


    if (response.status == 200) {
        console.log(data);
        // document.cookie = `token=${data.token}`;
        
        localStorage.setItem("token", data.token);
        console.log(data.token);
        window.location.assign("./diary.html"); // redirect to index page
        // alert("Logged in!");
    } else {
        alert(data.error);
    }
})