import { createBluetooth } from "node-ble";
import { getDevice } from "./getDevice";

getDevice();

// async function main() {
// 	const { bluetooth, destroy } = createBluetooth();

// 	console.log(await bluetooth.adapters());

// 	// get bluetooth adapter
// 	const adapterName = (await bluetooth.adapters())[0];
// 	const adapter = await bluetooth.getAdapter(adapterName);
// 	await adapter.startDiscovery();
// 	console.log("discovering");

// 	// get device and connect
// 	const device = await adapter.waitDevice(TEST_DEVICE);
// 	console.log(
// 		"got device",
// 		await device.getAddress(),
// 		await device.getName()
// 	);
// 	await device.connect();
// 	console.log("connected");

// 	const gattServer = await device.gatt();

// 	// read write characteristic
// 	const service1 = await gattServer.getPrimaryService(TEST_SERVICE);
// 	const characteristic1 = await service1.getCharacteristic(
// 		TEST_CHARACTERISTIC
// 	);
// 	await characteristic1.writeValue(Buffer.from("Hello world"));
// 	const buffer = await characteristic1.readValue();
// 	console.log("read", buffer, buffer.toString());

// 	// subscribe characteristic
// 	const service2 = await gattServer.getPrimaryService(TEST_NOTIFY_SERVICE);
// 	const characteristic2 = await service2.getCharacteristic(
// 		TEST_NOTIFY_CHARACTERISTIC
// 	);
// 	await characteristic2.startNotifications();
// 	await new Promise((done) => {
// 		characteristic2.once("valuechanged", (buffer) => {
// 			console.log("subscription", buffer);
// 			done();
// 		});
// 	});

// 	await characteristic2.stopNotifications();
// 	destroy();
// }
