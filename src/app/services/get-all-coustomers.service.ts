import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
// import * as data from '../get-notification.json';

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
}
