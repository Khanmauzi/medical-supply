

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { ShipmentReceived2Component } from './ShipmentReceived2.component';
import {ShipmentReceived2Service} from './ShipmentReceived2.service';

describe('ShipmentReceived2Component', () => {
  let component: ShipmentReceived2Component;
  let fixture: ComponentFixture<ShipmentReceived2Component>;

  let mockShipmentReceived2Service;
  let mockDataService

  beforeEach(async(() => {

    mockShipmentReceived2Service = sinon.createStubInstance(ShipmentReceived2Service);
    mockShipmentReceived2Service.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ ShipmentReceived2Component ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: ShipmentReceived2Service, useValue: mockShipmentReceived2Service },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(ShipmentReceived2Component);
    component = fixture.componentInstance;

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

