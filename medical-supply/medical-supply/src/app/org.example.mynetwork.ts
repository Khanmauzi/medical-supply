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
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export abstract class Business extends Participant {
      email: string;
      address: Address;
      accountBalance: number;
   }
   export class Supplier extends Business {
   }
   export class Shipper extends Business {
   }
   export class Manufacturer extends Business {
   }
   export class Contract extends Asset {
      contractId: string;
      supplier: Supplier;
      shipper: Shipper;
      manufacturer: Manufacturer;
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
   export abstract class ShipmentTransaction extends Transaction {
      shipment: Shipment;
   }
   export class ShipmentHasArrived extends Event {
      shipment: Shipment;
   }
   export class ShipmentReceived extends ShipmentTransaction {
   }
   export class SetupDemo extends Transaction {
   }
// }
