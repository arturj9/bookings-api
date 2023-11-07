import UserPostgresRepository from "./auth/UserPostgresRepository.js";
import BookingPostgresRepository from "./bookings/BookingPostgresRepository.js";
import AuthService from "./auth/AuthService.js";
import BookingService from "./bookings/BookingService.js";
import AuthController from "./auth/AuthController.js";
import BookingController from "./bookings/BookingController.js";

export const userPostgresRepository = new UserPostgresRepository();
export const bookingPostgresRepository = new BookingPostgresRepository();
export const authService = new AuthService(userPostgresRepository);
export const bookingService = new BookingService(bookingPostgresRepository);
export const authController = new AuthController(authService);
export const bookingControler = new BookingController(bookingService);
