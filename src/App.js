import './App.css';
import {Admin, Resource} from 'react-admin'
import dataProvider from "./DataProvider";
import authProvider from './AuthProvider';
import {MappingMetadataCreate, MappingMetadataEdit, MappingMetadataList} from "./resources/MappingMetadata";
import {ErrorRecordEdit, ErrorRecordList, ErrorRecordListByDate} from "./resources/ErrorRecord";
import {UserCreate, UserEdit, UserList} from "./resources/User";
import AppConfig from "./AppConfig";
import {IntegrationSystemEdit, IntegrationSystemList} from "./resources/IntegrationSystem";
import {MappingGroupCreate, MappingGroupList} from "./resources/MappingGroup";
import {MappingTypeCreate, MappingTypeList} from "./resources/MappingType";
import {ErrorTypeCreate, ErrorTypeList} from "./resources/ErrorType";

function App() {
    return (
        <Admin dataProvider={dataProvider(AppConfig.dataProviderUrl)} authProvider={authProvider}>
            <Resource name="mappingGroup" options={{label: 'Mapping groups'}} create={MappingGroupCreate} list={MappingGroupList}/>
            <Resource name="mappingType" options={{label: 'Mapping types'}} create={MappingTypeCreate} list={MappingTypeList}/>
            <Resource name="mappingMetadata" list={MappingMetadataList} create={MappingMetadataCreate} edit={MappingMetadataEdit} options={{label: 'Mappings'}}/>
            <Resource name="errorRecordLog" list={ErrorRecordList} options={{label: 'Errors'}} edit={ErrorRecordEdit}/>
            <Resource name="errorRecordLog-by-date" list={ErrorRecordListByDate} options={{label: 'Search Errors by Date'}}
                      edit={ErrorRecordEdit}/>
            <Resource name="user" options={{label: 'Users'}} list={UserList} edit={UserEdit} create={UserCreate}/>
            <Resource name="errorType" list={ErrorTypeList} options={{label: 'ErrorTypes'}} create={ErrorTypeCreate}/>
            <Resource name="integrationSystem" options={{label: 'Integration Systems'}} list={IntegrationSystemList} edit={IntegrationSystemEdit}/>
        </Admin>
    );
}

export default App;
