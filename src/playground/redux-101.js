import { createStore } from 'redux';


const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});
const store = createStore((state = { count: 0 }, action) => {
    switch(action.type){
        case 'INCREMENT':
            return { count: state.count + action.incrementBy };
            
        
        case 'DECREMENT':
            const decBy = typeof action.value === 'number' ? action.value : 1;
            return { count: state.count - decBy };

        case 'RESET':
            return { count: 0 };

        case 'SET':
            if(action.value){
                return { count: action.value };
            }
            
        
        default:
            return state;
    }
});

store.subscribe(() => console.log(store.getState()));

store.dispatch(incrementCount({ incrementBy: 'ello' }));
