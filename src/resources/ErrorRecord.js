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
    DateField,
    Show,
    SimpleShowLayout
} from "react-admin";

import { Divider } from '@mui/material';

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
            <TextField source="avniEntityType" sortable={false}/>
            <TextField source="integratingEntityType" sortable={false}/>
            <TextField source="entityId" sortable={false}/>
            <DateField showTime showDate source="loggedAt" options={{ dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Kolkata'}}/>
            <BooleanField source="processingDisabled" sortable={false}/>
            <EditButton/>
        </Datagrid>
    </List>
);

export const ErrorRecordEdit = (props) => (
    <Edit {...props} mutationMode="pessimistic">
        <Show>
            <SimpleShowLayout divider={<Divider flexItem />}>
                <TextField source="id"/>
                <ReferenceField label="Error type" source="errorType" reference="errorType">
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="avniEntityType"/>
                <TextField source="integratingEntityType"/>
                <TextField source="entityId"/>
                <DateField showTime showDate source="loggedAt" options={{ dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Kolkata'}}/>
                <TextField source="errorMsg" emptyText="*** Not available ***" sortable={false}/>
            </SimpleShowLayout>
        </Show>
        <SimpleForm>
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
            <TextField source="integratingEntityType"/>
            <TextField source="entityId"/>
            <DateField showTime showDate source="loggedAt" options={{ dateStyle: 'short', timeStyle: 'short', timeZone: 'Asia/Kolkata'}}/>
            <BooleanField source="processingDisabled"/>
            <EditButton/>
        </Datagrid>
    </List>
);
