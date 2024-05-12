import Dashboard from "./Components/Dashboard/Dashboard.js";
import Diary from "./Components/Diary/Diary.js";
import Signin from "./Components/Signin/Siginin.js";
import Signup from "./Components/Signup/Signup.js";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile.js";
import {
  enableDynamicRouting,
  enableLinks,
  enableRouting,
} from "./config/Router.js";
import enableNotification from "./notification.js";

let myRoutes = [
  {
    path: "/signin",
    view: Signin,
  },
  { path: "/signup", view: Signup },
  { path: "/dashboard", view: Dashboard },
  { path: "/diary", view: Diary },
  {
    path: "/profile",
    view: UpdateProfile,
  },
];

const mainRouting = enableRouting(myRoutes);
enableDynamicRouting(mainRouting);

const routeTo = (url, viewProps) => {
  mainRouting(url, viewProps);
  enableLinks(routeTo);
};
routeTo("./signin");

enableNotification();

export default routeTo;
