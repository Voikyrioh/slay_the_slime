import Weapon from "./Weapon.ts";
import type ShopItem from "./ShopItem.ts";
import Upgrade from "./Upgrade.ts";

export default class Player {
    inventory: Map<number, ShopItem> = new Map();
    level: number = 1;
    equipedWeapon: Weapon | undefined;

    constructor() {}

    damage(): number {
        let dmg = 1;

        dmg += this.equipedWeapon?.damage ?? 0;
        this.inventory.forEach(item => {
            if (item instanceof Upgrade) {
                if(item.getDamageModifier) dmg = item.getDamageModifier(dmg)
            }
        })

        return dmg;
    }

    useWeapon(id: number) {
        if (this.inventory.get(id) && this.inventory.get(id) instanceof Weapon) {
            this.equipedWeapon = this.inventory.get(id) as Weapon;
        }
    }

    addItem(item: ShopItem) {
        this.inventory.set(item.id, item);
    }
}
