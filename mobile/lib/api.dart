import 'package:http/http.dart' as http;
import 'dart:convert';

void loginUser(String email, String password) async {
  print(
    "Logging in to user $email.",
  );
  var url = Uri.http("68.183.35.107", "/auth");
  var res = await http.post(
    url,
    headers: {
      "Content-Type": "application/json",
    },
    body: json.encode({'email': email, 'password': password}),
  );

  if (res.statusCode == 201) {
    print(
      "Logged in to user $email.",
    );

    Map<String, dynamic> result = jsonDecode(res.body);

    String access = result['accessToken'];
    String refresh = result['refreshToken'];

    print("accessToken: $access");
    print("refreshToken: $refresh");
  } else {
    print(
      "Failed to log in to user $email.",
    );
  }
}

void postUserData(String userId, double latitude, double longitude) async {
  print(
    "Uploading user data. UserId: $userId. Location: ($latitude, $longitude)",
  );
  var url = Uri.http("68.183.35.107", "/users/$userId/data");
  await http.post(url, body: {'location': '$latitude $longitude'});
}
