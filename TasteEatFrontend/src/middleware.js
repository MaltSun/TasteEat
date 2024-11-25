
const saveToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cart', serializedState);
    } catch (e) {
      console.warn(e);
    }
  };
  
  const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('cart');
      if (serializedState === null) return undefined;
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  };
  
  const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action); 
    saveToLocalStorage(store.getState()); 
    return result;
  };
  
  export { loadFromLocalStorage, cartMiddleware };