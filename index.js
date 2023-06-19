const day = $("#day");
const month = $("#month");
const year = $("#year");

// main logic of the program
$("button").click(function (event) {
    event.preventDefault();
    if (checkInputs()) {
        countLife();
    }
});

// to check if given day, month, year are valid or not.
const currentYear = new Date().getFullYear();
const MAX_VALID_YR = currentYear;
const MIN_VALID_YR = 0;

// Returns true if
// given year is valid.
function isLeap(year) {
    // Return true if year
    // is a multiple of 4 and
    // not multiple of 100.
    // OR year is multiple of 400.
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

function isDay(d, m, y) {
    // Handle February month
    // with leap year
    if (m == 2) {
        if (isLeap(y)) return d <= 29;
        else return d <= 28;
    }

    // April, June,
    // Sept, Nov must have
    // number of days <= 30.
    if (m == 4 || m == 6 || m == 9 || m == 11) return d <= 30;

    if (d < 1 || d > 31) return false;

    return true;
}

function isMonth(m) {
    if (m < 1 || m > 12) return false;

    return true;
}

function isYear(y) {
    // If year is not in given range
    if (y > MAX_VALID_YR || y < MIN_VALID_YR) return false;

    return true;
}

// checks inputs from users
function checkInputs() {
    const dayValue = day.val();
    const monthValue = month.val();
    const yearValue = year.val();

    let validInputs = true;

    console.log(dayValue, monthValue, yearValue);

    if (dayValue === "") {
        setErrorFor("day", "This field is required", "one");
        validInputs = false;
    } else if (!isDay(dayValue, monthValue, yearValue)) {
        setErrorFor("day", "Must be a valid day", "one");
        validInputs = false;
    }

    if (monthValue === "") {
        setErrorFor("month", "This field is required", "two");
        validInputs = false;
    } else if (!isMonth(monthValue)) {
        setErrorFor("month", "Must be a valid month", "two");
        validInputs = false;
    }

    if (yearValue === "") {
        setErrorFor("year", "This field is required", "three");
        validInputs = false;
    } else if (!isYear(yearValue)) {
        setErrorFor("year", "Must be in the past", "three");
        validInputs = false;
    }

    return validInputs;
}

// set errors and show them on the webpage
function setErrorFor(input, message, classNum) {
    let elementOfDate = $("." + classNum + ">div");
    console.log(elementOfDate);

    elementOfDate.addClass("errorMsg");
    elementOfDate.text(message);

    setTimeout(function () {
        elementOfDate.removeClass("errorMsg");
    }, 2000);

    setTimeout(function () {
        elementOfDate.text("");
    }, 2000);

    $("input#day").addClass("error");
    console.log($("input#day").hasClass("error"), "error");

    setTimeout(function () {
        $("input#day").removeClass("error");
    }, 2000);

    $("input#month").addClass("error");
    console.log($("input#month").hasClass("error"), "error");

    setTimeout(function () {
        $("input#month").removeClass("error");
    }, 2000);

    $("input#year").addClass("error");
    console.log($("input#year").hasClass("error"), "error");

    setTimeout(function () {
        $("input#year").removeClass("error");
    }, 2000);

    $("label").css("color", "red");

    setTimeout(function () {
        $("label").css("color", "#878787");
    }, 2000);
}

// using functions above, check how old a person is
function countLife() {
    const dayValue = Number(day.val());
    const monthValue = Number(month.val());
    const yearValue = Number(year.val());

    let age, weeks, days, months, d;

    age = currentYear - yearValue;

    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();

    let allMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (monthValue >= currentMonth + 1) {
        months = 12 - (monthValue - (currentMonth + 1));
    } else if (monthValue < currentMonth + 1) {
        months = currentMonth - (monthValue - 1);
    }

    if (months >=12) {
        age += Math.floor(months / 12);
        months = months % 12;
    }

    if (dayValue >= currentDay) {
        days = allMonths[currentMonth] - (dayValue - currentDay);
    } else if (dayValue < currentDay) {
        days = currentDay - dayValue;
    }

    // show values to the user
    $(".years").text(age);
    $(".months").text(months);
    $(".days").text(days);
}
