import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:frontend_flutter/controller/UserDetailValidate.dart';
import 'package:frontend_flutter/model/AppTheme.dart';


import 'package:http/http.dart' as http;

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  //variables here
  String? email;
  String? password;
  bool showPassword = false ;
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  Future<void> validate() async {
    bool email = UserDetailValidate.emailValidate(_emailController.text);
    bool password = UserDetailValidate.passwordValidate(_passwordController.text);
    if(!email || !password) {
      print("invalid value");
      return;
    }
    Map<String, dynamic> response = await loginController(_emailController.text , _passwordController.text);
    if(response['status'] == false) {
      print(response['error']);
      return;
    }
    print('Success : data = ${response['data']}');
  }
  
  //api call
  Future<Map<String, dynamic>> loginController(String email, String password) async {
    try {
      var url = Uri.parse("http://localhost:8080/api/auth/login");
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      var jsonResponse = jsonDecode(response.body);

      if (response.statusCode != 201 || jsonResponse['status'] != true) {
        return {
          'status': false,
          'data': null,
          'error': jsonResponse['error'] ?? 'Unknown error',
        };
      }

      return {
        'status': true,
        'data': jsonResponse['data'],
        'error': null,
      };
    } catch (error) {
      print(error.toString());
      return {
        'status': false,
        'data': null,
        'error': 'Internal Server Error',
      };
    }
  }



  void passwordToggle() {
    setState(() {
      showPassword = !showPassword;
    });
  }


  @override
  Widget build(BuildContext context) {
    //ui here
    return Scaffold(
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(padding: EdgeInsets.only(top : 64.0 , left: 24.0 , bottom: 22.0),
              child: Text(
                'Login',
                style: TextStyle(
                  fontSize: 28.0,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.black
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(left: 24.0),
              child: const Text(
                'Email',
                style: TextStyle(
                  fontSize: 14.0,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.black
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(left: 24.0 , right: 16.0 , top: 10.0),
              child: TextFormField(
                controller: _emailController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                    borderSide: const BorderSide( width: 10.0 , color: AppTheme.grey),
                  ),
                  hintText: 'Your Email' ,
                  hintStyle: const TextStyle(
                    fontWeight: FontWeight.normal ,
                    color: AppTheme.black,
                    fontSize: 16.0 ,
                  ),
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(left: 24.0 , top: 18.0),
              child: const Text(
                'Password',
                style: TextStyle(
                  fontSize: 14.0,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.black
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(left: 24.0 , right: 16.0 , top: 10.0),
              child: TextFormField(
                controller: _passwordController,
                obscureText: !showPassword,
                decoration: InputDecoration(
                  suffixIcon: IconButton(
                    padding: const EdgeInsetsDirectional.only(end: 12.0),
                    icon: showPassword ? const Icon(Icons.visibility_outlined) : const Icon(Icons.visibility_off_outlined),
                    onPressed: passwordToggle,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                    borderSide: const BorderSide( width: 10.0 , color: AppTheme.grey),
                  ),
                  hintText: 'Your Password' ,
                  hintStyle: const TextStyle(
                    fontWeight: FontWeight.normal ,
                    fontSize: 16.0 ,
                    color: AppTheme.black
                  ),
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(right: 16.0 , top: 10),
              child: Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {
                  },
                  child: const Text(
                    'Forgot Password?',
                    style: TextStyle(
                      color: AppTheme.primaryColor,
                      fontSize: 12.0,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(right: 16.0, left: 24.0, top: 32.0),
              child: Align(
                alignment: Alignment.center,
                child: SizedBox(
                  width: double.infinity,
                  height: 44.0,
                  child: ElevatedButton(
                    onPressed: validate,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primaryColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(6.0),
                      ),
                      elevation: 1,
                    ),
                    child: const Text(
                      'Login',
                      style: TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.white,
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.only(top: 40.0),
              child: Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center ,
                  children:  [
                    const Text(
                      "Don't have an account?" ,
                      style: TextStyle(
                        color: AppTheme.grey,
                        fontSize: 12.0 ,
                        fontWeight: FontWeight.normal ,
                      ),
                    ) ,
                    const SizedBox(width: 2.5) ,
                    InkWell(
                      onTap: () {},
                      child: const Text(
                        'Signup' ,
                        style: TextStyle(
                          color: AppTheme.primaryColor ,
                          fontSize: 12.0 ,
                          fontWeight: FontWeight.normal ,
                        ),
                      ),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
