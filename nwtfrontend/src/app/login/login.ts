export interface AuthenticationCredentials {
    username: string;
    password: string
}

export interface AuthenticationResponse {
    accessToken: string;
    refreshToken: string;
    userResponse: UserResponse
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

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string
}