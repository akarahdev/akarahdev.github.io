/** Represents the rarity of a SkyBlock item. */
enum Rarity {
    COMMON,
    UNCOMMON,
    RARE,
    EPIC,
    LEGENDARY,
    MYTHIC,
    DIVINE,
    SPECIAL,
    VERY_SPECIAL
}

namespace Rarity {
    export function parseRarity(rarity: string): Rarity {
        switch(rarity) {
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
}