// Store class for managing state
class Store {
    // Constructor initializes the store with a reducer and an initial state
    constructor(reducer, initialState) {
        this.reducer = reducer;  // Reducer function to handle state transitions
        this.state = initialState;  // Initial state of the store
        this.listeners = [];  // List of subscriber functions to be called on state change
    }

    // Returns the current state of the store
    getState() {
        return this.state;
    }

    // Accepts an action, updates the state using the reducer, and notifies subscribers
    dispatch(action) {
        this.state = this.reducer(this.state, action);  // Update state using the reducer
        this.listeners.forEach(listener => listener());  // Notify each subscriber
    }

    // Adds a listener function to the list of subscribers
    subscribe(listener) {
        this.listeners.push(listener);  // Add the listener to the list
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);  // Remove the listener
        };
    }
}

// Initial state object for the counter
const initialState = { count: 0 };

// Reducer function to handle actions and update the state accordingly
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + 1 };  // Increment the count
        case 'SUBTRACT':
            return { count: state.count - 1 };  // Decrement the count
        case 'RESET':
            return { count: 0 };  // Reset the count to zero
        default:
            return state;  // Return the current state if action type is unrecognized
    }
}

// Create a store instance with the counterReducer and initialState
const store = new Store(counterReducer, initialState);

// Subscribe to state changes and log the new state to the console whenever it changes
store.subscribe(() => {
    console.log(store.getState());
});

// Define functions to dispatch actions for incrementing, decrementing, and resetting the counter

// Function to dispatch an ADD action
function increment() {
    store.dispatch({ type: 'ADD' });
}

// Function to dispatch a SUBTRACT action
function decrement() {
    store.dispatch({ type: 'SUBTRACT' });
}

// Function to dispatch a RESET action
function reset() {
    store.dispatch({ type: 'RESET' });
}

// Initial State Verification
console.log("Initial State:", store.getState()); // { count: 0 }


// Scenario 2: Incrementing the Counter
store.dispatch({ type: 'ADD' }); // { count: 1 }
/store.dispatch({ type: 'ADD' }); // { count: 2 }

// Scenario 3: Decrementing the Counter
store.dispatch({ type: 'SUBTRACT' }); // { count: 1 }

// Scenario 4: Resetting the Counter
store.dispatch({ type: 'RESET' }); // { count: 0 }
