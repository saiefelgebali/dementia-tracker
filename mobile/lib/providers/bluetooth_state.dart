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

  BluetoothDevice? get connectedDevice {
    return _connectedDevice;
  }

  BluetoothConnection? _connection;

  BluetoothConnection? get connection {
    return _connection;
  }

  Future<bool> connectToDevice(BluetoothDevice device) async {
    print("Connecting to ${device.name}");

    // try to make connection to device
    try {
      // successful connection
      _connection = await BluetoothConnection.toAddress(device.address);
      _connectedDevice = device;
      return true;
    } catch (e) {
      // error connecting
      return false;
    }
  }
}
