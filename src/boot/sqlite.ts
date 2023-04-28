import { boot } from 'quasar/wrappers';
/* SQLite imports */
import {
  defineCustomElements as jeepSqlite,
  applyPolyfills,
} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { useState } from '@/composables/state';
import { schemaToImport179 } from '@/utils/utils-import-from-json';

export default boot(({ app }) => {
  applyPolyfills().then(() => {
    jeepSqlite(window);
  });
  window.addEventListener('DOMContentLoaded', async () => {
    const platform = Capacitor.getPlatform();
    const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)


    /* SQLite Global Variables*/

    // Only if you want to use the onProgressImport/Export events
    const [jsonListeners, setJsonListeners] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [message, setMessage] = useState('');
    app.config.globalProperties.$isModalOpen = { isModal: isModal, setIsModal: setIsModal };
    app.config.globalProperties.$isJsonListeners = { jsonListeners: jsonListeners, setJsonListeners: setJsonListeners };
    app.config.globalProperties.$messageContent = { message: message, setMessage: setMessage };

    //  Existing Connections Store
    const [existConn, setExistConn] = useState(false);
    app.config.globalProperties.$existingConn = { existConn: existConn, setExistConn: setExistConn };

    try {
      console.log('platform', platform);
      if (platform === 'web') {
        // Create the 'jeep-sqlite' Stencil component
        const jeepSqlite = document.createElement('jeep-sqlite');
        document.body.appendChild(jeepSqlite);
        await customElements.whenDefined('jeep-sqlite');
        // Initialize the Web store
        await sqlite.initWebStore();
      }
      // here you can initialize some database schema if required

      // example: database creation with standard SQLite statements 
      const ret = await sqlite.checkConnectionsConsistency();
      const isConn = (await sqlite.isConnection('db_tab3', false)).result;
      let db: SQLiteDBConnection
      if (ret.result && isConn) {
        db = await sqlite.retrieveConnection('db_tab3', false);
      } else {
        db = await sqlite.createConnection('db_tab3', false, 'no-encryption', 1, false);
      }
      await db.open();
      const query = `
    CREATE TABLE IF NOT EXISTS test (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL
    );
    `
      const res = await db.execute(query);
      if (res.changes && res.changes.changes && res.changes.changes < 0) {
        throw new Error('Error: execute failed');
      }
      await sqlite.closeConnection('db_tab3', false);

      // example: database creation from importFromJson 
      const result = await sqlite.isJsonValid(JSON.stringify(schemaToImport179));
      if (!result.result) {
        throw new Error('isJsonValid: "schemaToImport179" is not valid');
      }
      // full import
      const resJson = await sqlite.importFromJson(JSON.stringify(schemaToImport179));
      if (resJson.changes && resJson.changes.changes && resJson.changes.changes < 0) {
        throw new Error('importFromJson: "full" failed');
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      throw new Error(`Error: ${err}`)
    }
  });

});

