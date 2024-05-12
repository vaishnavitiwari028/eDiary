import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import routeTo from "../../index.js";
import intermediateHtml from "./IntermediateHTML.js";

class IntermediateHTML extends Component {
  constructor(uid) {
    super(intermediateHtml, { uid });
  }
  afterRender() {
    let uid = this.props.uid;
    listen(select(".continue_btn"), "click", () => {
      routeTo("dashboard", uid);
    });
  }
}

export default IntermediateHTML;
