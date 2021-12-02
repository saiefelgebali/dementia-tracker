import 'package:flutter/foundation.dart';
import 'package:flutter_bluetooth_serial/flutter_bluetooth_serial.dart';

class ConnectedDevice with ChangeNotifier {
  // Bluetoth device object
  BluetoothDevice? _device;

  get device {
    return _device;
  }

  set device(newDevice) {
    _device = newDevice;
    notifyListeners();
  }

  // Bluetooth connection object
  BluetoothConnection? _connection;

  get connection {
    return _connection;
  }

  set connection(newConnection) {
    _connection = newConnection;
    notifyListeners();
  }
}
