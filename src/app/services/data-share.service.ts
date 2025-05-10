import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private dataSource = new BehaviorSubject<any>(null);
  currentData$ = this.dataSource.asObservable();

  private requestObject = new BehaviorSubject<any>(null);
  request$ = this.requestObject.asObservable();

  private responseObject = new BehaviorSubject<any>(null);
  response$ = this.responseObject.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }

  requestData() {
    this.requestObject.next(null);
  }

  responseData(data: any) {
    this.responseObject.next(data);
  }
}
