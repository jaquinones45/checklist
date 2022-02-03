import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { BaseComponent } from "./views/layout/base/base.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

const routes: Routes = [
  
  {
    path: "auth",
    loadChildren: () =>
      import("./views/pages/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "routine-mtto",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/routine-mtto/routine-mtto.module").then(
            (m) => m.RoutineMttoModule
          ),
      },
      {
        path: "type-system",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/type-system/type-system.module").then(
            (m) => m.TypeSystemModule
          ),
      },
      {
        path: "type-system/:id/revision",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/type-system-revision/type-system-revision.module").then(
            (m) => m.TypeSystemRevisionModule
          ),
      },
      {
        path: "mtto-corrective",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/mtto-corrective/mtto-corrective.module").then(
            (m) => m.MttoCorrectiveModule
          ),
      },
      {
        path: "fault-log",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/fault-log/fault-log.module").then(
            (m) => m.FaultLogModule
          ),
      },
      {
        path: "equipment-inventory",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/equipment-inventory/equipment-inventory.module").then(
            (m) => m.EquipmentInventoryModule
          ),
      },
      {
        path: "equipment-failures",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/equipment-failures/equipment-failures.module").then(
            (m) => m.EquipmentFailuresModule
          ),
      },
      {
        path: "kpi",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/kpi/kpi.module").then(
            (m) => m.KpiModule
          ),
      },
      {
        path: "files",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/files/files.module").then(
            (m) => m.FilesModule
          ),
      },
      {
        path: "setting",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/setting/setting.module").then(
            (m) => m.SettingModule
          ),
      },
      {
        path: "form",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/form/form.module").then(
            (m) => m.FormModule
          ),
      },
      {
        path: "form-preview",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/form-preview/form-preview.module").then(
            (m) => m.FormPreviewModule
          ),
      },
      {
        path: "form-preview/:id",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/form-preview/form-preview.module").then(
            (m) => m.FormPreviewModule
          ),
      },
      {
        path: "client",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/client/client.module").then(
            (m) => m.ClientModule
          ),
      },
      {
        path: "client/:id/config",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/client-config/client-config.module").then(
            (m) => m.ClientConfigModule
          ),
      },
      {
        path: "country",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/country/country.module").then(
            (m) => m.CountryModule
          ),
      },
      {
        path: "type-component",
        runGuardsAndResolvers: "always",
        loadChildren: () =>
          import("./views/pages/type-component/type-component.module").then(
            (m) => m.TypeComponentModule
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      
    ],
  },

  {
    path: "error",
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: "Page Not Found",
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },

  {
    path: "error/:type",
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
  /*   { path: '**', redirectTo: 'migracion/oleoducto', pathMatch: 'full' },
    { path: '', redirectTo: 'migracion/oleoducto', pathMatch: 'full' } */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top",
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
