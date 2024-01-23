
/** Represents the category of a SkyBlock item. */
enum Category {
    REFORGE_STONE,
    SWORD,
    BOOTS,
    BELT,
    NECKLACE,
    GLOVES,
    HELMET,
    CHESTPLATE,
    ACCESSORY,
    CLOAK,
    LEGGINGS,
    AXE,
    HOE,
    COSMETIC,
    MEMENTO,
    FISHING_ROD,
    FISHING_WEAPON,
    BAIT,
    PET_ITEM,
    WAND,
    PORTAL,
    BOW,
    NONE,
    DUNGEON_PASS,
    ARROW,
    SPADE,
    PICKAXE,
    DEPLOYABLE,
    DRILL,
    SHEARS,
    BRACELET,
    LONGSWORD,
    GAUNTLET,
    TRAVEL_SCROLL,
    ARROW_POISON,
    VACUUM
}

namespace Category {
    export function parseCategory(category: string): Category {
        switch(category) {
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
}
