import 'package:flutter/material.dart';

import 'pages/device_list_page.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Drift',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
      ),
      home: const DeviceListPage(),
      routes: {
        DeviceListPage.routeName: (ctx) => const DeviceListPage(),
      },
    );
  }
}
