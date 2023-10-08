import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errorMessage: string = ''
  isLoading: boolean = false
  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('[A-Z][A-Za-z0-9]{7,15}')]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern('[A-Z][A-Za-z0-9]{7,15}')]),
    phone: new FormControl(null, [Validators.pattern('01[0125][0-9]{8}')]),
  })
  constructor(private _AuthService: AuthService) { }
  sendData(data: FormGroup) {
    this.isLoading = true
    this._AuthService.register(data.value).subscribe({
      next: (res: any) => {
        this.errorMessage= ''
        console.log(res)
      },
      error: (err) => {
        this.isLoading = false

        console.log(err)
        if (err.error.errors) {
          this.errorMessage = err.error.errors.msg
        } else if (err.error.message) {
          this.errorMessage = err.error.message
          console.log(this.errorMessage)
        }
      },
      complete: () => {
        this.isLoading = false;
        console.log("Done")
      }
    })
  }
}
