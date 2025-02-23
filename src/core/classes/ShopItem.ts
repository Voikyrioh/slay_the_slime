export default interface ShopItem {
    name: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    cost: number;
    id: number;
    readonly type: "Weapon" | "Upgrade" | "Skin";
}
