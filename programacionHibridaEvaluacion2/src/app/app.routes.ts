import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () =>
      import("./paginas/home/home.page").then((m) => m.HomePage),
  },
  {
    path: "gestion",
    loadComponent: () =>
      import("./paginas/gestion/gestion.page").then((m) => m.GestionPage),
  },
  {
    path: "configuracion",
    loadComponent: () =>
      import("./paginas/configuracion/configuracion.page").then(
        (m) => m.ConfiguracionPage
      ),
  },
];
