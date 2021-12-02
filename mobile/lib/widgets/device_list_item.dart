import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';

class DeviceListItem extends StatelessWidget {
  const DeviceListItem(this.device, {Key? key}) : super(key: key);

  final BluetoothDevice device;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(device.name ?? "(Unknown)"),
      subtitle: Text(device.address),
    );
  }
}
