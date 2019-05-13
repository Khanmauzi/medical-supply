

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../org.example.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class SupplierService {

  private NAMESPACE = 'Supplier';

  constructor(private dataService: DataService<Supplier>) {
  };

  public getAll(): Observable<Supplier[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Supplier> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Supplier> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Supplier> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Supplier> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
