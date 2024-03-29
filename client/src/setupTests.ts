// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
global.crypto = require('crypto');

export const mockLocalStorage = () => {
    const setItemMock = jest.fn();
    const getItemMock = jest.fn();
  
    beforeEach(() => {
      Storage.prototype.setItem = setItemMock;
      Storage.prototype.getItem = getItemMock;
    });
  
    afterEach(() => {
      setItemMock.mockRestore();
      getItemMock.mockRestore();
    });
  
    return { setItemMock, getItemMock };
  };