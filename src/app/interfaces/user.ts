export interface User{
    id: number,
    name: string,
    email: string,
    password?: string,
    confirm?: string,
    status?: boolean,
    role: string,
}