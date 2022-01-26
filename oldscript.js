document.addEventListener("DOMContentLoaded", async () => {
    const request = await fetch("/champion.php");
    const champions = await request.json();
    for (const champion of champions) {
        document.write(`name: ${champion.name}, hp: ${champion["base-stats"].hp} <br> `);
    }
});