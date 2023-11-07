import { v4 } from "uuid";

// id, roomId, guestName, checkInDate, checkOutDate

class Booking {
  constructor(id, userId, roomId, guestName, checkInDate, checkOutDate) {
    this.id = id ?? v4();
    this.userId = userId;
    this.roomId = roomId;
    this.guestName = guestName;
    this.checkInDate = new Date(checkInDate);
    this.checkOutDate = new Date(checkOutDate);
  }
}

export default Booking;
