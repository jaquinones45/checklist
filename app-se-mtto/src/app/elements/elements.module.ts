import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//--Cards

//--Tables
import { TablaModulePlantComponent } from './module-plant/components/tabla-module-plant/tabla-module-plant.component'
import { TablaModuleComponentComponent } from './module-component/components/tabla-module-component/tabla-module-component.component'
import { TablaModuleEquipmentComponent } from './module-equipment/components/tabla-module-equipment/tabla-module-equipment.component'
//--Forms
import { FormModulePlantComponent } from './module-plant/components/form-module-plant/form-module-plant.component';
import { FormModuleComponentComponent } from './module-component/components/form-module-component/form-module-component.component';
import { FormModuleEquipmentComponent } from './module-equipment/components/form-module-equipment/form-module-equipment.component';
//--Module
import { ModulePlantComponent } from './module-plant/module-plant.component';
import { ModuleComponentComponent } from './module-component/module-component.component';
import { ModuleEquipmentComponent } from './module-equipment/module-equipment.component';
//--Others
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
// import { NgApexchartsModule } from 'ng-apexcharts';

//--SYNCFUSION
import { MultiSelectModule, DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { DatePickerModule, TimePickerModule, DateTimePickerModule, DateRangePickerModule  } from '@syncfusion/ej2-angular-calendars';

//--CONFIRM

//--MODAL

//--BARRA

@NgModule({
  declarations: [ 
    // Tables
    TablaModulePlantComponent,
    TablaModuleComponentComponent,
    TablaModuleEquipmentComponent,
    // Forms
    FormModulePlantComponent,
    FormModuleComponentComponent,
    FormModuleEquipmentComponent,
    // Modules
    ModulePlantComponent,
    ModuleComponentComponent,
    ModuleEquipmentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DatePickerModule,
    TimePickerModule,
    DateTimePickerModule,
    DateRangePickerModule,
    //---Others
    MultiSelectModule,
    DropDownListModule,
    TabModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    //--Cards

    // Tables
    TablaModulePlantComponent,
    TablaModuleComponentComponent,
    TablaModuleEquipmentComponent,
    // Forms
    FormModulePlantComponent,
    FormModuleComponentComponent,
    FormModuleEquipmentComponent,
    // Modules
    ModulePlantComponent,
    ModuleComponentComponent,
    ModuleEquipmentComponent,
    //--Others
    NgbDropdownModule,
    NgbDatepickerModule,
    FeahterIconModule,
    //--SYNCFUSION
    MultiSelectModule,
    DropDownListModule,
    TabModule,
    DatePickerModule,
    TimePickerModule,
    DateTimePickerModule,
    DateRangePickerModule,
  ]
})
export class ElementsModule {}
