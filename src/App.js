import './App.css';
import {Admin, Resource} from 'react-admin'
import dataProvider from "./DataProvider";
import authProvider from './AuthProvider';
import {MappingMetadataCreate, MappingMetadataEdit, MappingMetadataList} from "./resources/MappingMetadata";
import {ErrorRecordEdit, ErrorRecordList, ErrorRecordListByDate} from "./resources/ErrorRecord";
import {UserCreate, UserEdit, UserList} from "./resources/User";

function App() {
    return (
        <Admin dataProvider={dataProvider("http://localhost:6033")} authProvider={authProvider}>
            <Resource name="mappingMetadata" list={MappingMetadataList} create={MappingMetadataCreate} edit={MappingMetadataEdit} options={{label: 'Mappings'}}/>
            <Resource name="errorRecordLog" list={ErrorRecordList} options={{label: 'Errors'}} edit={ErrorRecordEdit}/>
            <Resource name="errorRecordLog-by-date" list={ErrorRecordListByDate} options={{label: 'Search Errors by Date'}}
                      edit={ErrorRecordEdit}/>
            <Resource name="user" options={{label: 'Users'}} list={UserList} edit={UserEdit} create={UserCreate}/>
            <Resource name="mappingGroup"/>
            <Resource name="mappingType"/>
            <Resource name="errorType"/>
        </Admin>
    );
}

export default App;
