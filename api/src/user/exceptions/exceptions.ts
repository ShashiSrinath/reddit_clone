import {HttpException, HttpStatus} from "@nestjs/common";

export class ConfirmPasswordMismatchException extends HttpException {
    constructor() {
        super('Passwords do not match',HttpStatus.BAD_REQUEST);
    }
}

export class InvalidPasswordException extends HttpException {
    constructor() {
        super('Invalid Password', HttpStatus.UNAUTHORIZED);
    }
}