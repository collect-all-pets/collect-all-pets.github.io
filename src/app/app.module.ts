import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalculatorComponent } from './calculator/calculator.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatCardModule } from "@angular/material/card";
import { ShortNumberPipe, ShortPipe, ShortPipe2, ShortSuffixPipe } from "./short.pipe";
import { MatChipsModule } from "@angular/material/chips";
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ResultComponent } from './result/result.component';
import { HelpButtonComponent } from './help-button/help-button.component';
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MultiResultComponent } from './multi-result/multi-result.component';
import { AppRoutingModule } from "./app-routing.module";
import { GoldCalculatorComponent } from './gold-calculator/gold-calculator.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavbarComponent } from './navbar/navbar.component';
import { IconResultComponent } from './icon-result/icon-result.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RebirthComponent } from './rebirth/rebirth.component';
import { ResultsInfoComponent } from './results-info/results-info.component';
import { NextUpgradesComponent } from './next-upgrades/next-upgrades.component';
import { WhatIfsComponent } from './what-ifs/what-ifs.component';
import { CustomCalculationsComponent } from './custom-calculations/custom-calculations.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { DurationComponent } from './duration/duration.component';
import { FarzzRecommendsComponent } from './farzz-recommends/farzz-recommends.component';
import { Theb1rdm4nRecommendsComponent } from './theb1rdm4n-recommends/theb1rdm4n-recommends.component';
import { RebirthPageComponent } from './rebirth-page/rebirth-page.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PetDamageComponent } from './pet-damage/pet-damage.component';
import { DamageCalculatorComponent } from './damage-calculator/damage-calculator.component';
import { EggBreakdownComponent } from './egg-breakdown/egg-breakdown.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { EggLuckComponent } from './egg-luck/egg-luck.component';
import { ShinyLuckComponent } from './shiny-luck/shiny-luck.component';
import { MetallicLuckComponent } from './metallic-luck/metallic-luck.component';
import { GenerationComponent } from './generation/generation.component';
import { AutoHatchComponent } from './auto-hatch/auto-hatch.component';
import { MetallicOptimizersComponent } from './metallic-optimizers/metallic-optimizers.component';
import { MetallicOddsComponent } from './metallic-odds/metallic-odds.component';
import { ShinyOddsComponent } from './shiny-odds/shiny-odds.component';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { RebirthResultsComponent } from './rebirth-results/rebirth-results.component';
import { ExoticLuckCalculatorComponent } from './exotic-luck-calculator/exotic-luck-calculator.component';
import { ExoticLuckComponent } from './exotic-luck/exotic-luck.component';
import { MetallicChancesComponent } from './metallic-results/metallic-chances.component';
import { SaveButtonsComponent } from './save-buttons/save-buttons.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { UpgradeTablesComponent } from './upgrade-tables/upgrade-tables.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { XLResultComponent } from './xl-result/xlresult.component';
import { TitaniumCountComponent } from './titanium-count/titanium-count.component';
import { MetallicChartsComponent } from './metallic-charts/metallic-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ShortPipe,
    ShortPipe2,
    ShortNumberPipe,
    ShortSuffixPipe,
    MessageDialogComponent,
    ResultComponent,
    HelpButtonComponent,
    MultiResultComponent,
    GoldCalculatorComponent,
    NavbarComponent,
    IconResultComponent,
    FormFieldComponent,
    CheckboxComponent,
    RebirthComponent,
    ResultsInfoComponent,
    NextUpgradesComponent,
    WhatIfsComponent,
    CustomCalculationsComponent,
    UserStatsComponent,
    DurationComponent,
    FarzzRecommendsComponent,
    Theb1rdm4nRecommendsComponent,
    RebirthPageComponent,
    PetDamageComponent,
    DamageCalculatorComponent,
    EggBreakdownComponent,
    EggLuckComponent,
    ShinyLuckComponent,
    MetallicLuckComponent,
    GenerationComponent,
    AutoHatchComponent,
    MetallicOptimizersComponent,
    MetallicOddsComponent,
    ShinyOddsComponent,
    HomeComponent,
    RebirthResultsComponent,
    ExoticLuckCalculatorComponent,
    ExoticLuckComponent,
    MetallicChancesComponent,
    SaveButtonsComponent,
    UpgradeTablesComponent,
    XLResultComponent,
    TitaniumCountComponent,
    MetallicChartsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatTabsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
