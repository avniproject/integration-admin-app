import {DateInput, Datagrid, Filter, List, ReferenceField, ReferenceInput, SelectInput, TextField, TextInput} from "react-admin";

const ErrorRecordsFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Error type" source="errorType" reference="errorType" alwaysOn>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <TextInput label="Entity UUID" source="entityId" alwaysOn/>
    </Filter>
);

export const ErrorRecordList = (props) => (
    <List {...props} filters={<ErrorRecordsFilter/>}>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField label="Error type" source="errorType" reference="errorType">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="avniEntityType"/>
            <TextField source="bahmniEntityType"/>
            <TextField source="entityUuid"/>
            <TextField source="errorLoggedAt"/>
        </Datagrid>
    </List>
);


const ErrorRecordsFilterByDate = (props) => (
    <Filter {...props}>
        <DateInput source="startDate" alwaysOn/>
        <DateInput source="endDate" alwaysOn/>
    </Filter>
);

export const ErrorRecordListByDate = (props) => (
    <List {...props} filters={<ErrorRecordsFilterByDate/>}>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField label="Error type" source="errorType" reference="errorType">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="avniEntityType"/>
            <TextField source="bahmniEntityType"/>
            <TextField source="entityUuid"/>
            <TextField source="errorLoggedAt"/>
        </Datagrid>
    </List>
);
