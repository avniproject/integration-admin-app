import React from 'react';
import {Create, Datagrid, Edit, List, required, SimpleForm, TextField, TextInput} from 'react-admin';

export const MappingTypeList = ({privileges, ...props}) => (
    <List {...props} title='Users'>
        <Datagrid>
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

export const MappingTypeEdit = props => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);

export const MappingTypeCreate = props => (
    <Create {...props} undoable={false}>
        {getForm(false)}
    </Create>
);
