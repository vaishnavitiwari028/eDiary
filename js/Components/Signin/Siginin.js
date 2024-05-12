import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import { signin } from "../../firebase/firebaseAuth.js";
import routeTo from "../../index.js";
import { notifyUser } from "../../notification.js";
import signinHtml from "./SigninHTML.js";

class Signin extends Component {
  constructor() {
    super(signinHtml);
  }
  afterRender() {
    listen(select("#signin_form"), "submit", (e) => {
      e.preventDefault();
      select(".signin_submit_btn").classList.add("btn_loading");
      let email = select("#input_email_signin").value;
      let password = select("#input_password_signin").value;

      signin(email, password)
        .then((user) => {
          sessionStorage.setItem("UID", user.uid);
          routeTo("dashboard", user.uid);
        })
        .catch((err) => {
          select(".signin_submit_btn").classList.remove("btn_loading");
          notifyUser(
            err.message ||
              err.code ||
              "SignIn failed, check your internet connection and Please Try Again",
            "bad"
          );
        });
    });
  }
}

export default Signin;
