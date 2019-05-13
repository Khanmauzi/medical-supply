

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Contract2Service } from './Contract2.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contract2',
  templateUrl: './Contract2.component.html',
  styleUrls: ['./Contract2.component.css'],
  providers: [Contract2Service]
})
export class Contract2Component implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  contractId = new FormControl('', Validators.required);
  manufacturer = new FormControl('', Validators.required);
  shipper = new FormControl('', Validators.required);
  distributor = new FormControl('', Validators.required);
  arrivalDateTime = new FormControl('', Validators.required);
  unitPrice = new FormControl('', Validators.required);

  constructor(public serviceContract2: Contract2Service, fb: FormBuilder) {
    this.myForm = fb.group({
      contractId: this.contractId,
      manufacturer: this.manufacturer,
      shipper: this.shipper,
      distributor: this.distributor,
      arrivalDateTime: this.arrivalDateTime,
      unitPrice: this.unitPrice
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContract2.getAll()
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
      $class: 'org.example.mynetwork.Contract2',
      'contractId': this.contractId.value,
      'manufacturer': this.manufacturer.value,
      'shipper': this.shipper.value,
      'distributor': this.distributor.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'unitPrice': this.unitPrice.value
    };

    this.myForm.setValue({
      'contractId': null,
      'manufacturer': null,
      'shipper': null,
      'distributor': null,
      'arrivalDateTime': null,
      'unitPrice': null
    });

    return this.serviceContract2.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'contractId': null,
        'manufacturer': null,
        'shipper': null,
        'distributor': null,
        'arrivalDateTime': null,
        'unitPrice': null
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
      $class: 'org.example.mynetwork.Contract2',
      'manufacturer': this.manufacturer.value,
      'shipper': this.shipper.value,
      'distributor': this.distributor.value,
      'arrivalDateTime': this.arrivalDateTime.value,
      'unitPrice': this.unitPrice.value
    };

    return this.serviceContract2.updateAsset(form.get('contractId').value, this.asset)
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

    return this.serviceContract2.deleteAsset(this.currentId)
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

    return this.serviceContract2.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'contractId': null,
        'manufacturer': null,
        'shipper': null,
        'distributor': null,
        'arrivalDateTime': null,
        'unitPrice': null
      };

      if (result.contractId) {
        formObject.contractId = result.contractId;
      } else {
        formObject.contractId = null;
      }

      if (result.manufacturer) {
        formObject.manufacturer = result.manufacturer;
      } else {
        formObject.manufacturer = null;
      }

      if (result.shipper) {
        formObject.shipper = result.shipper;
      } else {
        formObject.shipper = null;
      }

      if (result.distributor) {
        formObject.distributor = result.distributor;
      } else {
        formObject.distributor = null;
      }

      if (result.arrivalDateTime) {
        formObject.arrivalDateTime = result.arrivalDateTime;
      } else {
        formObject.arrivalDateTime = null;
      }

      if (result.unitPrice) {
        formObject.unitPrice = result.unitPrice;
      } else {
        formObject.unitPrice = null;
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
      'contractId': null,
      'manufacturer': null,
      'shipper': null,
      'distributor': null,
      'arrivalDateTime': null,
      'unitPrice': null
      });
  }

}
