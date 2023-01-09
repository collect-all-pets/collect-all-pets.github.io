import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from "./calculator/calculator.component";
import { GoldCalculatorComponent } from "./gold-calculator/gold-calculator.component";
import { RebirthPageComponent } from "./rebirth-page/rebirth-page.component";
import { DamageCalculatorComponent } from "./damage-calculator/damage-calculator.component";
import { MetallicOddsComponent } from "./metallic-odds/metallic-odds.component";
import { ShinyOddsComponent } from "./shiny-odds/shiny-odds.component";
import { HomeComponent } from "./home/home.component";
import { ExoticLuckCalculatorComponent } from "./exotic-luck-calculator/exotic-luck-calculator.component";
import { UpgradeTablesComponent } from "./upgrade-tables/upgrade-tables.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
    pathMatch: 'full',
  },
  {
    path: 'gold',
    component: GoldCalculatorComponent,
    pathMatch: 'full',
  },
  {
    path: 'rebirth',
    component: RebirthPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'damage',
    component: DamageCalculatorComponent,
    pathMatch: 'full',
  },
  {
    path: 'metallic-odds',
    component: MetallicOddsComponent,
    pathMatch: 'full',
  },
  {
    path: 'shiny-odds',
    component: ShinyOddsComponent,
    pathMatch: 'full',
  },
  {
    path: 'exotic-luck',
    component: ExoticLuckCalculatorComponent,
    pathMatch: 'full',
  },
  {
    path: 'upgrade-cost',
    component: UpgradeTablesComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
