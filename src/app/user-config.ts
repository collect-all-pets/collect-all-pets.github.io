export class UserConfig {
  auto_save: boolean = false
  enable_farzz: boolean = false
  enable_theb1rdm4n: boolean = true
  show_breakdown: boolean = true
  met_chart_hours: number = 24
  met_chart_days: number = 7
  met_chart_use_days: boolean = false

  assign(cfg: UserConfig) {
    if (cfg == null) {
      return
    }
    Object.assign(this, cfg)
  }
  clone(): UserConfig {
    return Object.assign(new UserConfig(), this)
  }
}
