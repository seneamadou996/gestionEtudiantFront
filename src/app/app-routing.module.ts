import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageLoginComponent} from "./pages/page-login/page-login.component";
import {PageInscrireComponent} from "./pages/page-inscrire/page-inscrire.component";
import {PageDashboardComponent} from "./pages/page-dashboard/page-dashboard.component";
import {PageAccueilComponent} from "./pages/page-accueil/page-accueil.component";
import {PageEtudiantComponent} from "./pages/etudiant/page-etudiant/page-etudiant.component";
import {NouvelEtudiantComponent} from "./pages/etudiant/nouvel-etudiant/nouvel-etudiant.component";
import {PageUserComponent} from "./pages/admin/page-user/page-user.component";
import {NewUserComponent} from "./pages/admin/new-user/new-user.component";
import {PageProfilComponent} from "./pages/profil/page-profil/page-profil.component";
import {ChangerMotDePasseComponent} from "./pages/profil/changer-mot-de-passe/changer-mot-de-passe.component";
import {ApplicationGuardService} from "./services/guard/application-guard.service";
import {EditUserComponent} from "./pages/admin/edit-user/edit-user.component";
import {EditEtudiantComponent} from "./pages/etudiant/edit-etudiant/edit-etudiant.component";

let routes: Routes;
routes = [
  {
    path: "login",
    component: PageLoginComponent
  },
  {
    path: "inscrire",
    component: PageInscrireComponent
  },
  {
    path: "",
    component: PageDashboardComponent,
    canActivate: [ApplicationGuardService],
    children: [
      {
        path: "accueil",
        component: PageAccueilComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "etudiant",
        component: PageEtudiantComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "nouvel-etudiant",
        component: NouvelEtudiantComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "edit-etudiant/:id",
        component: EditEtudiantComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: "utilisateur",
        component: PageUserComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "nouvel-utilisateur",
        component: NewUserComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "edit-utilisateur/:id",
        component: EditUserComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "profil",
        component: PageProfilComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "changer-mot-de-passe",
        component: ChangerMotDePasseComponent,
        canActivate: [ApplicationGuardService],
      },
      {
        path: "",
        redirectTo: "/accueil",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
