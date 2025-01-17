import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
    console.log('Token saved:', token); // Debugging: Log when token is saved
  }

  static saveUser(user: any): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
      console.log('User saved:', user); // Debugging: Log when user is saved
    }
  }

  static getUserId(): string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.id;
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(USER) as string);
    }
    return null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return "";
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "ADMIN";
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == "CUSTOMER";
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
