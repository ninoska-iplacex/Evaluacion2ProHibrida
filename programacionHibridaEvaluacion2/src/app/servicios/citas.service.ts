import { Injectable } from "@angular/core";
import { Cita } from "../modelo/cita";
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { Capacitor } from "@capacitor/core";

@Injectable({
  providedIn: "root",
})
export class CitasService {
  inicializado: boolean = false;
  private sqliteConnection: SQLiteConnection = new SQLiteConnection(
    CapacitorSQLite
  );
  private db!: SQLiteDBConnection;
  private platform: string = "";
  private DB_NAME: string = "lista_citas";
  private DB_ENCRYPT: boolean = false;
  private DB_MODE: string = "no-encryption";
  private DB_VERSION: number = 1;
  private DB_READ_ONLY: boolean = false;
  private DB_SQL_TABLES: string = `
    CREATE TABLE IF NOT EXISTS cita (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      frase TEXT NOT NULL,
      autor TEXT NOT NULL
    );
  `;

  constructor() {}

  private async _initPluginWeb(): Promise<void> {
    await customElements.whenDefined("jeep-sqlite");
    const jeepSqliteEl = document.querySelector("jeep-sqlite");
    if (jeepSqliteEl !== null) {
      await this.sqliteConnection.initWebStore();
    }
  }

  async initPlugin() {
    if (this.inicializado) return;
    this.platform = Capacitor.getPlatform();
    if (this.platform === "web") {
      await this._initPluginWeb();
    }
    await this._openConnection();
    await this._initDatabase();
    this.inicializado = true;
  }

  private async _openConnection() {
    const ret = await this.sqliteConnection.checkConnectionsConsistency();
    const isConn = (
      await this.sqliteConnection.isConnection(this.DB_NAME, this.DB_READ_ONLY)
    ).result;
    if (ret.result && isConn) {
      this.db = await this.sqliteConnection.retrieveConnection(
        this.DB_NAME,
        this.DB_READ_ONLY
      );
    } else {
      this.db = await this.sqliteConnection.createConnection(
        this.DB_NAME,
        this.DB_ENCRYPT,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }
    await this.db.open();
  }

  async _initDatabase(): Promise<void> {
    // Función que inicializa la base de datos en caso de que no se haya inicializado aún.
    // La siguiente consulta es para validar si la tabla cita existe o no.
    const sqlQuery =
      "SELECT name FROM sqlite_master WHERE type='table' AND name='cita';";
    const result = await this.db.query(sqlQuery);
    // Si existe entonces que haga retorno anticipado y no haga nada.
    if (result && Array.isArray(result.values) && result.values.length > 0)
      return;
    // Si existe entonces que cree la tabla y haga seed de datos iniciales.
    await this.db.execute(this.DB_SQL_TABLES);
    // Seeds
    await this.addCita(
      "Aunarse es el principio. Mantenerse juntos, es el progreso. Trabajar juntos es el éxito",
      "Henry Ford"
    );
    await this.addCita(
      "La vida es como montar en bicicleta. Para mantenerte en equilibrio debes seguir pedaleando.",
      "Albert Einstein"
    );
    await this.addCita(
      "Si realmente quieres hacer algo, encontrarás una manera. Si no quieres hacerlo, encontrarás una excusa.",
      "Jim Rohn"
    );
  }

  async addCita(frase: string, autor: string): Promise<void> {
    // Agrega una cita a la base de datos.
    const sqlQuery = `INSERT INTO cita (frase, autor) VALUES (?, ?);`;
    await this.db.run(sqlQuery, [frase, autor]);
  }

  async getCitas(): Promise<Cita[]> {
    // Obtiene un array con todas las citas desde la base de datos.
    const sqlQuery = "SELECT id, frase, autor FROM cita;";
    const result = await this.db.query(sqlQuery);
    return result?.values ?? [];
  }

  async getRandomCita(): Promise<Cita | null> {
    // Obtener una cita desde la base de manera aleatoria.
    const sqlQuery =
      "SELECT id, frase, autor FROM cita ORDER BY RANDOM() LIMIT 1;";
    const result = await this.db.query(sqlQuery);
    return result?.values?.[0] ?? null;
  }

  async deleteCita(id: number): Promise<void> {
    // Elimina una cita de la base de datos según el id especificado.
    const sqlQuery = `DELETE FROM cita WHERE id = ?;`;
    await this.db.run(sqlQuery, [id]);
  }
}
