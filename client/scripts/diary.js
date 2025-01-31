function createDiaryEntryElement (data) {
    const diaryEntry = document.createElement("div");
    diaryEntry.className = "post";

    const header = document.createElement("h2");
    header.textContent = data["title"];
    diaryEntry.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["content"];
    diaryEntry.appendChild(content);

    return diaryEntry;
}


document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content")
        })
    }

    const result = await fetch("http://localhost:3000/entries", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadDiaryEntris () {
    
    const options = {
        headers: {
            // authorisation: document.cookie.split("=")[1]
            authorisation: localStorage.getItem("token")
        }
    }

    const response = await fetch("http://localhost:3000/entries", options);

    // const response = await fetch("http://localhost:3000/entries");


    if (response.status == 200) {
        const entries = await response.json();
    
        const container = document.getElementById("entries");

        entries.forEach(p => {
            const elem = createDiaryEntryElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

loadDiaryEntris();
