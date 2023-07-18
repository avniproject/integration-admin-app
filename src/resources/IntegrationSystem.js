import React from 'react';
import {Datagrid, Edit, EditButton, List, required, SimpleForm, TextField, TextInput} from 'react-admin';

export const IntegrationSystemList = ({privileges, ...props}) => (
    <List {...props} title='Users'>
        <Datagrid>
            <EditButton/>
            <TextField source="type" label="System type"/>
            <TextField source="instanceName"/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <TextField source="id"/>}
        <TextInput source="instanceName" validate={[required("Mandatory")]} name="Instance Name"/>
        <TextInput source="type" validate={[required("Mandatory")]} name="System type"/>
    </SimpleForm>;
};

export const IntegrationSystemEdit = props => (
    <Edit {...props} mutationMode="pessimistic">
        {getForm(true)}
    </Edit>
);
