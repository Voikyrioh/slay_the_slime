import Player from "./Player.ts";
import Shop from "./Shop.ts";
import Observable from "./Observable.ts";
import Weapon from "./Weapon.ts";

export default class Gameplay {
    static TICK_RATE = 1000;

    player: Player = new Player();
    shop: Shop = new Shop();
    updateEvent = new Observable<void>();

    private money: number = 0;
    private eventLoopQueue: Map<string, ()=>void> = new Map();

    constructor() {
        this.addEventToQueue(() => this.shop.updateShopList(this.player));
        this.startEventLoop();
    }

    private startEventLoop() {
        requestAnimationFrame((t0) => this.eventLoop(t0));
    }

    private eventLoop(t0: DOMHighResTimeStamp) {
        requestAnimationFrame((t1) => {
            if ((t1 - t0) < Gameplay.TICK_RATE) {
                this.updateEvent.emit();
                this.eventLoop(t0)
                return;
            }

            this.eventLoopQueue.forEach(event => event());
            this.updateEvent.emit();
            this.eventLoop(t1)
        });
    };

    buyItem(id: number) {
        const item = this.shop.buy(id);
        if (item && item.cost <= this.money) {
            this.player.addItem(item);
            if (item instanceof Weapon) {
                this.player.useWeapon(item.id);
            }
            this.updateMoney(this.money - item.cost)
            this.updateEvent.emit();
        }
    }

    addEventToQueue(event: ()=>void): string {
        const newId = crypto.randomUUID()
        this.eventLoopQueue.set(newId, event);

        return newId;
    }

    damageSlime(dmg: number) {
        this.updateMoney(this.money + dmg);
    }

    removeEventToQueue(eventId: string) {
        this.eventLoopQueue.delete(eventId);
    }

    hitSlime() {
        this.updateMoney(this.money + this.player.damage());
    }

    private updateMoney(n: number) {
        this.money = n;
        this.updateEvent.emit();
    }

    getMoney(): number {
        return this.money;
    }
}
