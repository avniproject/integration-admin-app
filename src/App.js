import './App.css';
import { Admin, Resource } from 'react-admin'
import dataProvider from "./DataProvider";
import authProvider from './AuthProvider';
import {MappingMetadataList} from "./resources/MappingMetadata";
import {ErrorRecordList} from "./resources/ErrorRecord";

function App() {
  return (
      <Admin dataProvider={dataProvider("http://localhost:3000")} authProvider={authProvider}>
          <Resource name="mappingMetadata" list={MappingMetadataList}/>
          <Resource name="errorRecord" list={ErrorRecordList}/>
      </Admin>
  );
}

export default App;
