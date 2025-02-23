import type ShopItem from "./ShopItem.ts";

export default class Upgrade implements ShopItem {
    readonly type = "Upgrade";

    constructor(
        public name: string,
        public description: string,
        public imageUrl: string,
        public imageAlt: string,
        public cost: number,
        public id: number,
        public eventTick?: () => void,
        public getDamageModifier?: (damage: number) => number,
    ) {
    }
}
