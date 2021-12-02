import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/app_drawer.dart';
import '../widgets/device_list_item.dart';
import '../providers/bluetooth_state.dart';

class DeviceListPage extends StatelessWidget {
  const DeviceListPage({Key? key}) : super(key: key);

  static const routeName = "/device_list_page";

  @override
  Widget build(BuildContext context) {
    var bluetooth = Provider.of<BluetoothState>(context);
    var deviceList = bluetooth.deviceList;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Select Device"),
      ),
      body: ListView.builder(
        itemBuilder: (ctx, index) {
          var device = deviceList[index];
          return DeviceListItem(device);
        },
        itemCount: deviceList.length,
      ),
      drawer: const AppDrawer(),
    );
  }
}
