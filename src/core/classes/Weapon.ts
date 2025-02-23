import type ShopItem  from "./ShopItem.ts";

export default class Weapon implements ShopItem {
    readonly type = "Weapon";

    constructor(
        public name: string,
        public description: string,
        public imageUrl: string,
        public imageAlt: string,
        public cost: number,
        public id: number,
        public damage: number
    ) {};
}
