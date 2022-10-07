export default interface IRegisterResponse {
    status: 'ok' | 'error',
    error?: string,
    token?: string,
    userInfo?: {
        username: string,
        email: string,
        id: string,
        phoneNumber: string
    }
}