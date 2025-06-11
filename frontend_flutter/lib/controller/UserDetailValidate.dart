class UserDetailValidate {

  static bool userNameValidate(String userName) {
    userName = userName.trim();
    return userName.length >= 3 && userName.length <= 15;
  }

  static bool emailValidate(String email) {
      email = email.trim();
      final RegExp emailRegex = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
      return emailRegex.hasMatch(email);
  }

  static bool passwordValidate(String password) {
    final RegExp passwordRegex = RegExp(r'^.{8,15}$');
    return passwordRegex.hasMatch(password);
  }
}