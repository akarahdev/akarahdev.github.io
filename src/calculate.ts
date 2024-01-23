function calculateStats() {
    console.log("Recalculating stats...");

    let stats = new SkyBlockStats();
    
    let armors: string[] = [
        "helmet",
        "chestplate",
        "leggings",
        "boots",
        "necklace",
        "cloak",
        "belt",
        "gloves",
        "mainhand"
    ];

    stats.health = 100;
    stats.critChance = 30;
    stats.critDamage = 50;
    stats.intelligence = 100;

    stats.riftTime = 480;
    stats.riftHealth = 10;
    stats.riftDamage = 20;

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
        <b>Defensive Stats</b><br>
        <span style="color:#FF5555;">❤ Health</span>: ${stats.health}<br>
        <span style="color:#55FF55;">❈ Defense</span>: ${stats.defense}<br>
        <br>
        <b>Combat Stats</b><br>
        <span style="color:#FF5555;">❁ Damage</span>: ${stats.damage}<br>
        <span style="color:#FF5555;">❁ Strength</span>: ${stats.strength}<br>
        <span style="color:#5555FF;">☣ Critical Chance</span>: ${stats.critChance}%<br>
        <span style="color:#5555FF;">☠ Critical Damage</span>: ${stats.critDamage}%<br>
        <span style="color:#FF5555;">⫽ Ferocity</span>: ${stats.ferocity}<br>
        <span style="color:#FFFF55;">⚔ Bonus Attack Speed</span>: ${stats.bonusAttackSpeed}%<br>
        <span style="color:#FF5555;">❣ Health Regeneration</span>: ${stats.healthRegen}<br>
        <span style="color:#55FF55;">☄ Mending</span>: ${stats.mending}<br>
        <span style="color:#AA0000;">♨ Vitality</span>: ${stats.vitality}<br>
        <span style="color:#FFFF55;">Ⓢ Swing Range</span>: ${stats.swingRange}<br>
        <span style="color:#FFFFFF;">❂ True Defense</span>: ${stats.trueDefense}<br>
        <span style="color:#00AAAA;">☯ Combat Wisdom</span>: ${stats.combatWisdom}<br>       
        <br>
        <b>Magic Stats</b><br>
        <span style="color:#55FFFF;">✎ Intelligence</span>: ${stats.intelligence}<br>
        <span style="color:#FF5555;">๑ Ability Damage</span>: ${stats.abilityDamage}%<br>
        <br>
        <b>Rift Stats</b><br>
        <span style="color:#FF5555;">❤ Rift Hearts</span>: ${stats.riftHealth}<br>
        <span style="color:#55FF55;">φ Rift Time</span>: ${stats.riftTime}<br>
        <span style="color:#FF5555;">❁ Rift Damage</span>: ${stats.riftDamage}<br>
        <span style="color:#55FFFF;">✎ Intelligence</span>: ${stats.riftIntelligence}<br>
        <span style="color:#55FFFF;">⚡ Mana Regen</span>: ${stats.riftManaRegen}%<br>
        <br>
        <b>Misc. Stats</b><br>
        ✦ Walk Speed: ${stats.walkSpeed}<br>
        <span style="color:#55FFFF;">✯ Magic Find</span>: ${stats.magicFind}<br>
        <span style="color:#FF55FF;">♣ Pet Luck</span>: ${stats.petLuck}<br>
        <br>
        <b>Skill Stats</b><br>
        <span style="color:#FFAA00;">⸕ Mining Speed</span>: ${stats.miningSpeed}<br>
        <span style="color:#FFAA00;">☘ Mining Fortune</span>: ${stats.miningFortune}<br>
        <br>
        <span style="color:#00AAAA;">☯ Fishing Wisdom</span>: ${stats.fishingWisdom}<br>
        <span style="color:#55FFFF;">☂ Fishing Speed</span>: ${stats.fishingSpeed}<br>
        <span style="color:#00AAAA;">α Sea Creature Chance</span>: ${stats.seaCreatureChance}%<br>
        <br>
        <span style="color:#00AAAA;">☯ Farming Wisdom</span>: ${stats.farmingWisdom}<br>
        <span style="color:#FFAA00;">☘ Farming Fortune</span>: ${stats.farmingFortune}<br>
        <br>
        <span style="color:#00AAAA;">☯ Foraging Wisdom</span>: ${stats.foragingWisdom}<br> 
        <br>
        
        
        
        
        
    </span>
    `;
}