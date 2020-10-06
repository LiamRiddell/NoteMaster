import LocalStore from 'electron-store';

const localStoreSchema = {
  projectVersion: '0.3.1',
  migrations: {
    '0.2.2': store => {
      if (store.has('preferences.initialContent')) {
        const initialContent = store.get('preferences.initialContent');
        store.delete('preferences.initialContent');
        store.set('preferences.editorContent', initialContent);
      }
    },
    '0.3.1': store => {
      if (store.has('preferences.fontFamily')) {
        store.set('preferences.fontFamily', 'Roboto');
      }
    }
  }
};

const localStore = new LocalStore(localStoreSchema);

// eslint-disable-next-line import/prefer-default-export
export default localStore;
