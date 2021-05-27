import './App.css';
import { Admin, Resource } from 'react-admin'
import dataProvider from "./DataProvider";
import authProvider from './AuthProvider';
import {MappingMetadataCreate, MappingMetadataEdit, MappingMetadataList} from "./resources/MappingMetadata";
import {ErrorRecordList} from "./resources/ErrorRecord";

function App() {
  return (
      <Admin dataProvider={dataProvider("http://localhost:6030")} authProvider={authProvider}>
          <Resource name="mappingMetadata" list={MappingMetadataList} create={MappingMetadataCreate} edit={MappingMetadataEdit}/>
          <Resource name="errorRecord" list={ErrorRecordList}/>
          <Resource name="mappingGroup"/>
          <Resource name="mappingType"/>
      </Admin>
  );
}

export default App;
