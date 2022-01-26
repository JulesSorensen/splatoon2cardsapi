document.addEventListener("DOMContentLoaded", async () => {
    await loadData();
});

const loadData = async () => {
    const request = await fetch("/get.php");
    const allSpecies = await request.json();
    const contentElement = document.getElementById("content");

    contentElement.innerHTML = '';
    contentElement.innerHTML += `
        <div class='newSpecie'>
            <h1 style='color: #025514;'>NEW</h1>
            <div class='createDiv'>
                <div class='createLabels'>
                    <div class='mandatoryDiv'><label for="createName">Name</label><p class='mandatoryStar'>*</p></div>
                    <input type="text" id="createName">
                </div>
                <div class='createLabels'>
                    <div class='mandatoryDiv'><label for="createAge">Age</label><p class='mandatoryStar'>*</p></div>
                    <input type="number" id="createAge">
                </div>
                <div class='createLabels'>
                    <div class='mandatoryDiv'><label for="createSpecieSelected">Specie</label><p class='mandatoryStar'>*</p></div>
                    <select id="createSpecieSelected">
                        <option value="inkling">Inkling</option>
                        <option value="octoling">Octoling</option>
                        <option value="cat">Cat</option>
                    </select>
                </div>
                <div class='createLabels'>
                    <div class='mandatoryDiv'><label for="createSpecieSelected">Location</label><p class='mandatoryStar'>*</p></div>
                    <select id="createLocationSelected">
                        <option value="inkopolisSquare">Inkopolis Square</option>
                        <option value="inkopolis">Inkopolis</option>
                        <option value="octocanyon">Octo Canyon</option>
                        <option value="deepseametro">Deepsea Metro</option>
                    </select>
                </div>
            </div>
            <div class='buttonsDiv'>
                <button onclick="createCharacter()">Add</button>
            </div>
        </div>
    `
    for (const specie of allSpecies) {
        contentElement.innerHTML += `
        <div class='specie' id='card-${specie.id}'>
            <h1>${specie.name}</h1>
            <img id='speciePic' src="${specie.picture}" alt="Picture of ${specie.name}">
            <h3>${specie.specie}</h3>
            <p>Age: ${specie.age} yo<br>Location: ${specie.location}</p>
            <div class='buttonsDiv' id='buttonsDiv-${specie.id}'>
                <button onclick="editCharacter('${specie.id}')">EDIT</button>
                <button onclick="deleteCharacter('${specie.id}')">DEL</button>
            </div>
        </div>
        `
    }
}

const editCharacter = async (id) => {
    const contentElement = document.getElementById(`card-${id}`);
    const request = await fetch("/get.php");
    const allSpecies = await request.json();
    let selectedSpecie = undefined;

    allSpecies.forEach(specie => {
        console.log(specie.id == id)
        if (specie.id == id) {
            selectedSpecie = specie
        }
    });
    if (selectedSpecie !== undefined) {
        const [lInk, lInkSquare, lOcto, lDeepsea] = [
            (selectedSpecie.location.split(' ').join('').toLowerCase() == "inkopolis") ? 'selected' : '',
            (selectedSpecie.location.split(' ').join('').toLowerCase() == "inkopolissquare") ? 'selected' : '',
            (selectedSpecie.location.split(' ').join('').toLowerCase() == "octocanyon") ? 'selected' : '',
            (selectedSpecie.location.split(' ').join('').toLowerCase() == "deepseametro") ? 'selected' : ''
        ]
        const [sInkling, sOcto, sCat] = [
            (selectedSpecie.specie.toLowerCase() == "inkling") ? 'selected' : '',
            (selectedSpecie.specie.toLowerCase() == "octoling") ? 'selected' : '',
            (selectedSpecie.specie.toLowerCase() == "cat") ? 'selected' : ''
        ]
        contentElement.innerHTML = `
            <h1 style='color: #025514;'>EDIT</h1>
            <div class='editDiv'>
                <div class='createLabels'>
                    <label for="editName">Name</label>
                    <input value="${selectedSpecie.name}" type="text" id="editName">
                </div>
                <div class='createLabels'>
                    <label for="editAge">Age</label>
                    <input value="${selectedSpecie.age}" type="number" id="editAge">
                </div>
                <div class='createLabels'>
                    <label for="editSpecieSelected">Specie</label>
                    <select id="editSpecieSelected">
                        <option value="inkling" ${sInkling}>Inkling</option>
                        <option value="octoling" ${sOcto}>Octoling</option>
                        <option value="cat" ${sCat}>Cat</option>
                    </select>
                </div>
                <div class='createLabels'>
                    <label for="editLocationSelected">Location</label>
                    <select id="editLocationSelected" >
                        <option value="inkopolisSquare" ${lInkSquare}>Inkopolis Square</option>
                        <option value="inkopolis" ${lInk}>Inkopolis</option>
                        <option value="octocanyon" ${lOcto}>Octo Canyon</option>
                        <option value="deepseametro" ${lDeepsea}>Deepsea Metro</option>
                    </select>
                </div>
            </div>
            <div class='buttonsDiv'>
                <button onclick="loadData()">Cancel</button>
                <button onclick="editSaveCharacter('${selectedSpecie.id}')">Save</button>
            </div>
        `
    }
}

