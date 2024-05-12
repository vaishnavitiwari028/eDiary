import Component from "../../config/Component.js";
import { listen, select } from "../../DOMhelpers.js";
import { calender } from "./calender.js";
import datePickerHTML from "./DatePickerHTML.js";

class DatePicker extends Component {
  constructor(selectDateEvent, parent, position) {
    super(
      datePickerHTML,
      { selectDateEvent, key: "date_picker_key" },
      parent,
      position
    );
  }
  afterRender() {
    select(".choose_date_btn").disabled = true;
    let fullYear = ``;
    let months = ``;
    let dateNow = new Date().getDate();
    let monthNow = new Date().getMonth();

    calender.forEach((month, index) => {
      let newMonth = `<div class="calender_container month_${index}">
        <div class="month_name">${month.name}</div>
        <div class="day_name date_cell">Sun</div>
        <div class="day_name date_cell">Mon</div>
        <div class="day_name date_cell">Tues</div>
        <div class="day_name date_cell">Wed</div>
        <div class="day_name date_cell">Thr</div>
        <div class="day_name date_cell">Fri</div>
        <div class="day_name date_cell">Sat</div>
      `;
      months += `<div class="month_picker_cell" data-monthindex="${index}">${month.name.slice(
        0,
        3
      )}</div>`;

      let startDay = new Date(2021, index, 1).getDay();

      for (let i = 0; i < month.days + startDay; i++) {
        if (i < startDay) {
          newMonth += `<div class="date_cell"></div>`;
        } else
          newMonth += `<div class="date_cell" data-date="${index}_${
            i - startDay + 1
          }">${i - startDay + 1}</div>`;
      }
      newMonth += `</div>`;
      fullYear += newMonth;
    });

    function getMonth(index) {
      select(`.month_${index}`).scrollIntoView();
    }

    select(".calender_wrapper").innerHTML = fullYear;
    select(".month_picker_container").innerHTML = months;

    getMonth(monthNow);
    select(`.month_${monthNow}_${dateNow}`);

    listen(select(".month_picker_container"), "click", (e) => {
      if (e.target.classList.contains("month_picker_cell")) {
        let monthClicked = e.target.dataset.monthindex;
        getMonth(+monthClicked);
      }
    });
    listen(select(".calender_wrapper"), "click", (e) => {
      if (e.target.classList.contains("date_cell")) {
        this.selectedDate = e.target.dataset.date.split("_");
        document
          .getElementById("diary_holder")
          .dispatchEvent(this.props.selectDateEvent);
        this.unMount();
      }
    });
    listen(select(".date_cancel_btn"), "click", () => {
      this.unMount();
    });
  }

  cleanUp() {
    select(".choose_date_btn").disabled = false;
  }
}

export default DatePicker;
