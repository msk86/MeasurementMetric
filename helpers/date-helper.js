module.exports = (function() {
    function formatDate(date) {
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    }

    function getPreviousMonday(date, howMany) {
        howMany = howMany || 0;
        var dayDiff = (date.getDay() || 7) - 1 + 7 * howMany;

        var result = new Date(date.getTime());
        result.setDate(date.getDate() - dayDiff);
        return result;
    }

    function getNextSunday(date, howMany) {
        howMany = howMany || 0;
        var dayDiff = 7 - (date.getDay() || 7) + 7 * howMany + 1;

        var result = new Date(date.getTime());
        result.setDate(date.getDate() + dayDiff);
        result.setMilliseconds(-1);
        return result;
    }

    function getFirstDayThisMonth(date) {
        var result = new Date(date.getTime());
        result.setDate(1);
        return result;
    }

    function getLastDayThisMonth(date) {
        var result = new Date(date.getTime());
        result.setDate(1);
        result.setMonth(date.getMonth() + 1);
        result.setMilliseconds(-1);
        return result;
    }

    function getFirstDayThisYear(date) {
        var result = new Date(date.getTime());
        result.setMonth(0);
        result.setDate(1);
        return result;
    }

    function getLastDayThisYear(date) {
        var result = new Date(date.getTime());
        result.setYear(date.getFullYear() + 1);
        result.setMonth(0);
        result.setDate(1);
        result.setMilliseconds(-1);
        return result;
    }

    function curr(date) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
    }

    function getDateRange(date, timeFrame) {
        curr(date);
        if(timeFrame == 'week') {
            return {
                start: getPreviousMonday(date),
                end: getNextSunday(date)
            }
        } else if (timeFrame == 'fortnight') {
            return {
                start: getPreviousMonday(date, 1),
                end: getNextSunday(date)
            }
        } else if(timeFrame == 'month') {
            return {
                start: getFirstDayThisMonth(date),
                end: getLastDayThisMonth(date)
            }
        } else if(timeFrame == 'year') {
            return {
                start: getFirstDayThisYear(date),
                end: getLastDayThisYear(date)
            }
        }
    }

    function sixTrendRanges(date, timeFrame) {
        var ranges = [];
        var flagDate = date;
        for(var i=0;i<6;i++) {
            var range = getDateRange(flagDate, timeFrame);
            ranges.unshift(range);
            flagDate = new Date(range.start.getTime() - 3 * 24 * 60 * 60 * 1000);
        }
        return ranges;
    }

    function standardDay(date, startFrom, timeFrame) {
        if(!startFrom || timeFrame != 'fortnight') {
            return date;
        }
        startFrom = getPreviousMonday(startFrom);
        var offsetDay = 0;
        var t = (date.getTime() - startFrom.getTime()) / (24 * 60 * 60 * 1000);
        if(t % 14 < 7) {
            offsetDay = 7;
        }
        date.setDate(date.getDate() + offsetDay);
        return date;
    }

    return {
        standardDay: standardDay,
        formatDate: formatDate,
        getDateRange: getDateRange,
        sixTrendRanges: sixTrendRanges
    }
})();
