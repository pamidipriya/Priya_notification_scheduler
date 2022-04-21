import { Component, VERSION } from '@angular/core';
import { GetAllCustomersService } from './services/get-all-coustomers.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // name = 'Angular ' + VERSION.major;
  name = 'Notification Scheduling System';
  constructor(
    private httpClient: HttpClient,
    private notificationService: GetAllCustomersService
  ) {}
  companysData: any;
  startingDateValue = '';
  displayCompanyId = '';
  totalNumberOfDays: number = 0;
  diffDays = 0;
  account = 'calender';
  notification_status: string = '';
  ngOnInit() {
    this.notificationService
      .getAllCompanyNotifications()
      .subscribe((response) => {
        this.companysData = response;
      });
  }
  getDateFromString(sDate) {
    let mdy = sDate.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
  }

  calculateDiff(notificationDate, companyId) {
    if (this.displayCompanyId != companyId) {
      this.startingDateValue = '';
      this.totalNumberOfDays = 0;
      this.displayCompanyId = companyId;
      this.diffDays = 0;
    }
    if (this.startingDateValue === '') {
      this.startingDateValue = notificationDate;
    } else {
      let date1: any = this.getDateFromString(this.startingDateValue);
      let date2: any = this.getDateFromString(notificationDate);
      this.diffDays = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
      this.totalNumberOfDays += this.diffDays;
      this.startingDateValue = notificationDate;
      let current_date = new Date();
      current_date.setHours(0, 0, 0, 0);
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);
      if (current_date >= date1 || current_date >= date2) {
        console.log('current_date', current_date, date1, '--', date2);
        console.log('greater than equal to');
        this.notification_status = 'completed';
      } else {
        console.log('ELse current_date', current_date, date1, '--', date2);
        console.log('Not equal');
        this.notification_status = 'in-progress';
      }
      return this.diffDays;
    }
  }
}
