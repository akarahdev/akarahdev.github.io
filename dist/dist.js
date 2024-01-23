function calculateStats() {
    let stats = new SkyBlockStats();
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
        if (!categories.includes(it["category"])) {
            categories.push(it["category"]);
        }
        if (it["stats"] != null && it["stats"] != undefined) {
            Object.keys(it["stats"]).forEach((it) => {
                if (!stats.includes(it)) {
                    stats.push(it);
                }
            });
        }
        switch (category) {
            case "HELMET":
                document.getElementById("helmet-list").appendChild(option);
                break;
            case "CHESTPLATE":
                document.getElementById("chestplate-list").appendChild(option);
                break;
            case "LEGGINGS":
                document.getElementById("leggings-list").appendChild(option);
                break;
            case "BOOTS":
                document.getElementById("boots-list").appendChild(option);
                break;
            case "NECKLACE":
                document.getElementById("necklace-list").appendChild(option);
                break;
            case "CLOAK":
                document.getElementById("cloak-list").appendChild(option);
                break;
            case "BELT":
                document.getElementById("belt-list").appendChild(option);
                break;
            case "GLOVES":
                document.getElementById("gloves-list").appendChild(option);
                break;
            case "BRACELET":
                document.getElementById("gloves-list").appendChild(option);
                break;
            case "SWORD":
                document.getElementById("mainhand-list").appendChild(option);
                break;
            case "BOW":
                document.getElementById("mainhand-list").appendChild(option);
                break;
            case "LONGSWORD":
                document.getElementById("mainhand-list").appendChild(option);
                break;
            case "AXE":
                document.getElementById("mainhand-list").appendChild(option);
                break;
            case "PICKAXE":
                document.getElementById("mainhand-list").appendChild(option);
                break;
            case "HOE":
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
        this.category = "";
        /** Stats of this item */
        this.stats = new SkyBlockStats();
    }
    static fromObject(object) {
        var _a, _b, _c, _d;
        let item = new SkyBlockItem();
        item.name = (_a = object["name"]) !== null && _a !== void 0 ? _a : "";
        item.rarity = Rarity.parseRarity((_b = object["rarity"]) !== null && _b !== void 0 ? _b : "COMMON");
        item.category = (_c = object["category"]) !== null && _c !== void 0 ? _c : "NONE";
        item.stats = SkyBlockStatsFunctions.fromObject((_d = object["stats"]) !== null && _d !== void 0 ? _d : {});
        return item;
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
intelligence,health_regeneration,farming_wisdom dist.js:164:13

Rift stats:
rift_Time
rift_health
rift_time,
RIFT_TIME,
rift_damage
*/
    SkyBlockStatsFunctions.mapping = {
        "damage": ["DAMAGE", "damage"],
        "health": ["HEALTH", "health"],
        "defense": ["DEFENSE", "defense"],
        "strength": ["STRENGTH", "strength"],
        "intelligence": ["INTELLIGENCE", "intelligence"],
        "critChance": ["CRIT_CHANCE", "crit_chance"],
        "bonusAttackSpeed": ["ATTACK_SPEED", "attack_speed"],
        "abilityDamage": ["ABILITY_DAMAGE", "ability_damage"],
        "trueDefense": ["TRUE_DEFENSE", "true_defense"],
        "ferocity": ["FEROCITY", "ferocity"],
        "healthRegem": ["HEALTH_REGENERATION", "health_regeneration"],
        "vitality": ["VITALITY", "vitality"],
        "mending": ["MENDING", "mending"],
        "swingRange": ["SWING_RAMGE", "swing_range"],
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
