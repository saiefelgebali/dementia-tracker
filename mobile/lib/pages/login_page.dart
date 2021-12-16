import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/user_provider.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  static const routeName = "/login_page";

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  var emailController = TextEditingController();
  var passwordController = TextEditingController();

  void login(UserProvider userProvider) {
    final email = emailController.text;
    final password = passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      return;
    }

    userProvider.loginUser(email, password);
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Login"),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Username
              TextField(
                decoration: const InputDecoration(
                  hintText: "Email",
                ),
                controller: emailController,
              ),
              const SizedBox(height: 20),

              // Password
              TextField(
                decoration: const InputDecoration(
                  hintText: "Password",
                ),
                obscureText: true,
                enableSuggestions: false,
                autocorrect: false,
                controller: passwordController,
              ),
              const SizedBox(height: 20),

              // Login button
              Container(
                alignment: Alignment.centerRight,
                child: SizedBox(
                  width: 150,
                  height: 40,
                  child: ElevatedButton(
                    child: const Text("Login"),
                    onPressed: () => login(userProvider),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
