import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./layouts/layout.component";
import { AuthGuard } from "./auth/auth.guard";

// Auth

const use_login = false;

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: use_login ? [AuthGuard] : [],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];

// const routes: Routes = [
//   {
//     path: " ",
//     children: [
//       {
//         path: "",
//         //component: LayoutComponent,
//         loadChildren: () =>
//           import("./auth/auth.module").then((m) => m.AuthModule),
//       },
//       {
//         path: "",
//         component: LayoutComponent,
//         loadChildren: () =>
//           import("./pages/pages.module").then((m) => m.PagesModule),
//         //canActivate: [AuthGuard], // Protect the dashboard with AuthGuard
//       },
//     ],
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
