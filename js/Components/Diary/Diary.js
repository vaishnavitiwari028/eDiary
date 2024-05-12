import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import { getUserDiary, setDiaryData } from "../../firebase/firebaseDb.js";
import { notifyUser } from "../../notification.js";
import { dateStringList, getDateIndex } from "../DatePicker/calender.js";
import DatePicker from "../DatePicker/DatePicker.js";
import diaryHtml from "./DiaryHTML.js";

class Diary extends Component {
  constructor(props, parent) {
    super(diaryHtml, { ...props }, parent);
    console.log(this.props);
    if (!this.props.uid) {
      this.props = { ...this.props, uid: sessionStorage.getItem("UID") };
    }
  }
  afterRender() {
    const diaryHolder = document.getElementById("diary_holder");
    let currentPage = [0, 1];
    let openBtn = document.getElementById("open_btn");
    let PagesLoaded = false;
    let diaryClosed = true;
    let todayPage = getDateIndex();
    let userDiary;
    let lastVisitedPages = [];
    console.log(this.props, history.state);
    let uid = this.props?.uid || history.state.uid;
    if (uid) {
      getUserDiary(uid).then((diary) => {
        userDiary = diary;
      });
    }

    let turnPages = (
      frontPage,
      backPage,
      lastPage,
      nextnextPage,
      isForword = true
    ) => {
      lastVisitedPages.forEach((each) => {
        each.style.display = "none";
      });
      frontPage.style.display = "block";
      backPage.style.display = "block";
      nextnextPage.style.display = "block";
      if (lastPage) {
        lastPage.style.display = "block";
      }
      requestAnimationFrame(() => frontPage.classList.toggle("rotation"));
      requestAnimationFrame(() => backPage.classList.toggle("rotation"));
      lastVisitedPages.push(frontPage, backPage, nextnextPage);
      if (lastPage) {
        lastVisitedPages.push(lastPage);
      }
      if (isForword) {
        currentPage = [currentPage[0] + 2, currentPage[1] + 2];
        if (lastPage) {
          lastPage.style.zIndex = 1;
        }
        backPage.style.zIndex = 100;
      }
      if (!isForword) {
        currentPage = [currentPage[0] - 2, currentPage[1] - 2];
        if (lastPage) {
          lastPage.style.zIndex = 100;
        }
        backPage.style.zIndex = 1;
      }
    };

    const loadPages = () => {
      let html = "";
      console.log(userDiary);
      for (let i = 365; i > 0; i--) {
        if (i % 2 === 1) {
          html += `
          <div class="page page_right" id="page${i}"  data-pageindex="${i}">
             <div class="not_rotated">
               <div class="page_index page_index_right">
                 ${dateStringList[i - 1]}
               </div>
               <form class="${i === todayPage ? "active_form" : ""}">
                 <textarea ${i === todayPage ? "" : "readonly"} 
                   class="${i === todayPage ? "active" : "inactive"}" 
                   placeholder=${
                     i === todayPage ? "start writing about today" : ""
                   } cols="30" rows="10">
                  ${userDiary ? userDiary[i] || "" : ""}
                   </textarea> 
                   ${
                     i === todayPage
                       ? "<button class='done_btn btn-sm'>Done</button>"
                       : ""
                   }
               </form>
               <button class="page_btn btn_go_right" id="btn${i}">
                 <i class="fas fa-arrow-right"></i>
               </button>
             </div>
           </div>`;
        } else if (i % 2 === 0) {
          html += `
           <div class="page page_left" id="page${i}" data-pageindex="${i}">
              <div class="is_rotated">
                 <div class="page_index page_index_left">
                   ${dateStringList[i - 1]}
                 </div>
                 <form class="${i === todayPage ? "active_form" : ""}">
                    <textarea ${i === todayPage ? "" : "readonly"}
                     class="${i === todayPage ? "active" : "inactive"}"
                     placeholder=${
                       i === todayPage ? "start writing about today" : ""
                     }cols="30" rows="10">
                     ${userDiary ? userDiary[i] || "" : ""}
                    </textarea>
                    ${
                      i === todayPage
                        ? "<button class='done_btn btn-sm'>Done</button>"
                        : ""
                    }
                  </form>
                  <button class="page_btn btn_go_left" id="btn${i}">
                    <i  class="fas fa-arrow-left"></i>
                  </button>
               </div>
            </div>`;
        }
      }
      document
        .querySelector(".opening_page")
        .insertAdjacentHTML("beforeBegin", html);
      PagesLoaded = true;
      document
        .querySelector(".opening_page")
        .removeEventListener("transitionend", loadPages);
    };
    const hidePages = () => {
      document.querySelectorAll("[data-pageindex]").forEach((each) => {
        each.style.display = "none";
      });
    };

    diaryHolder.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("page_btn") ||
        e.target.classList.contains("fa-arrow-left") ||
        e.target.classList.contains("fa-arrow-right")
      ) {
        let page = e.target.closest(".page");
        let prevPage = page.nextElementSibling;
        let nextPage = page.previousElementSibling;
        let nextnextPage = page.previousElementSibling.previousElementSibling;
        let prevprevPage = prevPage?.nextElementSibling;
        let pageIndex = +e.target.closest(".page").dataset.pageindex;

        if (pageIndex === 1) {
          turnPages(page, nextPage, undefined, nextnextPage);
        } else if (pageIndex === 2) {
          turnPages(prevPage, page, undefined, nextnextPage, false);
        } else if (pageIndex % 2 === 1) {
          turnPages(page, nextPage, prevPage, nextnextPage);
        } else if (pageIndex % 2 === 0) {
          turnPages(prevPage, page, prevprevPage, nextnextPage, false);
        }
      }
    });
    function toggleButtonAndOpeningPage(visibility) {
      let visibility_css = visibility === "show" ? "visible" : "hidden";
      let openingPage_zIndex = visibility === "show" ? "-1" : "10";
      select(".choose_date_btn").style.visibility = visibility_css;
      select(".go_to_today_btn").style.visibility = visibility_css;
      select(".opening_page").style.zIndex = openingPage_zIndex;
    }
    function openDiary() {
      loadPages();
      listen(select("form.active_form"), "submit", (e) => {
        e.preventDefault();
        console.log("hello");
        let written = select("textarea.active").value.trim();
        setDiaryData(uid, todayPage, written, () => {
          notifyUser("Your diary is updated");
        });
      });
      select(".opening_page").removeEventListener("transitionend", openDiary);
    }

    function closeDiary() {
      hidePages();
      diaryHolder.classList.add("starting_state");
      document.querySelector(".opening_page").classList.remove("rotation");
      currentPage = [0, 1];
      select(".opening_page").addEventListener(
        "transitionend",
        function makeTitleVisible() {
          select(".diary_title").style.color = "var(--clr-white)";
          select(".opening_page").style.zIndex = 10;
          select(".opening_page").removeEventListener(
            "transitionend",
            makeTitleVisible
          );
        }
      );
    }

    openBtn.addEventListener("click", (e) => {
      console.log("pagesLoaded " + PagesLoaded, "diaryClosed " + diaryClosed);
      select(".diary_title").style.color = "var(--clr-text-light)";

      if (PagesLoaded && !diaryClosed) {
        closeDiary();
        toggleButtonAndOpeningPage("hide");
        diaryClosed = true;
      } else {
        diaryHolder.classList.remove("starting_state");
        document.querySelector(".opening_page").classList.add("rotation");
        if (!PagesLoaded && diaryClosed) {
          select(".opening_page").addEventListener("transitionend", openDiary);
        } else if (PagesLoaded && diaryClosed) {
          select(".opening_page").addEventListener("transitionend", () => {
            document.querySelectorAll("[data-pageindex]").forEach((each) => {
              each.style.display = "block";
            });
          });
        }
        toggleButtonAndOpeningPage("show");
        diaryClosed = false;
      }
    });

    function pageUpdate(toIndex) {
      let to = toIndex % 2 === 0 ? toIndex - 1 : toIndex;
      let allBtns = document.querySelectorAll(".page_btn");
      console.log(to, currentPage);
      if (to === currentPage[1]) {
        select(`#btn${currentPage[1]}`).click();
        return;
      }
      if (to > currentPage[1] && to < 365) {
        for (let i = currentPage[1]; i <= to; i += 2) {
          allBtns[365 - i].click();
        }
      } else if (to < currentPage[0] && to > 0) {
        for (let i = currentPage[0]; i >= to + 2; i -= 2) {
          allBtns[365 - i].click();
        }
      } else if (to === -1) {
        to = 0;
        for (let i = currentPage[0]; i >= to + 2; i -= 2) {
          allBtns[365 - i].click();
        }
      }
    }

    let datePicker;
    let selectDateEvent = new CustomEvent("selectDate");
    document
      .getElementById("diary_holder")
      .addEventListener("selectDate", (e) => {
        let selectedPage = getDateIndex(...datePicker.selectedDate) - 1;
        pageUpdate(selectedPage);
      });

    listen(select(".go_to_today_btn"), "click", () => {
      pageUpdate(todayPage - 1);
    });

    listen(select(".choose_date_btn"), "click", () => {
      datePicker = new DatePicker(
        selectDateEvent,
        select(".diary_datepicker_wrapper"),
        "beforeEnd"
      );
    });
  }
}

export default Diary;
