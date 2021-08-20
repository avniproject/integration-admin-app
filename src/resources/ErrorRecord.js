import {
    BooleanField,
    BooleanInput,
    Datagrid,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    DateField
} from "react-admin";

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
            <TextField source="loggedAt"/>
            <BooleanField source="processingDisabled"/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const ErrorRecordEdit = (props) => (
    <Edit {...props} undoable={false}>
        <SimpleForm>
            <TextField source="id"/>
            <ReferenceField label="Error type" source="errorType" reference="errorType">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="avniEntityType"/>
            <TextField source="bahmniEntityType"/>
            <TextField source="entityUuid"/>
            <TextField source="loggedAt"/>
            <BooleanInput source="processingDisabled"/>
        </SimpleForm>
    </Edit>
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
            <DateField source="loggedAt"/>
            <BooleanField source="processingDisabled"/>
            <EditButton/>
        </Datagrid>
    </List>
);
