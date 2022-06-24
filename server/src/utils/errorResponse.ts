export class ErrorResponse extends Error {
    constructor({ message, statusCode }: any) {
        super(message)
        this.statusCode = statusCode
    }
}
