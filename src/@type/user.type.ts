export type User = {
    username: string
    email: string
    role: string
    phone: string 
    address: string
    avatar?: string
    fullname: string
}

export enum Role {
    USER = "User",
    ADMIN = "Admin"
}