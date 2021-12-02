import 'package:flutter/foundation.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';

class BluetoothState with ChangeNotifier {
  final FlutterBluetoothSerial _bluetooth = FlutterBluetoothSerial.instance;

  BluetoothState() {
    // Add all bonded devices to device list
    _bluetooth.getBondedDevices().asStream().listen((devices) {
      deviceList = devices;
    });
  }

  // Device list
  List<BluetoothDevice> _deviceList = [];

  List<BluetoothDevice> get deviceList {
    return [..._deviceList];
  }

  set deviceList(newDevices) {
    _deviceList = newDevices;
    notifyListeners();
  }

  void addDevice(BluetoothDevice newDevice) {
    _deviceList.add(newDevice);
    notifyListeners();
  }

  void addDevices(List<BluetoothDevice> newDevices) {
    _deviceList.addAll(newDevices);
    notifyListeners();
  }

  // Connected Device
  BluetoothDevice? _connectedDevice;
}
