import Gameplay from "./classes/Gameplay.ts";
import {customRef} from "vue";


export const game = customRef<Gameplay>((track, trigger) => {
    const gameInstance = new Gameplay();
    gameInstance.updateEvent.subscribe(() => {
        trigger();
    });
    return {
        get: () => {
            track();
            return gameInstance
        },
        set: () => {}
    }
});
