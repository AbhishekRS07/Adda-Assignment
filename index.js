const facilityFun = (name, rates) => {
    const bookings = [];

    const book = (bookingDate, startTime, endTime) => {
        const startDateTime = new Date(`${bookingDate}T${startTime}`);
        const endDateTime = new Date(`${bookingDate}T${endTime}`);

        for (let booking of bookings) {
            if (startDateTime < booking.end && endDateTime > booking.start) {
                return "Booking Failed, Already Booked";
            }
        }

        const cost = calculate(startDateTime, endDateTime);
        bookings.push({ start: startDateTime, end: endDateTime });
        return `Booked, Rs. ${cost}`;
    };

    const calculate = (start, end) => {
        let totalCost = 0;
        let currentTime = new Date(start);

        while (currentTime < end) {
            for (let rate of rates) {
                const [rateStartHour, rateStartMinute] = rate.start.split(':').map(Number);
                const [rateEndHour, rateEndMinute] = rate.end.split(':').map(Number);

                const rateStartTime = new Date(currentTime);
                rateStartTime.setHours(rateStartHour, rateStartMinute, 0);

                const rateEndTime = new Date(currentTime);
                rateEndTime.setHours(rateEndHour, rateEndMinute, 0);

                if (rateStartTime <= currentTime && currentTime < rateEndTime) {
                    const nextRateEnd = new Date(Math.min(rateEndTime, end));
                    const hours = (nextRateEnd - currentTime) / (1000 * 60 * 60);
                    totalCost += hours * rate.rate;
                    currentTime = nextRateEnd;
                    break;
                }
            }
        }
        return Math.round(totalCost);
    };

    return {
        name,
        book
    };
};

const clubhouse = facilityFun("Clubhouse", [
    { start: "10:00", end: "16:00", rate: 100 },
    { start: "16:00", end: "22:00", rate: 500 }
]);

const tennisCourt = facilityFun("Tennis Court", [
    { start: "00:00", end: "23:59", rate: 50 }
]);

console.log(clubhouse.book("2020-10-26", "16:00", "22:00"));  
console.log(tennisCourt.book("2020-10-26", "16:00", "20:00"));  
console.log(clubhouse.book("2020-10-26", "16:00", "22:00")); 
console.log(tennisCourt.book("2020-10-26", "17:00", "21:00")); 
