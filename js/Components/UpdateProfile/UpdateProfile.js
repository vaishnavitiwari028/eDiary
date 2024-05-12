import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import { getUserData, updateUserData } from "../../firebase/firebaseDb.js";
import { notifyUser } from "../../notification.js";
import updateProfileHTML from "./UpdateProfileHTML.js";
class Dashboard extends Component {
  constructor({ uid }) {
    super(updateProfileHTML, { uid });
    if (!this.props.uid) {
      this.props = { ...this.props, uid: sessionStorage.getItem("UID") };
    }
  }

  updateInputs(firstname, lastname, gender) {
    if (firstname) select("#update_user_firstname_input").value = firstname;
    if (lastname) select("#update_user_lastname_input").value = lastname;
    if (gender) select(`#update_user_gender_${gender}`).checked = true;
  }

  afterRender(isUpdated) {
    if (isUpdated || sessionStorage.getItem("USER_DATA") === null) {
      getUserData(this.props.uid).then((data) => {
        this.updateInputs(data.firstname, data.lastname, data.gender);
        sessionStorage.setItem("USER_DATA", JSON.stringify(data));
      });
    } else {
      let storedData = JSON.parse(sessionStorage.getItem("USER_DATA"));
      this.updateInputs(
        storedData.firstname,
        storedData.lastname,
        storedData.gender
      );
    }

    if (!isUpdated) {
      listen(select(".update_profile_btn"), "click", () => {
        select(".update_profile_btn").classList.add("btn_loading");
        let firstname = select("#update_user_firstname_input").value;
        let lastname = select("#update_user_lastname_input").value;
        let gender = select("#update_user_gender_male").checked
          ? "male"
          : select("#update_user_gender_female").checked
          ? "female"
          : select("#update_user_gender_other").checked
          ? "other"
          : "";
        updateUserData(this.props.uid, { firstname, lastname, gender }).then(
          () => {
            notifyUser("Your profile is updated");
            select(".update_profile_btn").classList.remove("btn_loading");
            this.afterRender(true);
          }
        );
      });
    }
  }
}

export default Dashboard;
