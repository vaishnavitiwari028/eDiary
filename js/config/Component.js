import { select } from "../DOMhelpers.js";
const executeAfterRender = async (pageFunctions) => {
  await pageFunctions();
};
let v = (function () {
  function* uniqGen() {
    let i = Math.ceil(Math.random() * Date.now());
    while (true) {
      yield i++;
    }
  }
  let gen = uniqGen();
  return () => gen.next().value;
})();

class Component {
  constructor(html, props = {}, parent = select("#root"), position) {
    this.parent = parent;
    this.html = html;
    this.props = props;
    this.position = position;
    this.cleanUptasks = [];
    this.render();
    executeAfterRender(this.afterRender.bind(this, this.args));

    this.unMount = () => {
      if (typeof this.cleanUp === "function") {
        this.cleanUp();
      }
      if (this.cleanUptasks.length) {
        this.cleanUptasks.forEach((fn) => {
          fn();
        });
      }
      if (this.props.key) {
        console.log(this);
        [...this.parent.children]
          .find((child) => child.getAttribute("key") === this.props.key)
          .remove();
      } else {
        this.parent.innerHTML = "";
      }
    };
  }
  render() {
    let key = v() + "";
    this.props.key = key;
    let configedHtml = `<div key=${key}>${this.html}</div>`;
    if (this.position) {
      console.log(this.position);
      this.parent.insertAdjacentHTML(this.position, configedHtml);
    } else this.parent.innerHTML = configedHtml;

    let config = {
      attributes: true,
      attributeOldValue: true,
      childList: true,
      subtree: true,
    };
    const callBack = (mutationsList, observer) => {
      mutationsList[0].removedNodes.forEach((each) => {
        let removedNodeKey = each.getAttribute("key");
        console.log(removedNodeKey);
        if (typeof this.cleanUp === "function") {
          this.cleanUp();
        }
        if (this.cleanUptasks.length) {
          this.cleanUptasks.forEach((fn) => {
            fn();
          });
        }

        observer.disconnect();
      });
    };
    let observer = new MutationObserver(callBack);
    observer.observe(this.parent, config);
  }
}

export default Component;
