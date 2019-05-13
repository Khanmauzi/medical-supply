

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Shipment2Service } from './Shipment2.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-shipment2',
  templateUrl: './Shipment2.component.html',
  styleUrls: ['./Shipment2.component.css'],
  providers: [Shipment2Service]
})
export class Shipment2Component implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  shipmentId = new FormControl('', Validators.required);
  resource = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  unitCount = new FormControl('', Validators.required);
  contract2 = new FormControl('', Validators.required);

  constructor(public serviceShipment2: Shipment2Service, fb: FormBuilder) {
    this.myForm = fb.group({
      shipmentId: this.shipmentId,
      resource: this.resource,
      status: this.status,
      unitCount: this.unitCount,
      contract2: this.contract2
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceShipment2.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Shipment2',
      'shipmentId': this.shipmentId.value,
      'resource': this.resource.value,
      'status': this.status.value,
      'unitCount': this.unitCount.value,
      'contract2': this.contract2.value
    };

    this.myForm.setValue({
      'shipmentId': null,
      'resource': null,
      'status': null,
      'unitCount': null,
      'contract2': null
    });

    return this.serviceShipment2.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'shipmentId': null,
        'resource': null,
        'status': null,
        'unitCount': null,
        'contract2': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.mynetwork.Shipment2',
      'resource': this.resource.value,
      'status': this.status.value,
      'unitCount': this.unitCount.value,
      'contract2': this.contract2.value
    };

    return this.serviceShipment2.updateAsset(form.get('shipmentId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceShipment2.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceShipment2.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'shipmentId': null,
        'resource': null,
        'status': null,
        'unitCount': null,
        'contract2': null
      };

      if (result.shipmentId) {
        formObject.shipmentId = result.shipmentId;
      } else {
        formObject.shipmentId = null;
      }

      if (result.resource) {
        formObject.resource = result.resource;
      } else {
        formObject.resource = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.unitCount) {
        formObject.unitCount = result.unitCount;
      } else {
        formObject.unitCount = null;
      }

      if (result.contract2) {
        formObject.contract2 = result.contract2;
      } else {
        formObject.contract2 = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'shipmentId': null,
      'resource': null,
      'status': null,
      'unitCount': null,
      'contract2': null
      });
  }

}
