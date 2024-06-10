Facility Booking System
This repository contains a simple facility booking system implemented in JavaScript. The system allows users to book facilities, such as a clubhouse or a tennis court, and calculates the cost based on predefined time slots and rates.

Features
Book facilities by specifying the date, start time, and end time.
Automatically calculates the booking cost based on time slots and hourly rates.
Checks for booking conflicts and prevents double booking.


Explanation
Factory Function createFacility:

Takes name and rates as parameters.
Initializes bookings array to track bookings.
Defines book function to handle booking requests and check for conflicts.
Defines calculateCost function to compute the cost based on rates.
Returns an object with name and book properties.
Booking Function:

Converts date and time strings to Date objects.
Checks for booking conflicts.
Calculates booking cost using calculateCost.
Adds booking to bookings array if no conflicts.
Calculate Cost Function:

Iterates through booking period by hour.
Applies correct rate based on time slots.
Accumulates total cost and updates current time.