const editSaveCharacter = async (id) => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const name = document.getElementById("editName").value;
    const age = document.getElementById("editAge").value;
    const specieSelected = document.getElementById("editSpecieSelected").value;
    const location = document.getElementById("editLocationSelected").value;
    const imgs = {
        "inkling": "https://www.pngkey.com/png/full/41-416359_pink-inkling-inkling-girl-splatoon-2.png",
        "octoling": "https://static.wikia.nocookie.net/videogamefanon/images/3/3a/Octoling_Boy_JoeTERender.png",
        "cat": "https://cdn.wikimg.net/en/splatoonwiki/images/c/ce/Li%27l_Judd_S2.png"
    }
    const specie = {
        "id": id,
        "name": name,
        "specie": capitalizeFirstLetter(specieSelected),
        "location": capitalizeFirstLetter(location),
        "age": age,
        "picture": imgs[specieSelected]
    };
    const res = await fetch("/edit.php", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(specie)
    });
    if (res.status == 409) {
        const errorText = document.getElementById("errorContent");
        errorText.innerHTML = `<p style='color: red;'>Please specify all data to edit a character</p>`
    } else {
        const errorText = document.getElementById("errorContent");
        errorText.innerHTML = ''
    }
    await loadData();
}

const cancelDeleteButtons = (id) => {
    const buttonsElement = document.getElementById(`buttonsDiv-${id}`);
    buttonsElement.innerHTML = ''
    buttonsElement.innerHTML += `
        <button onclick="editCharacter('${id}')">EDIT</button>
        <button onclick="deleteCharacter('${id}')">DEL</button>
    `
}

const deleteCharacter = async (id) => {
    const buttonsElement = document.getElementById(`buttonsDiv-${id}`);

    buttonsElement.innerHTML = ''
    buttonsElement.innerHTML += `
        <button onclick="cancelDeleteButtons('${id}')">Cancel</button>
        <button class='deleteButton' onclick="deleteSaveCharacter('${id}')">CONF</button>
    `
}

const deleteSaveCharacter = async (id) => {
    const res = await fetch("/delete.php", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": id
        })
    });
    if (res.status == 409) {
        const errorText = document.getElementById("errorContent");
        errorText.innerHTML = `<p style='color: red;'>Please specify all at least the id to delete a character</p>`
    } else {
        const errorText = document.getElementById("errorContent");
        errorText.innerHTML = ''
    }
    await loadData();
}

const createCharacter = async () => {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const name = document.getElementById("createName").value;
    const age = document.getElementById("createAge").value;
    const specie = document.getElementById("createSpecieSelected").value;
    const location = document.getElementById("createLocationSelected").value;
    const imgs = {
        "inkling": "https://www.pngkey.com/png/full/41-416359_pink-inkling-inkling-girl-splatoon-2.png",
        "octoling": "https://static.wikia.nocookie.net/videogamefanon/images/3/3a/Octoling_Boy_JoeTERender.png",
        "cat": "https://cdn.wikimg.net/en/splatoonwiki/images/c/ce/Li%27l_Judd_S2.png"
    }
    const specieToCreate = {
        "picture": imgs[specie]
    };
    switch (false) {
        case (!name):
            specieToCreate["name"] = name
        case (!specie):
            specieToCreate["specie"] = capitalizeFirstLetter(specie)
        case (!location):
            specieToCreate["location"] = capitalizeFirstLetter(location)
        case (!age):
            specieToCreate["age"] = age
    }
    const res = await fetch("/add.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(specieToCreate)
    })
    if (res.status == 409) {
        const errorText = document.getElementById("errorContent");
        errorText.innerHTML = `<p style='color: red;'>Please specify all data to create a character</p>`
    } else {
        const errorText = document.getElementById("errorContent");
        errorText.innerHTML = ''
    }
    await loadData();
}