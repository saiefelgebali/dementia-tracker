import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';
import 'package:provider/provider.dart';

import '../pages/connection_page.dart';
import '../providers/bluetooth_provider.dart';

class DeviceListItem extends StatefulWidget {
  const DeviceListItem(this.device, {Key? key}) : super(key: key);

  final BluetoothDevice device;

  @override
  State<DeviceListItem> createState() => _DeviceListItemState();
}

class _DeviceListItemState extends State<DeviceListItem> {
  bool _connecting = false;

  // Connect to device
  void _connectDevice(BluetoothProvider bluetooth) async {
    setState(() {
      _connecting = true;
    });

    var connected = await bluetooth.connectToDevice(widget.device);

    // Redirect to connection page on succesful connection
    if (connected) {
      Navigator.of(context).pushNamed(ConnectionPage.routeName);
    }

    setState(() {
      _connecting = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    var bluetooth = Provider.of<BluetoothProvider>(context);

    // Is this device currently connected to client?
    var isConnected =
        bluetooth.connectedDevice?.address == widget.device.address;

    // Set subtitle text based on connection status
    var subtitleMessage = isConnected
        ? "Connected"
        : _connecting
            ? "Connecting"
            : widget.device.address;

    return ListTile(
      title: Text(widget.device.name ?? "(Unknown)"),
      subtitle: Text(subtitleMessage),
      onTap: () => _connectDevice(bluetooth),
    );
  }
}
