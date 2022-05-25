import React from 'react';
import {Create, Datagrid, Edit, EditButton, email, EmailField, List, ReferenceField, required, SimpleForm, TextField, TextInput} from 'react-admin';

export const IntegrationSystemList = ({privileges, ...props}) => (
    <List {...props} title='Users'>
        <Datagrid>
            <EditButton/>
            <TextField source="name"/>
            <TextField source="id"/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <TextField source="id"/>}
        <TextInput source="name" type="name" validate={[required("Mandatory")]} name="name"/>
    </SimpleForm>;
};

export const IntegrationSystemEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);
