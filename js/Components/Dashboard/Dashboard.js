import { animateFlip } from "../../animateFLIP.js";
import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import { getUserData } from "../../firebase/firebaseDb.js";
import routeTo from "../../index.js";
import AvatarInfo from "../AvatarInfo/AvatarInfo.js";
import dashboardHtml from "./DashboardHTML.js";

class Dashboard extends Component {
  constructor(uid) {
    super(dashboardHtml, { uid: uid || sessionStorage.getItem("UID") });
    if (sessionStorage.USER_DATA) {
      let { firstname, gender } = JSON.parse(
        sessionStorage.getItem("USER_DATA")
      );
      new AvatarInfo(firstname, gender, select(".avatar_container"));
    } else {
      getUserData(this.props.uid).then((data) => {
        sessionStorage.setItem("USER_DATA", JSON.stringify(data));
        let { firstname, gender } = data;
        new AvatarInfo(firstname, gender, select(".avatar_container"));
      });
    }
  }
  afterRender() {
    listen(select(".go_to_profile"), "click", (e) => {
      animateFlip(e.target, {}, () => {
        routeTo("/profile", { uid: this.props.uid });
      });
    });
    listen(select(".go_to_diary"), "click", (e) => {
      animateFlip(e.target, {}, () => {
        routeTo("/diary", { uid: this.props.uid });
      });
    });
    listen(select(".logout_btn"), "click", () => {
      sessionStorage.clear();
      routeTo("/signin");
    });
  }
}

export default Dashboard;
