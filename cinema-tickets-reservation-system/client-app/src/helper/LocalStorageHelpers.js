/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

class LocalStorageHelpers {
  saveStateToLocalStorage = (state) => {
    for (const key in state) {
      localStorage.setItem(key, JSON.stringify(state[key]));
    }
  };

  removeStateFromLocalStorage = (state) => {
    for (const key in state) {
      localStorage.removeItem(key, JSON.stringify(state[key]));
    }
  };

  /* hydrateStateWithLocalStorage = (state) => {
    for (const key in state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }; */
}

const reservationHelpers = new LocalStorageHelpers();

export default reservationHelpers;
