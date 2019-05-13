

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ContractComponent } from './Contract/Contract.component';
import { Contract2Component } from './Contract2/Contract2.component';
import { ShipmentComponent } from './Shipment/Shipment.component';
import { Shipment2Component } from './Shipment2/Shipment2.component';

import { SupplierComponent } from './Supplier/Supplier.component';
import { ShipperComponent } from './Shipper/Shipper.component';
import { ManufacturerComponent } from './Manufacturer/Manufacturer.component';
import { DistributorComponent } from './Distributor/Distributor.component';

import { ShipmentReceivedComponent } from './ShipmentReceived/ShipmentReceived.component';
import { ShipmentReceived2Component } from './ShipmentReceived2/ShipmentReceived2.component';
import { SetupDemoComponent } from './SetupDemo/SetupDemo.component';
import { AllTransactionsComponent } from './AllTransactions/AllTransactions.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContractComponent,
    Contract2Component,
    ShipmentComponent,
    Shipment2Component,
    SupplierComponent,
    ShipperComponent,
    ManufacturerComponent,
    DistributorComponent,
    ShipmentReceivedComponent,
    ShipmentReceived2Component,
    SetupDemoComponent,
    AllTransactionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
