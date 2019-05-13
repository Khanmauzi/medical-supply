

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ShipmentReceived } from '../org.example.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ShipmentReceivedService {

  private NAMESPACE = 'ShipmentReceived';

  constructor(private dataService: DataService<ShipmentReceived>) {
  };

  public getAll(): Observable<ShipmentReceived[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<ShipmentReceived> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<ShipmentReceived> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<ShipmentReceived> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<ShipmentReceived> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

