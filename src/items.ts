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

        if(!categories.includes(it["category"])) {
            categories.push(it["category"]);
        }

        if(it["stats"] != null && it["stats"] != undefined) {
            Object.keys(it["stats"] as {[s: string]: any}).forEach((it) => {
                if(!stats.includes(it)) {
                    stats.push(it);
                }
            });
        }

        switch(category) {
            case "HELMET":
                document.getElementById("helmet-list")!!.appendChild(option);
                break;
            case "CHESTPLATE":
                document.getElementById("chestplate-list")!!.appendChild(option);
                break;
            case "LEGGINGS":
                document.getElementById("leggings-list")!!.appendChild(option);
                break;
            case "BOOTS":
                document.getElementById("boots-list")!!.appendChild(option);
                break;
            case "NECKLACE":
                document.getElementById("necklace-list")!!.appendChild(option);
                break;
            case "CLOAK":
                document.getElementById("cloak-list")!!.appendChild(option);
                break;
            case "BELT":
                document.getElementById("belt-list")!!.appendChild(option);
                break;
            case "GLOVES":
                document.getElementById("gloves-list")!!.appendChild(option);
                break;
            case "BRACELET":
                document.getElementById("gloves-list")!!.appendChild(option);
                break;
            case "SWORD":
                document.getElementById("mainhand-list")!!.appendChild(option);
                break;
            case "BOW":
                document.getElementById("mainhand-list")!!.appendChild(option);
                break;
            case "LONGSWORD":
                document.getElementById("mainhand-list")!!.appendChild(option);
                break;
            case "AXE":
                document.getElementById("mainhand-list")!!.appendChild(option);
                break;
            case "PICKAXE":
                document.getElementById("mainhand-list")!!.appendChild(option);
                break;
            case "HOE":
                document.getElementById("mainhand-list")!!.appendChild(option);
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
        document.getElementById(slot)!!.addEventListener("change", calculateStats)
    });

    calculateStats();
}