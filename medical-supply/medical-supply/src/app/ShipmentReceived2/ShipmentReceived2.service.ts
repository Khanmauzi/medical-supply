

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ShipmentReceived2 } from '../org.example.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ShipmentReceived2Service {

  private NAMESPACE = 'ShipmentReceived2';

  constructor(private dataService: DataService<ShipmentReceived2>) {
  };

  public getAll(): Observable<ShipmentReceived2[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<ShipmentReceived2> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<ShipmentReceived2> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<ShipmentReceived2> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<ShipmentReceived2> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

