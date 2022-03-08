import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    public auth : AuthService,
    public router : Router) { }

  text = "";
  color = "warn";
  value = 0;

  isLoading = false;
  isError = false;

  private passwordStrengths = [
    {
      "text": "Very Weak",
      "color": "warn",
      "value": 10
    },
    {
      "text": "Weak",
      "color": "warn",
      "value" : 25
    },
    {
      "text": "Weak",
      "color": "warn",
      "value" : 50
    },
    {
      "text": "Medium",
      "color": "accent",
      "value" : 75
    },
    {
      "text": "Strong",
      "color": "primary",
      "value" : 100
    }
  ]

  onPasswordChange(password: string) {
    this.checkPasswordStrength(password).then(num => {
      this.text = this.passwordStrengths[num]['text'];
      this.color = this.passwordStrengths[num]['color'];
      this.value = this.passwordStrengths[num]['value'];
    });
  }

  public async checkPasswordStrength(password : string) : Promise<number> {


    let hasLower = new RegExp('(?=.*[a-z])');
    let hasUpper = new RegExp('(?=.*[A-Z])');
    let hasSpecial = new RegExp('(?=.*[^A-Za-z0-9])');
    let moreThanEight = new RegExp('(?=.{8,})');
    let lessThanSix = new RegExp('(?=.{,6})');

    var strength : number = Number(hasLower.test(password)) + 
      Number(hasUpper.test(password)) + 
      Number(hasSpecial.test(password)) + 
      Number(moreThanEight.test(password));

    if(lessThanSix.test(password)){
      strength = 1;
    }
    return strength;
  }

  onSubmit(email: string, password: string) {
    this.isLoading = true;
    this.auth.createUserWithPassword(email, password).then(res => {
      if(res) {
        this.isLoading = false;
        this.router.navigate(['verify-email']);
      }
      else {
        this.isLoading = false;
        this.isError = true;
      }
    });
    
  }
}
