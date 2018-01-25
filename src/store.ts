import { Action } from "./action";

export class Store<T> {

    private _subscriptions: StoreSubscription[] = [];

    constructor(private _state: T = {} as T) { }

    /**
     * Dispatch a new action to update the state
     * @param action the instance of an action to update
     */
    dispatch(action: Action<T>): void {
        
        // get the new state
        const state = action.apply(this._state);

        // if the state has changed then notify subscribers
        if (state !== this._state) {

            // store the new state
            this._state = state;

            // notify subscribers
            this.notify(action);
        }
    }

    /**
     * Subscribe to changes to the state
     * @param listener This function will be called and passed the current state
     * @param type This optional parameter can be used to only be notified when particular actions are dispatched
     */
    subscribe(listener: (snapshot: T) => void, type: Action | null = null): void {
        this._subscriptions.push({ listener: listener, type: type });
    }

    /**
     * Remove a subscription
     * @param listener The callback to unsubscribe
     */
    unsubscribe(listener: (snapshot: T) => void): void {
        this._subscriptions = this._subscriptions.filter(subscription => subscription.listener !== listener);
    }

    /**
     * Returns a snapshot of the current state.
     * Modifying this object will not alter the state
     */
    getSnapshot(): T {
        return Object.assign({}, this._state);
    }

    /**
     * Notify all subscribers
     */
    private notify(action: Action): void {

        // get the current state
        const snapshot = this.getSnapshot();

        // find all subscriptions that need called and then call them
        this._subscriptions
            .filter(subscription => subscription.type === null || action instanceof (<any>subscription.type))
            .forEach(subscription => subscription.listener.call(this, snapshot))
    }
}

interface StoreSubscription {
    listener: (snapshot?: any) => void;
    type: Action | null;
}