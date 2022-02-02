import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";

import { LayoutModule } from "./views/layout/layout.module";
import { AuthGuard } from "./core/guard/auth.guard";

import { AppComponent } from "./app.component";
import { ErrorPageComponent } from "./views/pages/error-page/error-page.component";

import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
//----
import { HttpClientModule } from "@angular/common/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FuncionesGenerales } from "./core/funciones-generales/Funciones-generales";
import { DecimalPipe } from "@angular/common";

import { MultiSelectModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerModule, TimePickerModule, DateTimePickerModule, DateRangePickerModule  } from '@syncfusion/ej2-angular-calendars';

import { ElementsModule } from './elements/elements.module'

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    DatePickerModule,
    TimePickerModule,
    DateTimePickerModule,
    DateRangePickerModule,
    //---Others
    MultiSelectModule,
    DropDownListModule,
    TabModule,
    ElementsModule,
  ],
  exports: [
    DatePickerModule,
    TimePickerModule,
    DateTimePickerModule,
    DateRangePickerModule,
    //---Others
    MultiSelectModule,
    DropDownListModule,
    TabModule,
    ElementsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import("highlight.js/lib/core"),
        languages: {
          xml: () => import("highlight.js/lib/languages/xml"),
          typescript: () => import("highlight.js/lib/languages/typescript"),
          scss: () => import("highlight.js/lib/languages/scss"),
        },
      },
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    FuncionesGenerales,
    DecimalPipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
