import 'package:http/http.dart' as http;
import 'dart:convert';

const apiBaseRoute = "68.183.35.107";

Future<Map<String, dynamic>?> loginUserRequest(
    String email, String password) async {
  // Make request
  var url = Uri.http(apiBaseRoute, "/auth");
  var res = await http.post(
    url,
    headers: {
      "Content-Type": "application/json",
    },
    body: json.encode({'email': email, 'password': password}),
  );

  // Successful login
  if (res.statusCode == 201) {
    return jsonDecode(res.body);
  }

  // Failed login attempt
  else {
    return null;
  }
}

Future<Map<String, dynamic>> getUserRequest(String accessToken) async {
  // Make request
  var url = Uri.http("68.183.35.107", "/users/me");
  var res = await http.get(
    url,
    headers: {
      // "Content-Type": "application/json",
      "Authorization": "Bearer $accessToken",
    },
  );

  return jsonDecode(res.body);
}

void postUserDataRequest(
    String userId, double lat, double lng, String accessToken) async {
  var url = Uri.http(apiBaseRoute, "/users/$userId/data");
  var res = await http.post(
    url,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer $accessToken",
    },
    body: json.encode({'location': '$lat $lng'}),
  );
}
