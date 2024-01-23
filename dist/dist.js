function calculateStats() {
    console.log("Recalculating stats...");
    let stats = new SkyBlockStats();
    let armors = [
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
        let element = document.getElementById(`${armor}-input`);
        console.log(armor);
        let value = element.value;
        let item = items[value];
        if (item != undefined && item != null) {
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
/** Represents the category of a SkyBlock item. */
var Category;
(function (Category) {
    Category[Category["REFORGE_STONE"] = 0] = "REFORGE_STONE";
    Category[Category["SWORD"] = 1] = "SWORD";
    Category[Category["BOOTS"] = 2] = "BOOTS";
    Category[Category["BELT"] = 3] = "BELT";
    Category[Category["NECKLACE"] = 4] = "NECKLACE";
    Category[Category["GLOVES"] = 5] = "GLOVES";
    Category[Category["HELMET"] = 6] = "HELMET";
    Category[Category["CHESTPLATE"] = 7] = "CHESTPLATE";
    Category[Category["ACCESSORY"] = 8] = "ACCESSORY";
    Category[Category["CLOAK"] = 9] = "CLOAK";
    Category[Category["LEGGINGS"] = 10] = "LEGGINGS";
    Category[Category["AXE"] = 11] = "AXE";
    Category[Category["HOE"] = 12] = "HOE";
    Category[Category["COSMETIC"] = 13] = "COSMETIC";
    Category[Category["MEMENTO"] = 14] = "MEMENTO";
    Category[Category["FISHING_ROD"] = 15] = "FISHING_ROD";
    Category[Category["FISHING_WEAPON"] = 16] = "FISHING_WEAPON";
    Category[Category["BAIT"] = 17] = "BAIT";
    Category[Category["PET_ITEM"] = 18] = "PET_ITEM";
    Category[Category["WAND"] = 19] = "WAND";
    Category[Category["PORTAL"] = 20] = "PORTAL";
    Category[Category["BOW"] = 21] = "BOW";
    Category[Category["NONE"] = 22] = "NONE";
    Category[Category["DUNGEON_PASS"] = 23] = "DUNGEON_PASS";
    Category[Category["ARROW"] = 24] = "ARROW";
    Category[Category["SPADE"] = 25] = "SPADE";
    Category[Category["PICKAXE"] = 26] = "PICKAXE";
    Category[Category["DEPLOYABLE"] = 27] = "DEPLOYABLE";
    Category[Category["DRILL"] = 28] = "DRILL";
    Category[Category["SHEARS"] = 29] = "SHEARS";
    Category[Category["BRACELET"] = 30] = "BRACELET";
    Category[Category["LONGSWORD"] = 31] = "LONGSWORD";
    Category[Category["GAUNTLET"] = 32] = "GAUNTLET";
    Category[Category["TRAVEL_SCROLL"] = 33] = "TRAVEL_SCROLL";
    Category[Category["ARROW_POISON"] = 34] = "ARROW_POISON";
    Category[Category["VACUUM"] = 35] = "VACUUM";
})(Category || (Category = {}));
(function (Category) {
    function parseCategory(category) {
        switch (category) {
            case "REFORGE_STONE": return Category.REFORGE_STONE;
            case "SWORD": return Category.SWORD;
            case "BOOTS": return Category.BOOTS;
            case "BELT": return Category.BELT;
            case "NECKLACE": return Category.NECKLACE;
            case "GLOVES": return Category.GLOVES;
            case "HELMET": return Category.HELMET;
            case "CHESTPLATE": return Category.CHESTPLATE;
            case "ACCESSORY": return Category.ACCESSORY;
            case "CLOAK": return Category.CLOAK;
            case "LEGGINGS": return Category.LEGGINGS;
            case "AXE": return Category.AXE;
            case "HOE": return Category.HOE;
            case "COSMETIC": return Category.COSMETIC;
            case "MEMENTO": return Category.MEMENTO;
            case "FISHING_ROD": return Category.FISHING_ROD;
            case "FISHING_WEAPON": return Category.FISHING_WEAPON;
            case "BAIT": return Category.BAIT;
            case "PET_ITEM": return Category.PET_ITEM;
            case "WAND": return Category.WAND;
            case "PORTAL": return Category.PORTAL;
            case "BOW": return Category.BOW;
            case "NONE": return Category.NONE;
            case "DUNGEON_PASS": return Category.DUNGEON_PASS;
            case "ARROW": return Category.ARROW;
            case "SPADE": return Category.SPADE;
            case "PICKAXE": return Category.PICKAXE;
            case "DEPLOYABLE": return Category.DEPLOYABLE;
            case "DRILL": return Category.DRILL;
            case "SHEARS": return Category.SHEARS;
            case "BRACELET": return Category.BRACELET;
            case "LONGSWORD": return Category.LONGSWORD;
            case "GAUNTLET": return Category.GAUNTLET;
            case "TRAVEL_SCROLL": return Category.TRAVEL_SCROLL;
            case "ARROW_POISON": return Category.ARROW_POISON;
            case "VACUUM": return Category.VACUUM;
            default: throw Error(`Invalid category ${category} - SkyBlock must've updated! Please report this bug.`);
        }
    }
    Category.parseCategory = parseCategory;
})(Category || (Category = {}));
let items = {};
fetch("https://api.hypixel.net/v2/resources/skyblock/items")
    .then((res) => {
    res.json().then((json) => {
        let tempItems = json["items"];
        tempItems.forEach((it) => {
            items[it["name"]] = SkyBlockItem.fromObject(it);
        });
        setupPage();
    });
});
function setupPage() {
    console.log(items);
    let categories = [];
    let stats = [];
    Object.keys(items).forEach((key) => {
        let it = items[key];
        let category = it["category"];
        let option = document.createElement("option");
        option.value = it["name"];
        switch (category) {
            case Category.HELMET:
                document.getElementById("helmet-list").appendChild(option);
                break;
            case Category.CHESTPLATE:
                document.getElementById("chestplate-list").appendChild(option);
                break;
            case Category.LEGGINGS:
                document.getElementById("leggings-list").appendChild(option);
                break;
            case Category.BOOTS:
                document.getElementById("boots-list").appendChild(option);
                break;
            case Category.NECKLACE:
                document.getElementById("necklace-list").appendChild(option);
                break;
            case Category.CLOAK:
                document.getElementById("cloak-list").appendChild(option);
                break;
            case Category.BELT:
                document.getElementById("belt-list").appendChild(option);
                break;
            case Category.GLOVES:
                document.getElementById("gloves-list").appendChild(option);
                break;
            case Category.BRACELET:
                document.getElementById("gloves-list").appendChild(option);
                break;
            case Category.SWORD || Category.BOW || Category.LONGSWORD || Category.AXE || Category.PICKAXE || Category.HOE:
                document.getElementById("mainhand-list").appendChild(option);
                break;
        }
    });
    console.log(`categories: ${categories}`);
    console.log(`stats: ${stats}`);
    let slots = [
        "helmet-input",
        "chestplate-input",
        "leggings-input",
        "boots-input",
        "necklace-input",
        "cloak-input",
        "belt-input",
        "gloves-input"
    ];
    slots.forEach((slot) => {
        document.getElementById(slot).addEventListener("change", calculateStats);
    });
    calculateStats();
}
class Stars {
    constructor(stars) {
        this.stars = 0;
        this.stars = stars;
    }
    modify(item) {
    }
}
class HotPotatoBooks {
    constructor(amount) {
        this.amount = 0;
        this.amount = amount;
    }
    modify(item) {
        switch (item.category) {
            case Category.HELMET, Category.CHESTPLATE, Category.LEGGINGS, Category.BOOTS:
                item.stats.health += 4 * this.amount;
                item.stats.defense += 2 * this.amount;
                break;
            case Category.SWORD, Category.BOW, Category.LONGSWORD:
                item.stats.damage += 2 * this.amount;
                item.stats.strength += 2 * this.amount;
                break;
        }
    }
}
/** Represents the rarity of a SkyBlock item. */
var Rarity;
(function (Rarity) {
    Rarity[Rarity["COMMON"] = 0] = "COMMON";
    Rarity[Rarity["UNCOMMON"] = 1] = "UNCOMMON";
    Rarity[Rarity["RARE"] = 2] = "RARE";
    Rarity[Rarity["EPIC"] = 3] = "EPIC";
    Rarity[Rarity["LEGENDARY"] = 4] = "LEGENDARY";
    Rarity[Rarity["MYTHIC"] = 5] = "MYTHIC";
    Rarity[Rarity["DIVINE"] = 6] = "DIVINE";
    Rarity[Rarity["SPECIAL"] = 7] = "SPECIAL";
    Rarity[Rarity["VERY_SPECIAL"] = 8] = "VERY_SPECIAL";
})(Rarity || (Rarity = {}));
(function (Rarity) {
    function parseRarity(rarity) {
        switch (rarity) {
            case "COMMON": return Rarity.COMMON;
            case "UNCOMMON": return Rarity.UNCOMMON;
            case "RARE": return Rarity.RARE;
            case "EPIC": return Rarity.EPIC;
            case "LEGENDARY": return Rarity.LEGENDARY;
            case "MYTHIC": return Rarity.MYTHIC;
            case "DIVINE": return Rarity.DIVINE;
            case "SPECIAL": return Rarity.SPECIAL;
            case "VERY_SPECIAL": return Rarity.VERY_SPECIAL;
            default: throw Error(`Invalid rarity ${rarity} - SkyBlock must've updated! Please report this bug.`);
        }
    }
    Rarity.parseRarity = parseRarity;
})(Rarity || (Rarity = {}));
class SkyBlockItem {
    constructor() {
        /** Name of this item. */
        this.name = "";
        /** Rarity of the item (e.g COMMON, RARE, etc.) */
        this.rarity = Rarity.COMMON;
        /** Category of this item (e.g SWORD, BOW) */
        this.category = Category.NONE;
        this.dungeonItem = false;
        /** Stats of this item */
        this.stats = new SkyBlockStats();
    }
    static fromObject(object) {
        var _a, _b, _c, _d, _e;
        let item = new SkyBlockItem();
        item.name = (_a = object["name"]) !== null && _a !== void 0 ? _a : "";
        item.rarity = Rarity.parseRarity((_b = object["rarity"]) !== null && _b !== void 0 ? _b : "COMMON");
        item.category = Category.parseCategory((_c = object["category"]) !== null && _c !== void 0 ? _c : "NONE");
        item.dungeonItem = (_d = object["dungeon_item"]) !== null && _d !== void 0 ? _d : false;
        item.stats = SkyBlockStatsFunctions.fromObject((_e = object["stats"]) !== null && _e !== void 0 ? _e : new SkyBlockStats());
        return item;
    }
    modify(modifier) {
        modifier.modify(this);
    }
    copy() {
        let s = new SkyBlockItem();
        s.name = this.name;
        s.rarity = this.rarity;
        s.category = this.category;
        s.dungeonItem = this.dungeonItem;
        s.stats = this.stats;
        return s;
    }
}
class SkyBlockStats {
    constructor() {
        /**
         * Generates a SkyBlockStats object from a JS object.
         */
        this.damage = 0;
        this.health = 0;
        this.defense = 0;
        this.strength = 0;
        this.intelligence = 0;
        this.critChance = 0;
        this.critDamage = 0;
        this.bonusAttackSpeed = 0;
        this.abilityDamage = 0;
        this.trueDefense = 0;
        this.ferocity = 0;
        this.healthRegen = 0;
        this.vitality = 0;
        this.mending = 0;
        this.swingRange = 0;
        this.combatWisdom = 0;
        this.walkSpeed = 0;
        this.magicFind = 0;
        this.petLuck = 0;
        this.riftTime = 0;
        this.riftDamage = 0;
        this.riftIntelligence = 0;
        this.riftManaRegen = 0;
        this.riftHealth = 0;
        this.foragingWisdom = 0;
        this.farmingWisdom = 0;
        this.farmingFortune = 0;
        this.fishingWisdom = 0;
        this.fishingSpeed = 0;
        this.seaCreatureChance = 20;
        this.miningSpeed = 0;
        this.miningFortune = 0;
    }
}
var SkyBlockStatsFunctions;
(function (SkyBlockStatsFunctions) {
    /*
DAMAGE,
HEALTH,
DEFENSE,
STRENGTH,
INTELLIGENCE,
MINING_FORTUNE,
WALK_SPEED,
MAGIC_FIND,
WEAPON_ABILITY_DAMAGE,
ABILITY_DAMAGE_PERCENT,
FARMING_FORTUNE,
CRITICAL_DAMAGE,
SEA_CREATURE_CHANCE,
FEROCITY,
TRUE_DEFENSE,
MINING_SPEED,
SWING_RANGE,
PET_LUCK,
RIFT_DAMAGE,
ferocity,
CRITICAL_CHANCE,
ATTACK_SPEED,
BREAKING_POWER,
RIFT_TIME,
damage,defense,health,bonus_pest_chance,cocoa_beans_fortune,magic_find,strength,sea_creature_chance,fishing_speed,rift_Time,vitality,mending,
critical_damage,foraging_wisdom,combat_wisdom,walk_speed,wheat_fortune,carrot_fortune,potato_fortune,melon_fortune,
pumpkin_fortune,farming_fortune,rift_walk_speed,rift_intelligence,rift_mana_regen,RIFT_INTELLIGENCE,rift_health,rift_time,fishing_wisdom,rift_damage,
intelligence,health_regeneration,farming_wisdom

Rift stats:
rift_Time
rift_health
rift_time
RIFT_TIME
rift_damage
rift_walk_speed
rift_intelligence
rift_mana_regen
RIFT_INTELLIGENCE
rift_health
*/
    SkyBlockStatsFunctions.mapping = {
        "damage": ["DAMAGE", "damage"],
        "health": ["HEALTH", "health"],
        "defense": ["DEFENSE", "defense"],
        "strength": ["STRENGTH", "strength"],
        "intelligence": ["INTELLIGENCE", "intelligence"],
        "critChance": ["CRIT_CHANCE", "crit_chance"],
        "bonusAttackSpeed": ["ATTACK_SPEED", "attack_speed"],
        "abilityDamage": ["ABILITY_DAMAGE_PERCENT", "ability_damage_percent"],
        "baseAbilityDamage": ["WEAPON_ABILITY_DAMAGE"],
        "trueDefense": ["TRUE_DEFENSE", "true_defense"],
        "ferocity": ["FEROCITY", "ferocity"],
        "healthRegem": ["HEALTH_REGENERATION", "health_regeneration"],
        "vitality": ["VITALITY", "vitality"],
        "mending": ["MENDING", "mending"],
        "swingRange": ["SWING_RAMGE", "swing_range"],
        "combatWisdom": ["COMBAT_WISDOM", "combat_wisdom"],
        "riftTime": ["RIFT_TIME", "rift_Time", "rift_time"],
        "riftDamage": ["RIFT_DAMAGE", "rift_damage"],
        "riftIntelligence": ["RIFT_INTELLIGENCE", "rift_intelligence"],
        "riftManaRegen": ["RIFT_MANA_REGEN", "rift_mana_regen"],
        "riftHealth": ["RIFT_HEALTH", "rift_health"],
        "walkSpeed": ["WALK_SPEED", "walk_speed"],
        "magicFind": ["MAGIC_FIND", "magic_find"],
        "petLuck": ["PET_LUCK", "pet_luck"],
        "foragingWisdom": ["FORAGING_WISDOM", "foraging_wisdom"],
        "fishingWisdom": ["FISHING_WISDOM", "fishing_wisdom"],
        "fishingSpeed": ["FISHING_SPEED", "fishing_speed"],
        "seaCreatureChance": ["SEA_CREATURE_CHANCE", "sea_creature_chance"],
        "farmingWisdom": ["FARMING_WISDOM", "farming_wisdom"],
        "farmingFortune": ["FARMING_FORTUNE", "farming_fortune"],
        "miningSpeed": ["MINING_SPEED", "mining_speed"],
        "miningFortune": ["MINING_FORTUNE", "mining_fortune"],
    };
    function fromObject(object) {
        let statsObject = new SkyBlockStats();
        Object.keys(SkyBlockStatsFunctions.mapping).forEach((key) => {
            SkyBlockStatsFunctions.mapping[key].forEach((value) => {
                var _a;
                // @ts-ignore
                // Safety: Only properties of type `number` will be accessed, unless
                // the programmer does something wrong.
                statsObject[key] += (_a = object[value]) !== null && _a !== void 0 ? _a : 0;
            });
        });
        return statsObject;
    }
    SkyBlockStatsFunctions.fromObject = fromObject;
    function add(lhs, rhs) {
        let statsObject = new SkyBlockStats();
        Object.keys(SkyBlockStatsFunctions.mapping).forEach((key) => {
            statsObject[key] += (rhs[key]) + (lhs[key]);
            console.log(`${statsObject[key]} += ${(rhs[key]) + (lhs[key])}`);
        });
        return statsObject;
    }
    SkyBlockStatsFunctions.add = add;
})(SkyBlockStatsFunctions || (SkyBlockStatsFunctions = {}));
