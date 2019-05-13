

import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Manufacturer } from '../org.example.mynetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ManufacturerService {

  private NAMESPACE = 'Manufacturer';

  constructor(private dataService: DataService<Manufacturer>) {
  };

  public getAll(): Observable<Manufacturer[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Manufacturer> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Manufacturer> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Manufacturer> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Manufacturer> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
