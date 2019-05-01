/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Contract', component: ContractComponent },
  { path: 'Contract2', component: Contract2Component },
  { path: 'Shipment', component: ShipmentComponent },
  { path: 'Shipment2', component: Shipment2Component },
  { path: 'Supplier', component: SupplierComponent },
  { path: 'Shipper', component: ShipperComponent },
  { path: 'Manufacturer', component: ManufacturerComponent },
  { path: 'Distributor', component: DistributorComponent },
  { path: 'ShipmentReceived', component: ShipmentReceivedComponent },
  { path: 'ShipmentReceived2', component: ShipmentReceived2Component },
  { path: 'SetupDemo', component: SetupDemoComponent },
  { path: 'AllTransactions', component: AllTransactionsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
