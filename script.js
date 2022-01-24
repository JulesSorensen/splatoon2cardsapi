document.addEventListener("DOMContentLoaded", async () => {
    const request = await fetch("/champion.php");
    const champions = await request.json();
    const contentElement = document.getElementById("content");
    for (const champion of champions) {
        contentElement.innerHTML += `<div class='champion'>
            <h1>${champion.name}<h1/>
            <img id='champImg' src="${champion.img}" alt="Photo de ${champion.name}">
            <h3>${champion.alive ? 'Est en vie !' : 'Est mort...'}<h3/>
            <p>HP: ${champion["base-stats"].hp}<br>MP:${champion["base-stats"].mp}<p/>
        <div/>`
    }
    // contentElement.innerHTML += `
        
    // `
});