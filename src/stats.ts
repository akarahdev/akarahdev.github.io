class SkyBlockItem {
    /** Name of this item. */
    name = "";
    /** Rarity of the item (e.g COMMON, RARE, etc.) */
    rarity: Rarity = Rarity.COMMON;
    /** Category of this item (e.g SWORD, BOW) */
    category = "";
    /** Stats of this item */
    stats = new SkyBlockStats();

    static fromObject(object: {[k: string]: any}): SkyBlockItem {
        let item = new SkyBlockItem();
        item.name = object["name"] ?? "";
        item.rarity = Rarity.parseRarity(object["rarity"] ?? "COMMON");
        item.category = object["category"] ?? "NONE";
        item.stats = SkyBlockStatsFunctions.fromObject(object["stats"] ?? {});
        return item;
    }
}



class SkyBlockStats {
    /**
     * Generates a SkyBlockStats object from a JS object.
     */
    damage = 0;
    health = 0;
    defense = 0;
    strength = 0;
    intelligence = 0;
    critChance = 0;
    critDamage = 0;
    bonusAttackSpeed = 0;
    abilityDamage = 0;
    trueDefense = 0;
    ferocity = 0;
    healthRegen = 0;
    vitality = 0;
    mending = 0;
    swingRange = 0;

    riftTime = 0;
    riftDamage = 0;
    riftIntelligence = 0;
    riftManaRegen = 0;
    riftHealth = 0;
}

namespace SkyBlockStatsFunctions {
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
rift_time
RIFT_TIME
rift_damage
rift_walk_speed
rift_intelligence
rift_mana_regen
RIFT_INTELLIGENCE
rift_health
*/

    export let mapping: {[k: string]: string[]} = {
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
        "riftTime": ["RIFT_TIME", "rift_Time", "rift_time"],
        "riftDamage": ["RIFT_DAMAGE", "rift_damage"],
        "riftIntelligence": ["RIFT_INTELLIGENCE", "rift_intelligence"],
        "riftManaRegen": ["RIFT_MANA_REGEN", "rift_mana_regen"],
        "riftHealth": ["RIFT_HEALTH", "rift_health"],
    };

    export function fromObject(object: {[k: string]: number | null}): SkyBlockStats {
        let statsObject = new SkyBlockStats();

        Object.keys(SkyBlockStatsFunctions.mapping).forEach((key) => {
            SkyBlockStatsFunctions.mapping[key].forEach((value) => {
                // @ts-ignore
                // Safety: Only properties of type `number` will be accessed, unless
                // the programmer does something wrong.
                statsObject[key as keyof SkyBlockStats] += object[value] ?? 0
            })
        });

        return statsObject;
    }

    export function add(lhs: SkyBlockStats, rhs: SkyBlockStats): SkyBlockStats {
        let statsObject = new SkyBlockStats();

        Object.keys(SkyBlockStatsFunctions.mapping).forEach((key) => {
            statsObject[key as keyof SkyBlockStats] += (rhs[key as keyof SkyBlockStats]) + (lhs[key as keyof SkyBlockStats]);
            console.log(`${statsObject[key as keyof SkyBlockStats]} += ${(rhs[key as keyof SkyBlockStats]) + (lhs[key as keyof SkyBlockStats])}`)
        });

        return statsObject
    }

    
}


