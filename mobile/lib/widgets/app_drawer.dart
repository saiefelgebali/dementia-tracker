import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../pages/device_list_page.dart';
import '../pages/connection_page.dart';
import '../providers/bluetooth_provider.dart';

class AppDrawer extends StatelessWidget {
  const AppDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          AppBar(
            title: const Text("Drift"),
          ),

          // Device list
          const Divider(),
          ListTile(
            leading: const Icon(Icons.bluetooth),
            title: const Text("Device list"),
            onTap: () {
              Navigator.of(context).pushNamed(DeviceListPage.routeName);
            },
          ),
          Consumer<BluetoothProvider>(builder: (context, bluetooth, child) {
            var device = bluetooth.connectedDevice;

            if (device == null) return Container();

            return ListTile(
              leading: const Icon(Icons.bluetooth),
              title: Text(device.name!),
              onTap: () {
                Navigator.of(context).pushNamed(ConnectionPage.routeName);
              },
            );
          })
        ],
      ),
    );
  }
}
