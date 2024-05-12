export const listen = (node, eventName, callback) => {
  node.addEventListener(eventName, callback);
  return () => {
    node.removeEventListener(eventName, callback);
  };
};

export const select = (selector, multiple = false) =>
  multiple
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
