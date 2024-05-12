import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import { signup } from "../../firebase/firebaseAuth.js";
import { createUserData } from "../../firebase/firebaseDb.js";
import { notifyUser } from "../../notification.js";
import IntermediatePage from "../IntermediatePage/IntermediatePage.js";
import signupHtml from "./SignupHTML.js";

class Signup extends Component {
  constructor() {
    super(signupHtml);
  }
  afterRender() {
    listen(select("#signup_form"), "submit", (e) => {
      e.preventDefault();
      select(".register_submit_btn").classList.add("btn_loading");
      let email = select("#input_email_register").value;
      let password = select("#input_password_register").value;
      signup(email, password)
        .then((user) => {
          let userUid = user.uid;
          let firstname = select("#input_firstname_register").value;
          let lastname = select("#input_lastname_register").value;
          let gender = select("#gendermale").checked
            ? "male"
            : select("#genderfemale").checked
            ? "female"
            : select("#genderother").checked
            ? "other"
            : "";

          createUserData(userUid, { firstname, lastname, gender });
          new IntermediatePage(userUid);
        })
        .catch((err) => {
          select(".register_submit_btn").classList.remove("btn_loading");
          notifyUser(
            err.message ||
              err.code ||
              "SignUp failed, check your internet connection and Please Try Again",
            "bad"
          );
        });
    });
  }
}

export default Signup;
