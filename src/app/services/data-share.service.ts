import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private dataSource = new BehaviorSubject<any>(null);
  currentData$ = this.dataSource.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }
}
