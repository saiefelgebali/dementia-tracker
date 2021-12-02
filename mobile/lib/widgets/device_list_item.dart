import 'package:flutter/material.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart' as bt;
import 'package:provider/provider.dart';

import '../providers/bluetooth_state.dart';

class DeviceListItem extends StatefulWidget {
  const DeviceListItem(this.device, {Key? key}) : super(key: key);

  final bt.BluetoothDevice device;

  @override
  State<DeviceListItem> createState() => _DeviceListItemState();
}

class _DeviceListItemState extends State<DeviceListItem> {
  bool _connecting = false;

  // Connect to device
  void _connectDevice(BluetoothState bluetooth) async {
    setState(() {
      _connecting = true;
    });

    await bluetooth.connectToDevice(widget.device);

    setState(() {
      _connecting = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    var bluetooth = Provider.of<BluetoothState>(context);

    // Is this device currently connected to client?
    var isConnected =
        bluetooth.connectedDevice?.address == widget.device.address;

    print(bluetooth.connectedDevice?.address);

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
