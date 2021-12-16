import 'dart:convert';

import 'package:flutter/material.dart';

import '../providers/bluetooth_provider.dart';
import '../providers/user_provider.dart';
import '../api.dart';

class ConnectionPage extends StatefulWidget {
  const ConnectionPage(this.bluetooth, this.user, {Key? key}) : super(key: key);

  static const routeName = '/connection';

  final BluetoothProvider bluetooth;

  final UserProvider user;

  @override
  State<ConnectionPage> createState() => _ConnectionPageState();
}

class _ConnectionPageState extends State<ConnectionPage> {
  double latitude = 0;
  double longitude = 0;

  // Get current iteration of user data
  int current = 0;

  @override
  void initState() {
    super.initState();

    // Handle stream of incoming data
    String position = "";

    widget.bluetooth.connection?.input?.listen((input) {
      var current = ascii.decode(input);
      var split = current.split(';');

      position += split.first;

      // If semi-colon identified, parse string and reset position
      if (split.length > 1) {
        // parse complete string
        handlePosition(position);

        position = split[1];
      }
    });
  }

  @override
  void dispose() {
    super.dispose();

    // Dispose of stream
    widget.bluetooth.disconnect();
  }

  void handlePosition(String positionString) {
    var splitPosition = positionString.split(',');

    var newLat = double.tryParse(splitPosition[0]);
    var newLng = double.tryParse(splitPosition[1]);

    if (newLat != null && newLng != null) {
      setState(() {
        latitude = newLat;
        longitude = newLng;
      });

      current++;
      // Send data to server
      if (current > 5) {
        widget.user.addUserData(latitude, longitude);
        current = 0;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Connection Page"),
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Text(
                "Connected to ${widget.bluetooth.connectedDevice!.name!}",
                style: Theme.of(context).textTheme.headline4,
              ),
            ),
            Text(
              "Latitude: $latitude",
              style: Theme.of(context).textTheme.headline5,
            ),
            Text(
              "Longitude: $longitude",
              style: Theme.of(context).textTheme.headline5,
            ),
          ],
        ),
      ),
    );
  }
}
