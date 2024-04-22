import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitService } from 'src/app/core/services/event-emit.service';


@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  constructor(private router: Router, private eventEmitService: EventEmitService) { }

  @Input() title: string = "";

  @Input() subMenus: any = [];

  sub1: any = typeof this.subMenus;


  goToPage(path: string) {
    // Check if the path is an external URL
    if (path.startsWith('http') || path.startsWith('www')) {
      // If it's an external URL, open it in a new tab/window
      window.open(path, '_blank');
    } else {
      // Otherwise, it's an internal route
      this.eventEmitService.emitData(path);
      this.router.navigate([path]);
    }
  } 
}


