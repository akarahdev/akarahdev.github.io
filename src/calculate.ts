function calculateStats() {
    let stats = new SkyBlockStats();
    let armors: string[] = [
        "helmet",
        "chestplate",
        "leggings",
        "boots",
        "necklace",
        "cloak",
        "belt",
        "gloves"
    ];

    armors.forEach(armor => {
        let element = document.getElementById(`${armor}-input`) as HTMLInputElement;
        console.log(armor);
        let value = element.value;
        let item = items[value];
        if(item != undefined && item != null) {
            stats = SkyBlockStatsFunctions.add(stats, item.stats);
        }
    });

    document.getElementById("stat-renderer").innerHTML = `
    <span style="color:#ffffff">
        <b>Combat Stats</b><br>
        <span style="color:#FF5555;">❤ Health</span>: ${stats.health}<br>
        <span style="color:#55FF55;">❈ Defense</span>: ${stats.defense}<br>

        <span style="color:#FF5555;">❁ Damage</span>: ${stats.damage}<br>
        <span style="color:#FF5555;">❁ Strength</span>: ${stats.strength}<br>
        <span style="color:#55FFFF;">✎ Intelligence</span>: ${stats.intelligence}<br>

        <b>Rift Stats</b><br>
        <span style="color:#FF5555;">❤ Rift Hearts</span>: ${stats.riftHealth}<br>
        <span style="color:#55FF55;">φ Rift Time</span>: ${stats.riftTime}<br>

        <span style="color:#FF5555;">❁ Rift Damage</span>: ${stats.riftDamage}<br>
        <span style="color:#55FFFF;">✎ Intelligence</span>: ${stats.riftIntelligence}<br>
        <span style="color:#55FFFF;">⚡ Mana Regen</span>: ${stats.riftManaRegen}<br>
    </span>
    `;
}