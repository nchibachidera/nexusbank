 declare module '../api/authApi' {
  export function loginUser(data: { email: string; password: string }): Promise<any>
  export function registerUser(data: {
    fullName: string
    email: string
    password: string
    phone?: string
    birthday?: string
  }): Promise<any>
}
