import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Log } from '../log/log';
import { LogService } from '../log.service/log.service';

// material directives
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';


@Component({
  selector: 'my-dashboard',
  styleUrls: ['./app/dashboard/dashboard.component.css'],
  templateUrl: './app/dashboard/dashboard.component.html',
  directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MdIcon],
  providers: [MdIconRegistry,
    LogService]
})
export class DashboardComponent implements OnInit {
  logs: Log[] = [];
  filteredLogs: Log[] = [];
  constructor(private router: Router, private logService: LogService) { }
  hasIssue(log: Log) {
    return log.priority > -1;
  }
  comparePriority(a, b) {
    if (a.priority > b.priority)
      return -1;
    if (a.priority < b.priority)
      return 1;
    return 0;
  }

  ngOnInit() {
    this.logService.getLogs()
      .then(logs => {
        this.filteredLogs = logs.filter(this.hasIssue);
        for (var log of this.filteredLogs) {
          this.logs.push(new Log(log));
        }
        this.logs.sort(this.comparePriority);
      });
  }
  goToDetail(log: Log) {
    let link = ['LogDetail', { id: log.id }];
    this.router.navigate(link);
  }
  goToNotify(log: Log) {
    let link = ['LogMessaging', { id: log.id }];
    this.router.navigate(link);
  }

}
