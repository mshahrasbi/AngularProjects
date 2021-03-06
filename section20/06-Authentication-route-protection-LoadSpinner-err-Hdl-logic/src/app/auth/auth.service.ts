import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSdWsJamuahdBXerwgEA9F39g3LIwN7CU', {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(errorRes => {
                let errorMessage = 'an unknown error occured';
                
                if (!errorRes.error || !errorRes.error.error) {
                    return throwError(errorMessage);
                }

                switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email exists already.';
                }

                return throwError(errorMessage);

            }));
    }

}