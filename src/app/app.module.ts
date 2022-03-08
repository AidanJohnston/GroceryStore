// ENVIROMENT
import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ANGULAR MATERIAL
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// FIREBASE
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// SERVICES
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

// GUARDS
import { VerifyEmailGuard } from './guards/verify-email.guard';
import { AuthLoggedinGuard } from './guards/auth-loggedin.guard';
import { AuthNotloggedinGuard } from './guards/auth-notloggedin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [VerifyEmailGuard]},
  { path: 'search', component: SearchComponent, canActivate: [VerifyEmailGuard] },
  { path: 'about', component: AboutComponent, canActivate: [VerifyEmailGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthLoggedinGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [AuthLoggedinGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthNotloggedinGuard]},
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [VerifyEmailGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SignupComponent,
    LoginComponent,
    SearchComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

