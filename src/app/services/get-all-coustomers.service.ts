import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetAllCustomersService {
  private url =
    'https://my-json-server.typicode.com/pamidipriya/demo/notifications';
  // private url = '/mockjson/get-notifications.json';
  constructor(private httpClient: HttpClient) {}

  getAllCompanyNotifications(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  // getEmployees(): Observable<any> {
  //   return this.httpClient.get(this.url).pipe(
  //     map((resp: any) => resp.json())
  //     // catchError((error) => this.throwError(error))
  //   );
  // }
  // throwError(error: any) {
  //   console.error(error);
  //   // return Observable.throw(error.json().error || 'Server error');
  // }
}
