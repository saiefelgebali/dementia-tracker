import 'package:flutter/material.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:provider/provider.dart';

import './pages/device_list_page.dart';
import './pages/connection_page.dart';
import 'providers/bluetooth_provider.dart';

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
        ConnectionPage.routeName: (ctx) =>
            ConnectionPage(Provider.of<BluetoothProvider>(ctx)),
        LoginPage.routeName: (ctx) => const LoginPage(),
      },

      // Debug
      debugShowCheckedModeBanner: false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => BluetoothProvider()),
      ],
      child: _buildApp(),
    );
  }
}
