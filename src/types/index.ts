export interface User { id: string; email: string; name: string; }
export interface FlightOffer {
  id: string; airline: string; price: number; currency: string;
  departureDate: string; arrivalDate: string; origin: string; destination: string; stops: number; deepLink?: string;
}
export interface HotelOffer {
  id: string; name: string; stars: number; rating: number; price: number; currency: string;
  address: string; distanceToBeach?: number; imageUrl?: string; checkIn: string; checkOut: string;
}
export interface TripResult {
  id?: string; origin: string; destination: string; startDate: string; endDate: string;
  totalPrice: number; savings: number; flight: FlightOffer; hotel: HotelOffer; aiJustification: string;
}
export interface SearchHistory {
  id: string; origin: string; destination: string; startDate: string; endDate: string;
  travelers: number; budget: number; tripType: string;
  resultSummary: TripResult; createdAt: string;
}
export interface FavoriteTrip { id: string; userId: string; tripId: string; trip: TripResult; createdAt: string; }
