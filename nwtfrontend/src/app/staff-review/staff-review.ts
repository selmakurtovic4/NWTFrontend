export interface ReviewResponse {
    rating: number;
    comment: string;
    appointment: AppointmentResponse
    patientUsername?: string;
}

export interface AppointmentResponse {
    id: number;
    date: string;
    time: string;
    status: string;
    doctorId: number;
    patientId: number;
}

export interface UserResponse {
    id: number;
    uuid: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    address: string;
    mapCoordinates: string;
    phoneNumber: string;
    role: string
}