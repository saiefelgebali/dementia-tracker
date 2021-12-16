import 'package:http/http.dart' as http;
import 'dart:convert';

const apiBaseRoute = "68.183.35.107";

Future<Map<String, dynamic>?> loginUserRequest(
    String email, String password) async {
  print(
    "Logging in to user $email.",
  );

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
    print(
      "Logged in to user $email.",
    );

    return jsonDecode(res.body);
  }

  // Failed login attempt
  else {
    print(
      "Failed to log in to user $email.",
    );

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

  print(res.body);

  return jsonDecode(res.body);
}

void postUserData(String userId, double latitude, double longitude) async {
  print(
    "Uploading user data. UserId: $userId. Location: ($latitude, $longitude)",
  );
  var url = Uri.http("68.183.35.107", "/users/$userId/data");
  await http.post(url, body: {'location': '$latitude $longitude'});
}
