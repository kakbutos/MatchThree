const IS_LOGGED = 'isLogged';

export class AuthService {
  static setLogged(): void {
    localStorage.setItem(IS_LOGGED, 'true');
  }
  static isLogged(): boolean {
    return localStorage.getItem(IS_LOGGED) === 'true';
  }
  static logout(): void {
    localStorage.removeItem(IS_LOGGED);
  }
}
