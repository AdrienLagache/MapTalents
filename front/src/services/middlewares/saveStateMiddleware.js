// export function loadStateFromLocalStorage() {
//   try {
//     const serializedState = localStorage.getItem('appState');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Error loading state from localStorage:', error);
//     return undefined;
//   }
// }

// export function saveStateToLocalStorage(state) {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('appState', serializedState);
//   } catch (error) {
//     console.error('Error saving state to localStorage:', error);
//   }
// }

// const saveStateMiddleware = (store) => (next) => (action) => {
//   next(action);

//   if (store.getState().auth.logged) {
//     saveStateToLocalStorage(store.getState());
//   }
// };

// export default saveStateMiddleware;
