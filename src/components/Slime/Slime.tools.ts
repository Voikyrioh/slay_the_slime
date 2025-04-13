export const SlimeHurtKeyframe: { keyFrames: Keyframe[], options: KeyframeAnimationOptions } = {
    keyFrames: [
        //from
        {
            backgroundColor: 'var(--slime-color)',
            border: 'var(--slime-border)',
            color: 'var(--slime-face-color)',
            transform: 'scaleX(1) scaleY(1)',
        },
        //50%
        {
            backgroundColor: 'var(--slime-hurt-color)',
            border: 'solid var(--slime-hurt-border-color)',
            color: 'var(--slime-hurt-border-color)',
            transform: 'scaleX(1.1) scaleY(0.8)',
        },
        //to
        {
            backgroundColor: 'var(--slime-color)',
            border: 'var(--slime-border)',
            color: 'var(--slime-face-color)',
            transform: 'scaleX(1) scaleY(1)',
        }
    ],
    options: {
        duration: 400,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 2.3)'
    }
}

export const SlimeSurpriseKeyframe: { keyFrames: Keyframe[], options: KeyframeAnimationOptions } = {
    keyFrames: [
        //from
        {
            transform: "scaleX(1) scaleY(1)",
        },
        //50%
        {
            transform: "scaleX(1.1) scaleY(1.6)",
        },
        //to
        {
            transform: "scaleX(1) scaleY(1)",
        },
    ],
    options: {
        duration: 400,
        easing: 'cubic-bezier(0.1, 0.8, 0.3, 2.3)'
    }
}

export const SlimeTrembleKeyframe: { keyFrames: Keyframe[], options: KeyframeAnimationOptions } = {
    keyFrames: [
        //from
        {
            transform: "translateX(0)",
        },
        //33%
        {
            transform: "translateX(-4px)",
        },
        //66%
        {
            transform: "translateX(4px)",
        },
        //to
        {
            transform: "translateX(0)",
        },
    ],
    options: {
        duration: 200,
        easing: 'ease-in-out',
        iterations: Infinity,
    }
}

export type SlimeElementKeyframes = 'hit' | 'trembling' | 'fear';

export enum States {
    blink,
    crying,
    outraged,
    dead,
    hurt,
    normal,
    trembling,
    cute,
}

export class OngoingState {
    private timeout!: number;
    public readonly observable: Promise<null>;

    constructor(
        public readonly state: States,
        private readonly cancelCallback: () => void,
        timeout: number,
    ) {
        this.observable = new Promise(resolve => {
            this.timeout = setTimeout(() => {
                this.cancel();
                resolve(null);
            }, timeout);
        })
    }

    cancel() {
        this.timeout && clearTimeout(this.timeout);
        this.cancelCallback();
    }
}
