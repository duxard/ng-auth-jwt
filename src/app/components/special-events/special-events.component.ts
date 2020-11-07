import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {Events} from '../../services/event/events';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents: Array<Events> = [];

  constructor(private eventsService: EventService) { }

  ngOnInit(): void {
    this.eventsService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        error => console.log(error)
      );
  }
}
