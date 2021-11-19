import { createBluetooth } from "node-ble";

export async function getDevice() {
	const { bluetooth, destroy } = createBluetooth();

	// get adapter
	const adapters = await bluetooth.adapters();
	const adapterName = adapters[0];
	const adapter = await bluetooth.getAdapter(adapterName);

	// search for devices
	await adapter.startDiscovery();
	const devices = await adapter.devices();

	devices.forEach(async (uuid) => {
		console.log(uuid);
		// const device = await adapter.getDevice(uuid);
		// console.log(await device.getName());
	});
}

getDevice();
