import db from "../database/index.js";
import Booking from "../bookings/Booking.js";

class BookingPostgresRepository {
  constructor() {
    this.db = db;
  }

  async findAll() {
    const storedBookings = await this.db.manyOrNone(
      'SELECT id, room_id AS "roomId", guest_name AS "guestName", check_in_date AS "checkInDate", check_out_date AS "checkOutDate", user_id AS "userId" FROM Bookings'
    );
    return storedBookings.map((booking) => new Booking(booking));
  }

  async create(booking) {
    await this.db.none(
      "INSERT INTO Bookings (id, room_id, guest_name, check_in_date, check_out_date, user_id) VALUES (${id}, ${roomId}, ${guestName}, ${checkInDate}, ${checkOutDate}, ${userId})",
      booking
    );
  }
}

export default BookingPostgresRepository;
