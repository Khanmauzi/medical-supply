

'use strict';


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

    console.log('Payout: ' + payOut);
    contract.supplier.accountBalance += payOut;
    contract.manufacturer.accountBalance -= payOut;

    //console.log('Supplier: ' + contract.supplier.$identifier + ' new balance: ' + contract.supplier.accountBalance);
    //console.log('Manufacurer: ' + contract.Manfucaturer.$identifier + ' new balance: ' + contract.manufacturer.accountBalance);

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
/**
 *A shipment has been received by an importer
 * @param {org.example.mynetwork.ShipmentReceived2} shipmentReceived2 - the ShipmentReceived transaction
 * @transaction
 */

function payOut2(shipmentReceived2) {

    var contract2 = shipmentReceived2.shipment2.contract2;
    var shipment2 = shipmentReceived2.shipment2;
    var payOut2 = contract2.unitPrice * shipment2.unitCount;

    console.log('Received at: ' + shipmentReceived2.timestamp);
    console.log('Contract arrivalDateTime: ' + contract2.arrivalDateTime);

    // set the status of the shipment
    shipment2.status = 'ARRIVED';

    console.log('Payout: ' + payOut2);
    contract2.manufacturer.accountBalance += payOut2;
    contract2.distributor.accountBalance -= payOut2;

    console.log('Manufacturer: ' + contract2.manufacturer.$identifier + ' new balance: ' + contract2.manufacturer.accountBalance);
    console.log('Distributor: ' + contract2.distributor.$identifier + ' new balance: ' + contract2.distributor.accountBalance);

    return getParticipantRegistry('org.example.mynetwork.Manufacturer')
        .then(function (manufacturerRegistry) {
            // update the grower's balance
            return manufacturerRegistry.update(contract2.manufacturer);
        })
        .then(function () {
            return getParticipantRegistry('org.example.mynetwork.Distributor');
        })
        .then(function (distributorRegistry) {
            // update the importer's balance
            return distributorRegistry.update(contract2.distributor);
        })
        .then(function () {
            return getAssetRegistry('org.example.mynetwork.Shipment2');
        })
        .then(function (shipment2Registry) {
            // Create new event
            var shipment2Notification = getFactory().newEvent('org.example.mynetwork', 'ShipmentHasArrived2');
            shipment2Notification.shipment2 = shipment2;
            emit(shipment2Notification);
            // update the state of the shipment
            return shipment2Registry.update(shipment2);
        });
}