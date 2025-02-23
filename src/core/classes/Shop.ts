import Weapon from "./Weapon.ts";
import Upgrade from "./Upgrade.ts";
import type Player from "./Player.ts";
import type ShopItem from "./ShopItem.ts";

type ItemRule = {
    levelRequirement: number;
    preRequirements: number[];
    item: ShopItem
}

export default class {
    availableWeapons: Weapon[] = [];
    availableUpgrades: Upgrade[] = [];
    availableSkins: [] = [];

    private availableShop : Map<number, ShopItem> = new Map();
    private shopDictionnary: Map<number, ItemRule> = new Map([
        [1, {
            levelRequirement: 0,
            preRequirements: [],
            item: new Weapon(
                "Chopchop",
                "chopchop does what any chopchop would do, like chopping wood or innocent baby slimes and their family...",
                "/upgrades/chopchop.webp",
                "Big axe with slime residue",
                25,
                1,
                1,
            )
        }],
        [2, {
            levelRequirement: 0,
            preRequirements: [],
            item: new Upgrade(
            "Sharpener",
                "A tool to sharpen make something sharp, sharper.",
                "/upgrades/sharpener.webp",
                "Smithing stone",
                50,
                2,
            )
        }],
        [3, {
            levelRequirement: 0,
            preRequirements: [1, 2],
            item: new Weapon(
                "Sharp Aiguisé",
                "A Chopchop that chopchop but better !",
                "/upgrades/sharpchopchop.webp",
                "Big axe with slime residue",
                100,
                3,
                3,
            )
        }]
    ])

    constructor() {}

    updateShopList(player: Player): void {
        this.availableShop.clear();
        this.shopDictionnary.forEach((weaponRule) => {
            if (
                player.level >= weaponRule.levelRequirement &&
                !player.inventory.get(weaponRule.item.id) &&
                (!weaponRule.preRequirements.length || weaponRule.preRequirements.every(prerequisite => player.inventory.get(prerequisite)))
            ) {
                this.availableShop.set(weaponRule.item.id, weaponRule.item);
            }
        });

        this.availableWeapons = [...this.availableShop.values()].filter(item => item instanceof Weapon);
        this.availableUpgrades = [...this.availableShop.values()].filter(item => item instanceof Upgrade);
    }

    buy(id: number): ShopItem | undefined {
        const itm = this.availableShop.get(id);
        if (itm) {
            this.availableShop.delete(id);
            return itm;
        }
        return undefined;
    }
}
