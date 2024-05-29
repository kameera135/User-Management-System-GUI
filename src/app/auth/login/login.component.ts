import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';
import { auth } from 'src/app/shared/models/Cams-new/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  visible = true;
  credentials!: auth;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userInfo: UserProfileService
  ) { }


  ngOnInit(): void {
    //read saved logins
    let savedUsername: any = this.getCookie("username");
    let savedLogin: boolean = true;
    if (savedUsername == undefined || savedUsername == null) {
      savedUsername = '';
      savedLogin = false;
    }

    this.loginForm = this.fb.group({
      username: [savedUsername, Validators.required],
      password: ['', Validators.required],
      remember_login: [savedLogin]
    });
  }

  saveUserNameAndPassword(username: string, password: string): void {
    this.setCookie("username", username, 90);
  }

  removeUserNameAndPassword(username: string): void {
    const currentUsername = this.getCookie("username");
    if (currentUsername == username) {
      this.setCookie("username", '', 0);
    }
  }

  setCookie(cookieName: string, cookieValue: string, expiryDays: number) {
    var expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiryDays);

    var cookieValueEncoded = encodeURIComponent(cookieValue);
    var cookieString = cookieName + "=" + cookieValueEncoded + "; expires=" + expiryDate.toUTCString() + "; path=/";

    document.cookie = cookieString;
  }

  getCookie(cookieName: string) {
    var cookieValue = undefined;
    var cookieArray = document.cookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookiePair = cookieArray[i].split("=");
      var name = cookiePair[0].trim();

      if (name === cookieName) {
        cookieValue = decodeURIComponent(cookiePair[1]);
        break;
      }
    }

    return cookieValue;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    this.visible = !this.visible;
  }

  login() {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    this.credentials = this.loginForm.value;

    if (this.credentials.username == '' && this.credentials.password == '') {
      Toast.fire({
        icon: "error",
        title: "Please enter a username and password."
      });
    }
    else if (this.credentials.username == '') {
      Toast.fire({
        icon: "error",
        title: "Please enter a username."
      });
    }
    else if (this.credentials.password == '') {
      Toast.fire({
        icon: "error",
        title: "Please enter a password."
      });
    }

    if (this.loginForm.valid) {
      if (this.loginForm.value.remember_login) this.saveUserNameAndPassword(this.credentials.username, this.credentials.password);
      else this.removeUserNameAndPassword(this.credentials.username);

      this.userInfo.login(this.credentials).subscribe({
        next: (response: any) => {
          const jwtToken = response.token;
          const sessionToken = response.session_id;

          // Store the JWT in local storage or a secure cookie
          localStorage.setItem('user', jwtToken);
          localStorage.setItem('sessionId', sessionToken);

          // Check if there's a stored URL
          const lastVisitedPage = localStorage.getItem('lastVisitedPage');
          if (lastVisitedPage) {
            // Redirect to the last visited page
            this.router.navigateByUrl(lastVisitedPage);
            // Remove the stored URL
            localStorage.removeItem('lastVisitedPage');
          } else {
            // If there's no stored URL, redirect to the default dashboard page
            this.router.navigate(['dashboard']);
          }
          Toast.fire({
            icon: "success",
            title: "Authentication has been successful."
          });
        },
        error: (error: any) => {
          // Handle authentication error
          Toast.fire({
            icon: "error",
            title: "Username or password does not matched."
          });
          console.error('Authentication failed:', error);
        }
      });
    }
  }

  validateControl(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) : false;
  }
}
