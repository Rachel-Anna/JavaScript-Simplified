import format from "date-fns/format";
import getDaysInMonth from "date-fns/getDaysInMonth";
import sub from "date-fns/sub";
import { getDay } from "date-fns";
import add from "date-fns/add";
import setDate from "date-fns/setDate";

const datePickerBtn = document.querySelector(".date-picker-button");
const datePickerGrid = document.querySelector(".date-picker-grid-dates");
const currentMonth = document.querySelector(".current-month");
const calendar = document.querySelector(".date-picker");
const leftArrow = document.querySelector(".prev-month-button");
const rightArrow = document.querySelector(".next-month-button");

let date = new Date();

datePickerBtn.addEventListener("click", () => {
  calendar.classList.toggle("show");
  if (!calendar.classList.contains("show")) {
    removeHTMLDates();
    return;
  }
  renderCalendar();
});

leftArrow.addEventListener("click", () => {
  removeHTMLDates();
  date = sub(date, {
    months: 1,
  });
  renderCalendar();
});

rightArrow.addEventListener("click", () => {
  removeHTMLDates();
  date = add(date, {
    months: 1,
  });
  renderCalendar();
});

function renderCalendar() {
  let DaysInMonth = getDaysInMonth(date);
  let firstDay = getDayOfWeekForFirstDayOfMonth(date); //e.g. 0 for Sunday
  renderPreviousMonthDates(date, firstDay);
  renderCurrentMonthDates(date, DaysInMonth);
  renderNextMonthDays();
}

function getDayOfWeekForFirstDayOfMonth(date) {
  let dayOfMonthNumber = format(date, "d");
  let daysToSubtract = parseInt(dayOfMonthNumber - 1);
  let firstDayOfMonth = sub(date, {
    days: daysToSubtract,
  });
  return getDay(firstDayOfMonth); //0 | 1 | 2 | 3 | 4 | 5 | 6	returns the day of week, 0 represents Sunday
}

function renderCurrentMonthDates(date, DaysInMonth) {
  currentMonth.innerText = format(date, "MMMM - yyyy");

  for (i = 1; i <= DaysInMonth; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("date");
    datePickerGrid.appendChild(btn);
  }
}

function renderPreviousMonthDates(date, firstDay) {
  if (firstDay === 0) return;
  let previousMonth = sub(date, {
    months: 1,
  });
  let DaysInPreviousMonth = getDaysInMonth(previousMonth);
  let daysToBeRendered = firstDay;

  for (
    i = DaysInPreviousMonth - daysToBeRendered + 1; //i = 30 - 5 +1(26)
    i <= DaysInPreviousMonth; // 26 < 30
    i++
  ) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("date-picker-other-month-date");
    btn.classList.add("date");
    datePickerGrid.appendChild(btn);
  }
}

function renderNextMonthDays() {
  let counter = 1;
  while (datePickerGrid.children.length < 42) {
    const btn = document.createElement("button");
    btn.innerText = counter;
    btn.classList.add("date");
    btn.classList.add("date-picker-other-month-date");
    counter++;
    datePickerGrid.appendChild(btn);
    if (datePickerGrid.children.length === 42) return;
  }
}

document.addEventListener("click", (e) => {
  console.log(e.target);
  if (!e.target.matches(".date")) return;
  const selectedDate = datePickerGrid.querySelector(".selected");
  if (selectedDate != null) {
    selectedDate.classList.remove("selected");
  }
  e.target.classList.add("selected");

  if (e.target.classList.contains("date-picker-other-month-date")) {
    let dayNumberUsedForSelection = e.target.innerText;
    if (parseInt(e.target.innerText) > 22) {
      //if it is the previous month
      date = sub(date, {
        months: 1,
      });

      date = setDate(date, e.target.innerText);
      removeHTMLDates();
      renderCalendar();
    } else {
      //if it is the next month
      date = add(date, {
        months: 1,
      });
      date = setDate(date, e.target.innerText);
      removeHTMLDates();
      renderCalendar();
    }

    let currentMonthDateBtns = document.querySelectorAll(".date");
    for (let i = 0; i < currentMonthDateBtns.length; i++) {
      if (currentMonthDateBtns[i].innerText === dayNumberUsedForSelection) {
        currentMonthDateBtns[i].classList.add("selected");
        break;
      }
    }
  } else {
    date = setDate(date, e.target.innerText);
  }

  datePickerBtn.innerText = format(date, "MMMM dd, yyyy");
});

function removeHTMLDates() {
  while (datePickerGrid.children[0] != null) {
    datePickerGrid.children[0].remove();
  }
}
