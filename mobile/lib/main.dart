import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './pages/device_list_page.dart';
import './providers/bluetooth_state.dart';
import './providers/connected_device.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  Widget _buildApp() {
    return MaterialApp(
      // App setup
      title: 'Drift',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: const DeviceListPage(),

      // Routing
      routes: {
        DeviceListPage.routeName: (ctx) => const DeviceListPage(),
      },

      // Debug
      debugShowCheckedModeBanner: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => BluetoothState()),
        ChangeNotifierProvider(create: (context) => ConnectedDevice()),
      ],
      child: _buildApp(),
    );
  }
}
