export type Subscriber<T> = (data: T) => void;
export type Subscription = { id: string };

export default class Observable<T> {
    #subscribers: Map<string, Subscriber<T>> = new Map();
    #lastEvent: T | undefined;

    constructor<T>() {}

    static from<T>(data: Promise<T>): Observable<T> {
        const observable = new Observable<T>();
        data.then(promiseResponse => observable.emit(promiseResponse));
        return observable;
    }

    subscribe(callback: Subscriber<T>): Subscription {
        const id = crypto.randomUUID();
        this.#subscribers.set(id, callback);
        if ( this.#lastEvent) callback(this.#lastEvent);

        return { id };
    }

    unsubscribe(subscription: Subscription): void {
        this.#subscribers.delete(subscription.id);
    }

    emit(data: T) {
        this.#lastEvent = data;
        this.#subscribers.forEach((callback) => {
            callback(data)
        });
    }
}
