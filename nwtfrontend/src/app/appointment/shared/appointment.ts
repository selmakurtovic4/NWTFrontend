export interface UserResponse {
    id: number;
    uuid: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    address: string;
    phoneNumber: string;
    role: string
}

export interface AppointmentRequest {
    date: string;
    time: string;
    status: AppointmentStatus;
    doctorId: number;
    patientId: number;
}

export interface AppointmentResponse {
    id: number;
    date: string;
    time: string;
    status: AppointmentStatus;
    doctorId: number;
    patientId: number;
}

export enum AppointmentStatus {
    BOOKED = 'BOOKED',
    CANCELLED = 'CANCELLED',
    AVAILABLE = 'AVAILABLE'
  }
