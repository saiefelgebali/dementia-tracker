import 'package:flutter/material.dart';
import 'package:mobile/pages/device_list_page.dart';

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
        ],
      ),
    );
  }
}
