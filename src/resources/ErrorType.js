import {
    Datagrid,
    Edit,
    List,
    SimpleForm,
    TextField,
    TextInput,
    Create, required,
} from "react-admin";
import React from "react";

export const ErrorTypeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" sortable={true}/>
            <TextField source="name" sortable={true}/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <TextField source="id"/>}
        <TextInput source="name" type="name" validate={[required("Mandatory")]} name="name"/>
    </SimpleForm>;
};

export const ErrorTypeEdit = (props) => (
    <Edit {...props} undoable={false}>
        {getForm(true)}
    </Edit>
);

export const ErrorTypeCreate = (props) => (
    <Create {...props} undoable={false}>
        {getForm(false)}
    </Create>
);