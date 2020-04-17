
export class User {
    constructor(public email: string, public id: string, private _token: string, private _toketExpirationDate: Date) {}

    get token() {
        if (!this._toketExpirationDate || new Date() > this._toketExpirationDate) {
            return null;
        }
        return this._token;
    }
}
