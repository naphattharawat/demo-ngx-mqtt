import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  messages = [];
  private subscription: Subscription;
  public message: string;

  constructor(
    private _mqttService: MqttService
  ) {
    this.subscription = this._mqttService.observe('test').subscribe((message: IMqttMessage) => {
      console.log(message.payload.toString());
      // this.message = message.payload.toString();
      
      // this.messages.push(this.message)
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}