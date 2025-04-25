import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IonButton, IonIcon, IonItem } from "@ionic/angular/standalone";
import { CitasService } from "src/app/servicios/citas.service";

@Component({
  selector: "app-lista-citas-item",
  templateUrl: "./lista-citas-item.component.html",
  styleUrls: ["./lista-citas-item.component.scss"],
  standalone: true,
  imports: [IonItem, IonButton, IonIcon],
})
export class ListaCitasItemComponent {
  
  @Output() onCitaEliminadaEvent = new EventEmitter();

  @Input() id: number = -1;
  @Input() frase: string = "";
  @Input() autor: string = "";

  constructor(private _citasService: CitasService) {}

  async deleteCita(): Promise<void> {
    // Llama al servicio para que elimina la cita actual.
    await this._citasService.deleteCita(this.id);
   // se anuncia a la clase padre que se elimino.
    this.onCitaEliminadaEvent.emit();
  }
}
