import Component from "../../config/Component.js";
import AvatarInfoHtml from "./AvatarInfoHTML.js";

class AvatarInfo extends Component {
  constructor(name, gender, parent) {
    super(AvatarInfoHtml(name, gender), {}, parent);
  }
  afterRender() {}
}

export default AvatarInfo;
