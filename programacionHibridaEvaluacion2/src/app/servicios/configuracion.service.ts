import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";

@Injectable({
  providedIn: "root",
})
export class ConfiguracionService {
  // Constante usada para almacenar el nombre de la key de la configuración.
  private readonly KEY_PERMITIR_BORRAR_CITAS_EN_INICIO =
    "permitirBorrarCitasEnInicio";

  constructor() {}

  async permitirBorrarCitasEnInicio(): Promise<boolean> {
    // Retorna el valor de la configuración que indica si se debe permitir borrar citas en el home.
    const result = await Preferences.get({
      key: this.KEY_PERMITIR_BORRAR_CITAS_EN_INICIO,
    });
    return result?.value === "true";
  }

  async setPermitirBorrarCitasEnInicio(newValue: boolean): Promise<void> {
    // Setea el valor de la configuración que indica si se debe permitir borrar citas en el home.
    await Preferences.set({
      key: this.KEY_PERMITIR_BORRAR_CITAS_EN_INICIO,
      value: newValue ? "true" : "false",
    });
  }
}
