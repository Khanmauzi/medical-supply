import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.mynetwork{
   export enum ShipmentStatus {
      CREATED,
      IN_TRANSIT,
      ARRIVED,
   }
   export abstract class Business extends Participant {
      email: string;
      address: string;
      accountBalance: number;
   }
   export class Supplier extends Business {
   }
   export class Shipper extends Business {
   }
   export class Manufacturer extends Business {
   }
   export class Distributor extends Business {
   }
   export class Contract extends Asset {
      contractId: string;
      supplier: Supplier;
      shipper: Shipper;
      manufacturer: Manufacturer;
      arrivalDateTime: Date;
      unitPrice: number;
   }
   export class Contract2 extends Asset {
      contractId: string;
      manufacturer: Manufacturer;
      shipper: Shipper;
      distributor: Distributor;
      arrivalDateTime: Date;
      unitPrice: number;
   }
   export class Shipment extends Asset {
      shipmentId: string;
      resource: string;
      status: ShipmentStatus;
      unitCount: number;
      contract: Contract;
   }
   export class Shipment2 extends Asset {
      shipmentId: string;
      resource: string;
      status: ShipmentStatus;
      unitCount: number;
      contract2: Contract2;
   }
   export abstract class ShipmentTransaction extends Transaction {
      shipment: Shipment;
   }
   export abstract class ShipmentTransaction2 extends Transaction {
      shipment2: Shipment2;
   }
   export class ShipmentHasArrived extends Event {
      shipment: Shipment;
   }
   export class ShipmentHasArrived2 extends Event {
      shipment2: Shipment2;
   }
   export class ShipmentReceived extends ShipmentTransaction {
   }
   export class ShipmentReceived2 extends ShipmentTransaction2 {
   }
   export class SetupDemo extends Transaction {
   }
// }
