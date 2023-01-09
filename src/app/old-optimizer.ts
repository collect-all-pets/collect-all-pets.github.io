// import { Egg } from "./egg.enum";
// import { UserStats } from "./user-stats";
// import { PetCalculator } from "./pet-calculator";
// import { Recommendation, Upgrade } from "./recommendation";
//
// export class MetallicOptimizer {
//   stats: UserStats
//   calc: PetCalculator
//   recommendations: Recommendation[]
//   combined_recommendations: Recommendation[]
//
//   MetallicCosts = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 7500, 10000]
//
//   CalcLuck: number
//   ExtraHatchesFromGenSpeed: number = 0
//   ExtraHatchesFromMetallicLuck: number = 0
//   StonesPerDay: number = 0
//   MetallicUpgrades: number = 0
//   MetallicLuckCost: number = 0
//   MetallicAchievementLuck: number = 0
//   GenerationSpeed: number = 0
//   SubtractableMetallicLuckCost: number = 0
//   EditableGenerationSpeed: number = 0
//   GenStoneCost: number = 0
//   CalcStoneCost: number = 0
//   DaysForMetallicLuck: number = 0
//
//   constructor(stats: UserStats, calc: PetCalculator) {
//     this.stats = stats
//     this.calc = calc
//     this.CalcLuck = this.stats.calcify_luck_pct/100.0
//     this.recommendations = []
//     this.combined_recommendations = []
//   }
//
//   reset() {
//     this.CalcLuck = this.stats.calcify_luck_pct/100.0
//     this.StonesPerDay = this.calc.stones() / (this.stats.seconds() / 86400)
//     this.MetallicUpgrades = this.stats.metallic_luck_pct * 100000
//     this.MetallicLuckCost = this.metallicLuckCost(this.MetallicUpgrades)
//     this.MetallicAchievementLuck = this.stats.metallic_badge_luck
//     this.GenerationSpeed = this.stats.gen_spd
//
//     this.SubtractableMetallicLuckCost = this.MetallicLuckCost;
//     this.EditableGenerationSpeed = this.stats.gen_spd;
//     this.GenStoneCost = this.genStoneCostFromSpeed(this.GenerationSpeed);
//     this.CalcStoneCost = this.calcStoneCost(this.CalcLuck);
//     this.DaysForMetallicLuck = 0;
//     this.ExtraHatchesFromGenSpeed = 0;
//
//     this.recommendations = []
//     this.combined_recommendations = []
//   }
//
//   compute() {
//     if (this.stats.gen_egg == Egg.Prodigious && this.stats.hatch_egg == Egg.Prodigious) {
//       this.computeAllProdigious()  // todo
//     } else {
//       this.computeOther()
//     }
//     this.combine()
//   }
//
//   combine() {
//     this.combined_recommendations = []
//     for (let i = 0; i < this.recommendations.length; i++) {
//       let r = new Recommendation(this.recommendations[i].upgrade, this.recommendations[i].value, this.recommendations[i].cost)
//       while (i + 1 < this.recommendations.length && this.recommendations[i+1].upgrade == r.upgrade) {
//         r.cost += this.recommendations[i+1].cost
//         i++;
//       }
//       r.value = this.recommendations[i].value
//       this.combined_recommendations.push(r)
//     }
//   }
//
//   computeAllProdigious() {
//     // todo:
//   }
//
//   computeOther() {
//     let amount = 20
//
//     let calc2 = new PetCalculator(this.stats);
//     calc2.hatch(this.stats.gen_egg, 864);
//     let GenChancesPerDay = calc2.new_pets();
//
//     let calc3 = new PetCalculator(this.stats);
//     calc3.hatch(this.stats.hatch_egg, 864);
//     let HatchChancesPerDay = calc3.new_pets();
//
//
//     while (this.recommendations.length < amount) {
//       this.ExtraHatchesFromGenSpeed = this.extraHatchesFromGenSpeed(this.MetallicLuckCost, this.StonesPerDay, GenChancesPerDay)
//       if (this.MetallicLuckCost != 10) {
//         this.ExtraHatchesFromMetallicLuck = (10000000 / (this.MetallicUpgrades * this.MetallicAchievementLuck)) - (10000000 / ((this.MetallicUpgrades + 1) * this.MetallicAchievementLuck))
//       } else {
//         this.recommendations.push(new Recommendation(Upgrade.MetallicLuck, Math.round(this.MetallicUpgrades + 1), this.MetallicLuckCost))
//         this.MetallicUpgrades++
//         this.MetallicLuckCost = this.metallicLuckCost(this.MetallicUpgrades)
//         this.ExtraHatchesFromMetallicLuck = (10000000 / (this.MetallicUpgrades * this.MetallicAchievementLuck)) - (10000000 / ((this.MetallicUpgrades + 1) * this.MetallicAchievementLuck))
//       }
//       if (this.ExtraHatchesFromGenSpeed > this.ExtraHatchesFromMetallicLuck) {
//         let speed = Math.ceil((this.GenerationSpeed + 0.01) * 100) / 100
//         this.recommendations.push(new Recommendation(Upgrade.GenSpeed, speed, this.genStoneCostFromSpeed(speed)))
//         this.GenerationSpeed += 0.01
//       } else if (this.ExtraHatchesFromMetallicLuck > this.ExtraHatchesFromGenSpeed) {
//         this.recommendations.push(new Recommendation(Upgrade.MetallicLuck, this.MetallicUpgrades + 1, this.MetallicLuckCost))
//         this.MetallicUpgrades++
//         this.MetallicLuckCost = this.metallicLuckCost(this.MetallicUpgrades)
//       }
//     }
//   }
//
//   metallicLuckCost(MetallicUpgrades: number) {
//     if (MetallicUpgrades < 9) {
//       return this.MetallicCosts[MetallicUpgrades]
//     }
//     return 10000
//   }
//
//   genStoneCostFromSpeed(speed: number) {
//     if (speed < 2.01 && speed >= 1.00) {
//       return Math.round((speed * 50) + ((speed - 1) * 150))
//     } else if (speed < 3.01 && speed >= 2.00) {
//       if (Math.ceil(speed * 100) % 2 == 0) {
//         return Math.round((speed * 125) + ((speed - 2) * 1125))
//       } else {
//         return Math.round(((speed - 0.01) * 125) + (((speed - 0.01) - 2) * 1125) + 13)
//       }
//     } else if (speed < 4.01 && speed >= 3.00) {
//       return Math.round((speed * 500) + ((speed - 3) * 4000))
//     } else if (speed < 5.01 && speed >= 4.00) {
//       return Math.round((speed * 1500) + ((speed - 4) * 3500))
//     }
//     // todo: unknown
//     console.log('Unable to determine stone cost of gen speed: ' + speed)
//     return -1
//   }
//
//   calcStoneCost(calcLuck: number) {
//     if (calcLuck < 0.5) {
//       return (calcLuck * 5000) + 50
//     } else if (calcLuck <= 1) {
//       return ((calcLuck - 0.5) * 10000) + 2600
//     }
//     // todo: unknown
//     console.log('Unable to determine stone cost of calcification luck: ' + calcLuck)
//     return -1
//   }
//
//   extraHatchesFromGenSpeed(MetallicLuckCost: number, StonesPerDay: number, GenChancesPerDay: number) {
//     this.SubtractableMetallicLuckCost = MetallicLuckCost;
//     this.EditableGenerationSpeed = this.stats.gen_spd;
//     this.GenStoneCost = 0;
//     this.CalcStoneCost = 0;
//     this.DaysForMetallicLuck = 0;
//     this.ExtraHatchesFromGenSpeed = 0;
//
//     this.CalcStoneCost = this.calcStoneCost(this.CalcLuck)
//     while (this.SubtractableMetallicLuckCost >= 0) {
//       this.DaysForMetallicLuck = MetallicLuckCost / StonesPerDay
//       this.ExtraHatchesFromGenSpeed += GenChancesPerDay * this.DaysForMetallicLuck
//       this.GenStoneCost = this.genStoneCostFromSpeed(this.EditableGenerationSpeed)
//       while (Math.round(this.CalcStoneCost) <= Math.round(this.GenStoneCost * 2)) {
//         if (this.CalcLuck == 1.0) {
//           break;
//         }
//         if (Math.round(this.CalcStoneCost) <= Math.round(this.GenStoneCost * 2) && this.SubtractableMetallicLuckCost == MetallicLuckCost) {
//           this.recommendations.push(new Recommendation(Upgrade.CalcificationLuck,
//             Math.round((this.CalcLuck + 0.01) * 100), Math.round(this.CalcStoneCost)))
//           this.CalcLuck += 0.01;
//         } else {
//           break;
//         }
//         this.CalcStoneCost = this.calcStoneCost(this.CalcLuck)
//       }
//       this.SubtractableMetallicLuckCost -= this.GenStoneCost;
//       this.EditableGenerationSpeed += 0.01;
//     }
//     return this.ExtraHatchesFromGenSpeed;
//   }
//
// }
//
//
// /*
//         if (EggGenerated.equals("P") && EggHatched.equals("P")) {
//             System.out.println("Buy these upgrades in this order to best increase your stone gain (assuming your stats don't change)");
//             System.out.println();
//             double GenStoneCost = 0;
//             double CalcStoneCost = 0;
//             while (count < amount) {
//                 if (CalcLuck < 0.5) {
//                     CalcStoneCost = (CalcLuck*5000) + 50;
//                 } else if (CalcLuck <= 1) {
//                     CalcStoneCost = ((CalcLuck-0.5)*10000) + 2600;
//                 }
//                 if (GenerationSpeed < 2.01 && GenerationSpeed >= 1.00) {
//                     GenStoneCost = (GenerationSpeed*50) + ((GenerationSpeed-1)*150);
//                 } else if (GenerationSpeed < 3.01 && GenerationSpeed >= 2.00) {
//                     if (Math.ceil(GenerationSpeed*100) % 2 == 0) {
//                         GenStoneCost = (GenerationSpeed*125) + ((GenerationSpeed-2)*1125);
//                     } else {
//                         GenStoneCost = ((GenerationSpeed-0.01)*125) + (((GenerationSpeed-0.01)-2)*1125) + 13;
//                     }
//                 } else if (GenerationSpeed < 4.01 && GenerationSpeed >= 3.00) {
//                     GenStoneCost = (GenerationSpeed*500) + ((GenerationSpeed-3)*4000);
//                 } else if (GenerationSpeed < 5.01 && GenerationSpeed >= 4.00) {
//                     GenStoneCost = (GenerationSpeed*1500) + ((GenerationSpeed-4)*3500);
//                 }
//                 if (CalcLuck >= 1.0) {
//                     System.out.println("Get generation speed to " + Math.ceil((GenerationSpeed+0.01)*100)/100);
//                     GenerationSpeed += 0.01;
//                     count++;
//                 } else if (Math.round(CalcStoneCost) <= Math.round(GenStoneCost*2)) {
//                     System.out.println("Get calcify luck to " + Math.round((CalcLuck+0.01)*100) + "%");
//                     CalcLuck += 0.01;
//                     count++;
//                 } else {
//                     System.out.println("Get generation speed to " + Math.ceil((GenerationSpeed+0.01)*100)/100);
//                     GenerationSpeed += 0.01;
//                     count++;
//                 }
//             }
//         } else {
//             System.out.println("Buy these upgrades in this order to best increase your metallic chances (assuming your stats don't change)");
//             System.out.println();
//             while (count < amount) {
//                 ExtraHatchesFromGenSpeed = extraHatchesFromGenSpeed(MetallicLuckCost, StonesPerDay, GenChancesPerDay);
//                 if (MetallicLuckCost != 10) {
//                     ExtraHatchesFromMetallicLuck = (10000000/(MetallicUpgrades*MetallicAchievementLuck))-(10000000/((MetallicUpgrades+1)*MetallicAchievementLuck));
//                 } else {
//                     System.out.println("Get metallic luck to " + Math.round(MetallicUpgrades+1) + " upgrades");
//                     MetallicUpgrades++;
//                     MetallicLuckCost = 25;
//                     ExtraHatchesFromMetallicLuck = (10000000/(MetallicUpgrades*MetallicAchievementLuck))-(10000000/((MetallicUpgrades+1)*MetallicAchievementLuck));
//                     count++;
//                 }
//                 if (ExtraHatchesFromGenSpeed > ExtraHatchesFromMetallicLuck) {
//                     System.out.println("Get generation speed to " + Math.ceil((GenerationSpeed+0.01)*100)/100);
//                     GenerationSpeed += 0.01;
//                 } else if (ExtraHatchesFromMetallicLuck > ExtraHatchesFromGenSpeed) {
//                     System.out.println("Get metallic luck to " + Math.round(MetallicUpgrades+1) + " upgrades");
//                     MetallicUpgrades++;
//                     MetallicLuckCost = nextMetallicLuckCost(MetallicLuckCost);
//                 }
//                 count++;
//             }
//         }
//     }
//
//     public static int nextMetallicLuckCost(int MetallicLuckCost) {
//         return switch (MetallicLuckCost) {
//             case 10 -> 25;
//             case 25 -> 50;
//             case 100 -> 250;
//             case 250 -> 500;
//             case 500 -> 1000;
//             case 1000 -> 2500;
//             case 2500 -> 5000;
//             case 5000 -> 7500;
//             default -> 10000;
//         };
//     }
//
//     public static double extraHatchesFromGenSpeed(double MetallicLuckCost, double StonesPerDay, double GenChancesPerDay) {
//         double SubtractableMetallicLuckCost = MetallicLuckCost;
//         double EditableGenerationSpeed = GenerationSpeed;
//         double GenStoneCost = 0;
//         double CalcStoneCost = 0;
//         double DaysForMetallicLuck = 0;
//         double ExtraHatchesFromGenSpeed = 0;
//         if (CalcLuck < 0.5) {
//             CalcStoneCost = (CalcLuck*5000) + 50;
//         } else if (CalcLuck <= 1) {
//             CalcStoneCost = ((CalcLuck-0.5)*10000) + 2600;
//         }
//         while (SubtractableMetallicLuckCost >= 0) {
//             DaysForMetallicLuck = MetallicLuckCost/StonesPerDay;
//             ExtraHatchesFromGenSpeed += GenChancesPerDay*DaysForMetallicLuck;
//             if (EditableGenerationSpeed < 2.01 && EditableGenerationSpeed >= 1.00) {
//                 GenStoneCost = (EditableGenerationSpeed*50) + ((EditableGenerationSpeed-1)*150);
//             } else if (EditableGenerationSpeed < 3.01 && EditableGenerationSpeed >= 2.00) {
//                 if (Math.ceil(EditableGenerationSpeed*100) % 2 == 0) {
//                     GenStoneCost = (EditableGenerationSpeed*125) + ((EditableGenerationSpeed-2)*1125);
//                 } else {
//                     GenStoneCost = ((EditableGenerationSpeed-0.01)*125) + (((EditableGenerationSpeed-0.01)-2)*1125) + 13;
//                 }
//             } else if (EditableGenerationSpeed < 4.01 && EditableGenerationSpeed >= 3.00) {
//                 GenStoneCost = (EditableGenerationSpeed*500) + ((EditableGenerationSpeed-3)*4000);
//             } else if (EditableGenerationSpeed < 5.01 && EditableGenerationSpeed >= 4.00) {
//                 GenStoneCost = (EditableGenerationSpeed*1500) + ((EditableGenerationSpeed-4)*3500);
//             }
//             while (Math.round(CalcStoneCost) <= Math.round(GenStoneCost*2)) {
//                 if (CalcLuck == 1.0) {
//                     break;
//                 }
//                 if (Math.round(CalcStoneCost) <= Math.round(GenStoneCost*2) && SubtractableMetallicLuckCost == MetallicLuckCost) {
//                     System.out.println("Get calcify luck to " + Math.round((CalcLuck+0.01)*100) + "%");
//                     CalcLuck += 0.01;
//                     count++;
//                 } else {
//                     break;
//                 }
//                 if (CalcLuck < 0.5) {
//                     CalcStoneCost = (CalcLuck*5000) + 50;
//                 } else if (CalcLuck <= 1) {
//                     CalcStoneCost = ((CalcLuck-0.5)*10000) + 2600;
//                 }
//             }
//             SubtractableMetallicLuckCost -= GenStoneCost;
//             EditableGenerationSpeed += 0.01;
//         }
//         return ExtraHatchesFromGenSpeed;
//     }
// */
