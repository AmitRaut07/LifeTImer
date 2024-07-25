let isDOBOpen = false;
let DateOfBirth;
let SettingIconEl = document.getElementById("SettingIcons");
let SettingContentEl = document.getElementById("SettingContent");
let InitialTextEl = document.getElementById("initialtext");
let AfterDOBButtonEl = document.getElementById("afterDOBbutton");
let DOBButtonEl = document.getElementById("dob-button");
let dobInputEl = document.getElementById("dobInput");
let YearEl = document.getElementById("year");
let MonthEl = document.getElementById("month");
let DayEl = document.getElementById("day");
let HourEl = document.getElementById("hour");
let MinuteEl = document.getElementById("minute");
let SecondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
}

const toggleDateOfBirthSelector = () => {
    if (isDOBOpen) {
        SettingContentEl.classList.add("hide");
    } else {
        SettingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
};

const UpdateAge = () => {
    if (!DateOfBirth) return;

    const currentDate = new Date();
    let year = currentDate.getFullYear() - DateOfBirth.getFullYear();
    let month = currentDate.getMonth() - DateOfBirth.getMonth();
    let day = currentDate.getDate() - DateOfBirth.getDate();
    let hour = currentDate.getHours() - DateOfBirth.getHours();
    let minute = currentDate.getMinutes() - DateOfBirth.getMinutes();
    let second = currentDate.getSeconds() - DateOfBirth.getSeconds();

    // Adjust if necessary
    if (second < 0) {
        second += 60;
        minute--;
    }
    if (minute < 0) {
        minute += 60;
        hour--;
    }
    if (hour < 0) {
        hour += 24;
        day--;
    }
    if (day < 0) {
        // Get the number of days in the previous month
        let previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        day += previousMonth.getDate();
        month--;
    }
    if (month < 0) {
        month += 12;
        year--;
    }

    YearEl.innerHTML = makeTwoDigitNumber(year);
    MonthEl.innerHTML = makeTwoDigitNumber(month);
    DayEl.innerHTML = makeTwoDigitNumber(day);
    HourEl.innerHTML = makeTwoDigitNumber(hour);
    MinuteEl.innerHTML = makeTwoDigitNumber(minute);
    SecondEl.innerHTML = makeTwoDigitNumber(second);

    console.log({ year, month, day, hour, minute, second });
};

const SetDOBHandler = () => {
    const datestring = dobInputEl.value;
    DateOfBirth = datestring ? new Date(datestring) : null;

    if (DateOfBirth) {
        localStorage.setItem('year', DateOfBirth.getFullYear());
        localStorage.setItem('month', DateOfBirth.getMonth());
        localStorage.setItem('day', DateOfBirth.getDate());
        InitialTextEl.classList.add("hide");
        AfterDOBButtonEl.classList.remove("hide");
        UpdateAge();
        setInterval(UpdateAge, 1000);
    } else {
        AfterDOBButtonEl.classList.add("hide");
        InitialTextEl.classList.remove("hide");
    }
};

const initDOBFromLocalStorage = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const day = localStorage.getItem("day");

    if (year && month && day) {
        DateOfBirth = new Date(year, month, day);
        if (DateOfBirth) {
            InitialTextEl.classList.add("hide");
            AfterDOBButtonEl.classList.remove("hide");
            UpdateAge();
            setInterval(UpdateAge, 1000);
        }
    }
};

SettingIconEl.addEventListener("click", toggleDateOfBirthSelector);
DOBButtonEl.addEventListener("click", SetDOBHandler);
initDOBFromLocalStorage();
