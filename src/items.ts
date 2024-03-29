let items: { [s: string]: SkyBlockItem } = {};

fetch("https://api.hypixel.net/v2/resources/skyblock/items")
    .then((res) => {
        res.json().then((json) => {
            let tempItems: { [s: string]: any; }[] = json["items"];
            tempItems.forEach((it) => {
                items[it["name"]] = SkyBlockItem.fromObject(it);
            });
            setupPage();
        });
    });

function setupPage() {
    console.log(items);

    let categories: string[] = [];
    let stats: string[] = [];

    Object.keys(items).forEach((key) => {
        let it = items[key];
        let category = it["category"];

        let option = document.createElement("option");
        option.value = it["name"];

        

        switch(category) {
            case Category.HELMET:
                document.getElementById("helmet-list")!!.appendChild(option);
                break;
            case Category.CHESTPLATE:
                document.getElementById("chestplate-list")!!.appendChild(option);
                break;
            case Category.LEGGINGS:
                document.getElementById("leggings-list")!!.appendChild(option);
                break;
            case Category.BOOTS:
                document.getElementById("boots-list")!!.appendChild(option);
                break;
            case Category.NECKLACE:
                document.getElementById("necklace-list")!!.appendChild(option);
                break;
            case Category.CLOAK:
                document.getElementById("cloak-list")!!.appendChild(option);
                break;
            case Category.BELT:
                document.getElementById("belt-list")!!.appendChild(option);
                break;
            case Category.GLOVES:
                document.getElementById("gloves-list")!!.appendChild(option);
                break;
            case Category.BRACELET:
                document.getElementById("gloves-list")!!.appendChild(option);
                break;
            case Category.SWORD || Category.BOW || Category.LONGSWORD || Category.AXE || Category.PICKAXE || Category.HOE:
                document.getElementById("mainhand-list")!!.appendChild(option);
                break;
        }
    });
    

    console.log(`categories: ${categories}`);
    console.log(`stats: ${stats}`);

    let slots = [
        "helmet",
        "chestplate",
        "leggings",
        "boots",
        "necklace",
        "cloak",
        "belt",
        "gloves"
    ];
    slots.forEach((slot) => {
        document.getElementById(`${slot}-input`)?.addEventListener("change", () => {
            setTimeout(calculateStats, 50);
        });
        document.getElementById(`${slot}-stars`)?.addEventListener("change", () => {
            setTimeout(calculateStats, 50);
        });
        document.getElementById(`${slot}-reforge`)?.addEventListener("change", () => {
            setTimeout(calculateStats, 50);
        });
        document.getElementById(`${slot}-enchants`)?.addEventListener("change", () => {
            setTimeout(calculateStats, 50);
        });
        document.getElementById(`${slot}-hpbs`)?.addEventListener("click", () => {
            console.log((document.getElementById(`${slot}-hpbs`) as HTMLInputElement).checked);
            setTimeout(calculateStats, 50);
        });
        document.getElementById(`${slot}-fpbs`)?.addEventListener("click", () => {
            setTimeout(calculateStats, 50);
        });
        document.getElementById(`${slot}-recombed`)?.addEventListener("click", () => {
            setTimeout(calculateStats, 50);
        });
    });

    calculateStats();
}