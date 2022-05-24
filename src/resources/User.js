import React from 'react';
import {Create, Datagrid, Edit, EditButton, email, EmailField, List, ReferenceField, required, SimpleForm, TextField, TextInput} from 'react-admin';

const validateEmail = email();

export const UserList = ({privileges, ...props}) => (
    <List {...props} title='Users'>
        <Datagrid>
            <EditButton/>
            <EmailField source="email"/>
            <TextField source="id"/>
            <ReferenceField label="Working integration system" source="workingIntegrationSystemId" reference="integrationSystem">
                <TextField source="name"/>
            </ReferenceField>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <TextField source="id"/>}
        <TextInput source="email" type="email" validate={[required("Mandatory"), validateEmail]} name="email"/>
        <TextInput label="New password" source="password" type="password" validate={isEdit ? [] : [required("Mandatory")]} name="password"/>
    </SimpleForm>;
};

export const UserCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const UserEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);
