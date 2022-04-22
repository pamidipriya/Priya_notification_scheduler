import {
  Component,
  VERSION,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { GetAllCustomersService } from './services/get-all-coustomers.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetAllCustomersService],
})
export class AppComponent {
  // name = 'Angular ' + VERSION.major;
  name = 'Notification Scheduling System';
  constructor(
    private httpClient: HttpClient,
    private notificationService: GetAllCustomersService,
    private cdref: ChangeDetectorRef
  ) {}
  companysData: any = [];
  startingDateValue = '';
  displayCompanyId = '';
  totalNumberOfDays: number = 0;
  diffDays = 0;
  account = 'calender';
  notification_status = '';
  ngOnInit() {
    this.notificationService
      .getAllCompanyNotifications()
      .subscribe((response) => {
        this.companysData = response;
        console.log('companysData:', this.companysData);
      });
  }
  ngOnChanges() {
    this.cdref.detectChanges();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  ngAfterViewInit() {}

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
    let date2: any = this.getDateFromString(notificationDate);
    date2.setHours(0, 0, 0, 0);
    let current_date = new Date();
    current_date.setHours(0, 0, 0, 0);

    if (this.startingDateValue === '') {
      this.startingDateValue = notificationDate;
      if (current_date >= date2) {
        //current_date >= date1 ||
        console.log('greater than equal to 1:', companyId, date2);
        this.notification_status = 'completed';
      } else {
        console.log('Less than 1:', companyId, date2);
        this.notification_status = 'in-progress';
      }
    } else {
      let date1: any = this.getDateFromString(this.startingDateValue);
      date1.setHours(0, 0, 0, 0);

      this.diffDays = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
      this.totalNumberOfDays += this.diffDays;
      this.startingDateValue = notificationDate;

      if (current_date >= date2) {
        //current_date >= date1 ||
        console.log('greater than equal to 2:', companyId, date2);
        this.notification_status = 'completed';
      } else {
        console.log('Less than 2:', companyId, date2);
        this.notification_status = 'in-progress';
      }
      return this.diffDays;
    }
  }
}
