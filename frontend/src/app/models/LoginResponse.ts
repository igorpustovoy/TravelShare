export default interface ILoginResponse {
    status: 'ok' | 'error',
    token?: string
    userInfo?: {
        username: string,
        email: string,
        id: string,
        phoneNumber: string
    }
}