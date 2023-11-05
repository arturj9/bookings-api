import { v4 } from 'uuid'

// id, roomId, guestName, checkInDate, checkOutDate

class Booking {
    constructor(id, user, roomId, guestName, checkInDate, checkOutDate){
        this.id = id ?? v4()
        this.user = user
        this.roomId = roomId
        this.guestName = guestName
        this.checkInDate = checkInDate
        this.checkOutDate = checkOutDate
    }
}

export default Booking