import 'package:flutter/material.dart';

class Login extends StatelessWidget {
  const Login({super.key});

  //variables here

  @override
  Widget build(BuildContext context) {
    //ui here
    return const Scaffold(
      body: SingleChildScrollView(
        physics: BouncingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Hi Mom!"),
          ],
        ),
      ),
    );
  }
}
