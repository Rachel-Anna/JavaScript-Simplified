// import format from "date-fns/format";
// import getDaysInMonth from "date-fns/getDaysInMonth";
// import sub from "date-fns/sub";

//grab everything you need from html
const datePickerBtn = document.querySelector(".date-picker-button");
const datePickerGrid = document.querySelector(".date-picker-grid-dates");
const currentMonth = document.querySelector(".current-month");
const calendar = document.querySelector(".date-picker");

datePickerBtn.addEventListener("click", renderCalendar);

function renderCalendar() {
  calendar.classList.toggle("show");
  //let date =
  //let month =
  renderCurrentMonthDates(date, month);
  renderPreviousMonthDates(date, month);
  addEventListenerToArrows();
}

function renderCurrentMonthDates(date, month) {}

function renderPreviousMonthDates(date, month) {}

/*1. 
- create a function called renderCalendar 
- Add an event listener to the date picker button that shows the calendar
- Save the current date to a variable
- Save the current month to a variable 
- create a function inside that called renderCurrentMonthDates
    - Find out what the current month is and insert that into the calendar
    header.
    - Find out how many days are in that month and use it to render the date
    buttons. Add the class date to each button
-create a function called renderPreviousMonthDates
    - Find out what the previous month is and how many days are in that month
    - If a month has 31 days in it, the first four days will show the last 4 days of the previous month
    - If a month has 30 days in it, the first five days will show the the last 5 days of the last month
    - If a month has 29 days, the first six days will show the last 6 days of the last month
    - If a month has 28 days, the first 7 days will show the last 7 days of the last month (switch statement)
    - Save the number of days to be rendered in a variable
    - Create a "backwards" for loop. For each number of days to be rendered count down from the number of days 
      in the previous month. e.g. numberOfMonthsInPreviousMonth = 30, so count down 30 to 25 and add a button 
      for each day. Add the class date-picker-other-month-date.


/*2. 
Create a function that adds an event listener to each date btn
when the btn is clicked, create a variable selected date
Add the class selected to that button
Change the inner text of the date picker button to that date
Change the calendar header to the month of the selected date
*/

/* 3.

Add an event listener to the left arrow. Pass a function to it
that finds the previous month. Then is passes that month/date to the
renderCurrentMonthDates function and the renderPreviousMonthDates function

*/

/* 4.

Add an event listener to the right arrow. Pass a function to it
that finds the next month. Then it passes that month/date to the
renderCurrentMonthDates function and the renderPreviousMonthDates function

*/
