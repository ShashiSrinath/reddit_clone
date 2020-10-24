import {HttpException, HttpStatus} from "@nestjs/common";

export class UniqueConstraintFailedException extends HttpException {
    meta: { target: string[] }
    code: string;

    constructor(message: string, meta: { target: string[] }) {
        super({message: 'Unique constraint failed', meta: meta, code: 'P2002'}, HttpStatus.BAD_REQUEST);

    }
}