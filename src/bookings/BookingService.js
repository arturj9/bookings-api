import Booking from "./Booking.js";

class BookingService {
  constructor(repository) {
    this.repository = repository;
  }

  async findAllBookings() {
    return await this.repository.findAll();
  }

  async createBooking({
    userId,
    roomId,
    guestName,
    checkInDate,
    checkOutDate,
  }) {

    const newBooking = new Booking(
      null,
      userId=userId,
      roomId=roomId,
      guestName=guestName,
      checkInDate=checkInDate,
      checkOutDate=checkOutDate
    );

    const allBookings = await this.repository.findAll();

    const overlappingBooking = allBookings.find((booking) => {
      return (
        booking.roomId === newBooking.roomId &&
        booking.checkInDate < newBooking.checkOutDate &&
        booking.checkOutDate > newBooking.checkInDate
      );
    });

    if (overlappingBooking) {
      throw new Error("The room is already booked for the selected dates.");
    }

    await this.repository.create(newBooking);
    return newBooking;
  }
}

export default BookingService;
