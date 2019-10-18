import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count === 5) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }

        count++;
      }, 1000);
    });

    // customIntervalObservable.pipe( map( (data: number) => {
    //   return 'Roound: ' + (data + 1);
    // }) );

    this.firstObsSubscription = customIntervalObservable.pipe( 
      filter( (data: number) => {
        return data > 0;
      }), 
      map( (data: number) => {
        return 'Roound: ' + (data + 1);
      }) ).subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, complete => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
