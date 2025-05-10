import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private dataSource = new BehaviorSubject<any>(null);
  currentData$ = this.dataSource.asObservable();

  private requestObject = new Subject<void>();
  request$ = this.requestObject.asObservable();

  private responseObject = new Subject<any>();
  response$ = this.responseObject.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }

  requestData() {
    this.requestObject.next();
  }

  responseData(data: any) {
    this.responseObject.next(data);
  }
}
