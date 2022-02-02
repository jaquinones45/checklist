import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public REST_API_SERVER = environment.url + 'auth/login';
  returnUrl: any;

  loginForm: FormGroup;
  submitted = false;

  siteKey: string;
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  message: { appearance: string; content: any; shake: boolean; showIcon: boolean; type: string; };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public http: HttpClient
  ) {
    this.siteKey = '6LdgIDkbAAAAAMNLGn5AaoHe24V_EGV8tGVznPuF';
  }

  ngOnInit(): void {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    this.loginForm = this.formBuilder.group({
      email: ['user'],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captcha:[]
    });

    this.loginForm.enable();
  }
  // convenience getter for easy access to form fields
  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
  /*   if (window.location.hostname == 'localhost') this.REST_API_SERVER = 'https://localhost/apicenit/auth' ;
    if (window.location.port == '4200' || window.location.port == '4300') this.REST_API_SERVER = 'https://localhost:3743/auth'; */
   
      const credentials = this.loginForm.value;
      if(!credentials.email.includes('@'))credentials.email+='@ocensa.com.co';

      this.http
        .post(this.REST_API_SERVER, credentials)
        .pipe(retry(3), catchError(this.handleError))
        .subscribe((response:any) => {
          
          if (!response.success) {

                // Re-enable the form
            this.loginForm.enable();
  
            // Show the error message
            this.message = {
                appearance: 'outline',
                content   : response.error,
                shake     : true,
                showIcon  : false,
                type      : 'warning'
            };
          } else {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('role', JSON.stringify(response.data.role));
            localStorage.setItem('users_id', response.data.user.id);
            localStorage.setItem('client_id', response.data.client_id);
            localStorage.setItem('isAdmin', JSON.stringify(response.data.is_admin));
            localStorage.setItem('isLoggedin', 'true');
            
            this.redirectTo(this.returnUrl);
          }
        }, (response) => {
          window.location.reload();
          // Re-enable the form
          this.loginForm.enable();

          // Show the error message
          this.message = {
              appearance: 'outline',
              content   : 'ERROR',
              shake     : true,
              showIcon  : false,
              type      : 'error'
          };
        });
  }
  public handleError(error: HttpErrorResponse): any {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  redirectTo(uri: string): void {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  changeVis(){
    
                  this.f.password.type === 'password'
                    ? (this.f.password.type = 'text')
                    : (this.f.password.type = 'password')
                
  }
}
