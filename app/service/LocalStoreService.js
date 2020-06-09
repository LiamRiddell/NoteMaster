import LocalStore from 'electron-store';

const localStoreSchema = {
  projectVersion: '0.2.2',
  migrations: {
    '0.2.2': store => {
      if (store.has('preferences.initialContent')) {
        const initialContent = store.get('preferences.initialContent');
        store.delete('preferences.initialContent');
        store.set('preferences.editorContent', initialContent);
      }
    }
  }
};

const localStore = new LocalStore(localStoreSchema);

// eslint-disable-next-line import/prefer-default-export
export default localStore;
