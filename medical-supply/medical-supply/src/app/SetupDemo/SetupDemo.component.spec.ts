

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as sinon from 'sinon';
import { DataService } from '../data.service';
import { SetupDemoComponent } from './SetupDemo.component';
import {SetupDemoService} from './SetupDemo.service';

describe('SetupDemoComponent', () => {
  let component: SetupDemoComponent;
  let fixture: ComponentFixture<SetupDemoComponent>;

  let mockSetupDemoService;
  let mockDataService

  beforeEach(async(() => {

    mockSetupDemoService = sinon.createStubInstance(SetupDemoService);
    mockSetupDemoService.getAll.returns([]);
    mockDataService = sinon.createStubInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [ SetupDemoComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
        {provide: SetupDemoService, useValue: mockSetupDemoService },
        {provide: DataService, useValue: mockDataService },
      ]
    });

    fixture = TestBed.createComponent(SetupDemoComponent);
    component = fixture.componentInstance;

  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

