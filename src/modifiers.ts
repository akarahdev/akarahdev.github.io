interface Modifier {
    modify(item: SkyBlockItem): void
}

class Stars implements Modifier {
    stars = 0;

    public constructor(stars: number) {
        this.stars = stars;
    }

    modify(item: SkyBlockItem): void {
        item.stats = SkyBlockStatsFunctions.multiply(item.stats, (this.stars * 0.02)+1);
    }
}

class HotPotatoBooks implements Modifier {
    amount = 0;

    public constructor(amount: number) {
        this.amount = amount;
    }

    modify(item: SkyBlockItem): void {
        console.log(this.amount);
        console.log(item.category);
        switch(item.category) {
            case Category.HELMET || Category.CHESTPLATE || Category.LEGGINGS || Category.BOOTS:
                console.log("armor");
                item.stats.health += 4 * this.amount;
                item.stats.defense += 2 * this.amount;
                break;
            case Category.SWORD || Category.BOW || Category.LONGSWORD:
                console.log("weapon fr");
                item.stats.damage += 2 * this.amount;
                item.stats.strength += 2 * this.amount;
                break;
        }
        console.log(item);
    }
}

class ReforgeModifier implements Modifier {
    reforge = Reforge.NONE;

    public constructor(reforge: Reforge) {
        this.reforge = reforge;
    }

    modify(item: SkyBlockItem): void {
        item.stats = SkyBlockStatsFunctions.add(
            item.stats,
            Reforge.getStats(this.reforge, item.category, item.rarity)
        );
    }
}

enum Reforge {
    NONE,
    ANCIENT,
    NECROTIC,
    REINFORCED,
    PERFECT
}

namespace Reforge {
    export function getStats(reforge: Reforge, category: Category, rarity: Rarity): SkyBlockStats {
        let rt = new SkyBlockStats();
        let n = Rarity.toNumber(rarity);
        switch(reforge) {
            case Reforge.NONE:
                return new SkyBlockStats();
            case Reforge.ANCIENT:
                rt.strength += [4, 8, 12, 18, 25, 35, 35][n];
                rt.critChance += [3, 5, 7, 9, 12, 15, 15][n];
                rt.health += 7;
                rt.defense += 7;
                rt.intelligence += [6, 9, 12, 16, 20, 25, 25][n];
                break;
            case Reforge.NECROTIC:
                rt.intelligence += [30, 60, 90, 120, 150, 200][n];
                break;
            case Reforge.REINFORCED || Reforge.PERFECT:
                rt.defense += [25, 35, 50, 65, 80, 110, 110][n];
                break;
        }
        return rt;
    }

    export function fromString(string: string): Reforge {
        switch(string) {
            case "Ancient": return Reforge.ANCIENT;
            case "Necrotic": return Reforge.NECROTIC;
            case "Reinforced": return Reforge.REINFORCED;
            case "Perfect": return Reforge.PERFECT;
        }
        return Reforge.NONE;
    }
}