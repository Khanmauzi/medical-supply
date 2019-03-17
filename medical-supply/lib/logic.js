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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 *A shipment has been received by an importer
 * @param {org.example.mynetwork.ShipmentReceived} shipmentReceived - the ShipmentReceived transaction
 * @transaction
 */
function payOut(shipmentReceived) {

    var contract = shipmentReceived.shipment.contract;
    var shipment = shipmentReceived.shipment;
    var payOut = contract.unitPrice * shipment.unitCount;

    console.log('Received at: ' + shipmentReceived.timestamp);
    console.log('Contract arrivalDateTime: ' + contract.arrivalDateTime);

    // set the status of the shipment
    shipment.status = 'ARRIVED';

    // if the shipment did not arrive on time the payout is zero
   /* if (shipmentReceived.timestamp > contract.arrivalDateTime) {
        payOut = 0;
        console.log('Late shipment');
    } else {
        // find the lowest temperature reading
        if (shipment.temperatureReadings) {
            // sort the temperatureReadings by centigrade
            shipment.temperatureReadings.sort(function (a, b) {
                return (a.centigrade - b.centigrade);
            });
            var lowestReading = shipment.temperatureReadings[0];
            var highestReading = shipment.temperatureReadings[shipment.temperatureReadings.length - 1];
            var penalty = 0;
            console.log('Lowest temp reading: ' + lowestReading.centigrade);
            console.log('Highest temp reading: ' + highestReading.centigrade);

            // does the lowest temperature violate the contract?
            if (lowestReading.centigrade < contract.minTemperature) {
                penalty += (contract.minTemperature - lowestReading.centigrade) * contract.minPenaltyFactor;
                console.log('Min temp penalty: ' + penalty);
            }

            // does the highest temperature violate the contract?
            if (highestReading.centigrade > contract.maxTemperature) {
                penalty += (highestReading.centigrade - contract.maxTemperature) * contract.maxPenaltyFactor;
                console.log('Max temp penalty: ' + penalty);
            }

            // apply any penalities
            payOut -= (penalty * shipment.unitCount);

            if (payOut < 0) {
                payOut = 0;
            }
        }
    }*/

    console.log('Payout: ' + payOut);
    contract.supplier.accountBalance += payOut;
    contract.manufacturer.accountBalance -= payOut;

    console.log('Supplier: ' + contract.supplier.$identifier + ' new balance: ' + contract.supplier.accountBalance);
    console.log('Manufacurer: ' + contract.Manfucaturer.$identifier + ' new balance: ' + contract.manufacturer.accountBalance);

    return getParticipantRegistry('org.example.mynetwork.Supplier')
        .then(function (supplierRegistry) {
            // update the grower's balance
            return supplierRegistry.update(contract.supplier);
        })
        .then(function () {
            return getParticipantRegistry('org.example.mynetwork.Manufacturer');
        })
        .then(function (manufacturerRegistry) {
            // update the importer's balance
            return manufacturerRegistry.update(contract.manufacturer);
        })
        .then(function () {
            return getAssetRegistry('org.example.mynetwork.Shipment');
        })
        .then(function (shipmentRegistry) {
            // Create new event
            var shipmentNotification = getFactory().newEvent('org.example.mynetwork', 'ShipmentHasArrived');
            shipmentNotification.shipment = shipment;
            emit(shipmentNotification);
            // update the state of the shipment
            return shipmentRegistry.update(shipment);
        });
}

