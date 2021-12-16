import 'package:flutter/foundation.dart';
import 'package:mobile/api.dart';

class UserProvider with ChangeNotifier {
  String _accessToken = "";
  String _refreshToken = "";
  String _userId = "";
  String _email = "";

  String get accessToken => _accessToken;
  String get refreshToken => _refreshToken;
  String get userId => _userId;
  String get email => _email;

  set accessToken(String value) {
    _accessToken = value;
    if (value.isEmpty) {
      _refreshToken = "";
      _userId = "";
      _email = "";
      return notifyListeners();
    }

    getUser();
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

  set email(String value) {
    _email = value;
    notifyListeners();
  }

  Future<bool> loginUser(email, password) async {
    final tokens = await loginUserRequest(email, password);
    accessToken = tokens?['accessToken'] ?? "";
    refreshToken = tokens?['refreshToken'] ?? "";

    return accessToken.isNotEmpty && refreshToken.isNotEmpty;
  }

  void getUser() async {
    final user = await getUserRequest(accessToken);
    userId = user['_id'] ?? "";
    email = user['email'] ?? "";
  }

  void addUserData(double lat, double lng) async {
    if (userId.isEmpty || accessToken.isEmpty) {
      return;
    }
    postUserDataRequest(userId, lat, lng, accessToken);
  }
}
