

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { ShipmentReceivedComponent } from './ShipmentReceived.component';
import {ShipmentReceivedService} from './ShipmentReceived.service';

describe('ShipmentReceivedComponent', () => {
  let component: ShipmentReceivedComponent;
  let fixture: ComponentFixture<ShipmentReceivedComponent>;

  let mockShipmentReceivedService;
  let mockDataService

  beforeEach(async(() => {

    mockShipmentReceivedService = sinon.createStubInstance(ShipmentReceivedService);
    mockShipmentReceivedService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ ShipmentReceivedComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: ShipmentReceivedService, useValue: mockShipmentReceivedService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(ShipmentReceivedComponent);
    component = fixture.componentInstance;

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

