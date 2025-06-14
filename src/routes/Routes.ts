export class Url {
  static readonly HomePage: string = "/home";
  static readonly Login: string = "/";
  static readonly Dashboard: string = "/dashboard";
  static readonly UserProfile: string = "/user/:id";
  static readonly ChangePassword: string = "change-password";
  static readonly PendingBet: string = "/bet/pending";
  static readonly VoidBet: string = "/bet/void";
  static readonly RefundBet: string = "/bet/refund";
  static readonly SettledBet: string = "/bet/settled-bet";
  static readonly UndeclaredResult: string = "/result/undeclared";
  static readonly ReviewResult: string = "/result/review";
  static readonly DeclaredResult: string = "/result/declared";
  static readonly ReviewBet: string = "/result/review";
  static readonly Settings: string = "/settings";
  static readonly Account: string = "/settings/account";
  static readonly Preferences: string = "/settings/preferences";
  static readonly NotFound: string = "*";
}