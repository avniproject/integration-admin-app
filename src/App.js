import './App.css';
import { Admin, Resource } from 'react-admin'
import dataProvider from "./DataProvider";
import authProvider from './AuthProvider';
import {MappingMetadataCreate, MappingMetadataEdit, MappingMetadataList} from "./resources/MappingMetadata";
import {ErrorRecordList, ErrorRecordListByDate} from "./resources/ErrorRecord";

function App() {
  return (
      <Admin dataProvider={dataProvider("http://localhost:6030")} authProvider={authProvider}>
          <Resource name="mappingMetadata" list={MappingMetadataList} create={MappingMetadataCreate} edit={MappingMetadataEdit} options={{label: 'Mappings'}}/>
          <Resource name="errorRecordLog" list={ErrorRecordList} options={{label: 'Errors'}}/>
          <Resource name="errorRecordLog-by-date" list={ErrorRecordListByDate} options={{label: 'Search Errors by Date'}}/>
          <Resource name="mappingGroup"/>
          <Resource name="mappingType"/>
          <Resource name="errorType"/>
      </Admin>
  );
}

export default App;
