import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Weather } from '../components/weather.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private subject:BehaviorSubject<any> = new BehaviorSubject<any>("");

  sendFavorite(_favorite: any) {
    debugger;
    this.subject.next(_favorite);
  }


  getFavorite(): Observable<any> {
    return this.subject.asObservable();
  }
  

}
