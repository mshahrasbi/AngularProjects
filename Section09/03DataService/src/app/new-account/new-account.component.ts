import { Component, OnInit } from '@angular/core';

import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent implements OnInit {

  constructor(private loggingServerice: LoggingService,
              private accoubtService: AccountService) { }

  ngOnInit() {
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accoubtService.addAccount(accountName, accountStatus);
    this.loggingServerice.LogStatusChange(accountStatus);
  }
}
