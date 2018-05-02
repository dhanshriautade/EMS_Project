import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Services } from 'app/service/service.service';
import { BaThemeConfigProvider } from '../../../theme';
import { Session } from 'app/service/session.session';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class Calendar {
  public calendarConfiguration: any;
  private _calendar: Object;
  today: Date;
  allstoredevents = [];
  constructor(private _baConfig: BaThemeConfigProvider, private service: Services, private session: Session) {
    this.today = new Date();
    var def = '';
    this.allstoredevents = JSON.parse(this.session.getEvents())
    if ((this.today.getMonth() + 1) > 9) {
      def = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    } else {
      def = this.today.getFullYear() + '-0' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
    }
    this.calendarConfiguration = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: def,
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: this.allstoredevents
    };
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
  }

  ngOnInit() {
  }

  public onCalendarReady(calendar): void {
    this._calendar = calendar;
  }

  private _onSelect(start, end): void {
    if (this._calendar != null) {
      let title = prompt('Event Title:');
      let eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end,
          color: '#00abff'
        };
        this.allstoredevents.push(eventData);
        jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
        this.service.AddCalenderEvents(eventData).subscribe(res => {
          if (res.success) {
            sessionStorage.removeItem('events');
            sessionStorage.setItem("events", JSON.stringify(this.allstoredevents));
          } else {
            alert('error');
          }
        });
      }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
}
