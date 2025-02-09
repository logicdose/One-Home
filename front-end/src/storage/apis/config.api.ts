import { ConfigState } from "../../states/config-state";

export default abstract class ConfigApi {
  static saveConfig(config: ConfigState) {
    localStorage.setItem("config", JSON.stringify(config));
  }

  static loadConfig(): ConfigState | null {
    const config = localStorage.getItem("config");
    if (!config) return null;
    return JSON.parse(config);
  }
}
