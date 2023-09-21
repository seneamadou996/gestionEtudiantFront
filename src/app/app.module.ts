import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscrireComponent } from './pages/page-inscrire/page-inscrire.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { PageEtudiantComponent } from './pages/etudiant/page-etudiant/page-etudiant.component';
import { DetailEtudiantComponent } from './components/detail-etudiant/detail-etudiant.component';
import { NouvelEtudiantComponent } from './pages/etudiant/nouvel-etudiant/nouvel-etudiant.component';
import { PageUserComponent } from './pages/admin/page-user/page-user.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { NewUserComponent } from './pages/admin/new-user/new-user.component';
import { PageProfilComponent } from './pages/profil/page-profil/page-profil.component';
import { ChangerMotDePasseComponent } from './pages/profil/changer-mot-de-passe/changer-mot-de-passe.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {InterceptorService} from "./services/interceptor/interceptor.service";
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component';
import {JwtHelperService} from "@auth0/angular-jwt";
import { LoaderComponent } from './components/loader/loader.component';
import { EditEtudiantComponent } from './pages/etudiant/edit-etudiant/edit-etudiant.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageInscrireComponent,
    PageDashboardComponent,
    PageAccueilComponent,
    PageEtudiantComponent,
    DetailEtudiantComponent,
    NouvelEtudiantComponent,
    PageUserComponent,
    DetailUserComponent,
    NewUserComponent,
    PageProfilComponent,
    ChangerMotDePasseComponent,
    EditUserComponent,
    LoaderComponent,
    EditEtudiantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
