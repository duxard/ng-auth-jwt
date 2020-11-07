import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {Events} from '../../services/event/events';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  publicEvents: Array<Events> = [];

  constructor(private eventsService: EventService) { }

  ngOnInit(): void {
    this.eventsService.getPublicEvents()
      .subscribe(
        res => this.publicEvents = res,
        error => console.log(error)
      );
  }
}
