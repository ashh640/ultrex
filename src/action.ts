export interface Action<T = {}> {

    /**
     * This function will be called by the store to update the state.
     * This should return a new instance of the state object
     */
    apply(state: T): T;
}