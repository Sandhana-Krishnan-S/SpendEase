import 'package:flutter/material.dart';
import 'package:frontend_flutter/model/AppTheme.dart';
import 'package:frontend_flutter/view/Login.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const Login(),
      theme: ThemeData(
        primaryColor: AppTheme.primaryColor,
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}