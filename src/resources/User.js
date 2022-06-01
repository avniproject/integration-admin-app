import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    email,
    EmailField,
    List,
    ReferenceField,
    required,
    SimpleForm,
    TextField,
    TextInput,
    ReferenceInput,
    SelectInput
} from 'react-admin';

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
        <TextInput source="email" type="email" validate={[required("Mandatory"), validateEmail]} name="email"/>
        {/*<TextInput label="New password" source="password" type="password" validate={isEdit ? [] : [required("Mandatory")]} name="password"/>*/}
        <ReferenceInput label="Working integration system" source="workingIntegrationSystemId" reference="integrationSystem" name="workingIntegrationSystem">
            <SelectInput optionText="name" source="name" type="name" validate={[required("Mandatory")]} name="name" />
        </ReferenceInput>
    </SimpleForm>;
};

export const UserCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const UserEdit = props => (
    <Edit {...props} mutationMode="pessimistic">
        {getForm(true)}
    </Edit>
);
