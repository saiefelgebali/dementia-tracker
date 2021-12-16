import 'package:flutter/foundation.dart';
import 'package:mobile/api.dart';

class UserProvider with ChangeNotifier {
  String _accessToken = "";
  String _refreshToken = "";
  String _userId = "";

  String get accessToken => _accessToken;
  String get refreshToken => _refreshToken;
  String get userId => _userId;

  set accessToken(String value) {
    _accessToken = value;
    if (value.isNotEmpty) {
      getUser();
    }
    notifyListeners();
  }

  set refreshToken(String value) {
    _refreshToken = value;
    notifyListeners();
  }

  set userId(String value) {
    _userId = value;
    notifyListeners();
  }

  void loginUser(email, password) async {
    final tokens = await loginUserRequest(email, password);
    accessToken = tokens?['accessToken'] ?? "";
    refreshToken = tokens?['refreshToken'] ?? "";
  }

  void getUser() async {
    print('get user using access: $accessToken');
    final user = await getUserRequest(accessToken);
    String? id = user['id'];
    userId = id ?? "";
  }
}
