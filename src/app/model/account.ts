import { map } from 'rxjs/operators';

export class Account {

    constructor(
        public user_email: string,
        public user_password: string
    ) {

    }
}