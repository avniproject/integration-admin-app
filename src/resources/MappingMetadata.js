import {BooleanField, ReferenceField, Edit, EditButton, required, ReferenceInput, SelectInput, BooleanInput, SimpleForm, Datagrid, Filter, List, Create, TextField, TextInput} from "react-admin";

const MappingMetadataFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Avni Value" source="avniValue" alwaysOn />
        <TextInput label="Bahmni Value" source="bahmniValue" alwaysOn />
    </Filter>
);

export const MappingMetadataList = (props) => (
    <List {...props} filters={<MappingMetadataFilter/>}>
        <Datagrid>
            <TextField source="id"/>
            <ReferenceField label="Mapping Group" source="mappingGroup" reference="mappingGroup">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Mapping Type" source="mappingType" reference="mappingType">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="bahmniValue"/>
            <TextField source="avniValue"/>
            <BooleanField source="coded"/>
            <EditButton/>
        </Datagrid>
    </List>
);

function getForm(isEdit) {
    return <SimpleForm>
        {isEdit && <TextField source="id"/>}
        <ReferenceInput label="Mapping Group" source="mappingGroup" reference="mappingGroup" validate={[required("Mandatory")]}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Mapping Type" source="mappingType" reference="mappingType" validate={[required("Mandatory")]}>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="avniValue" fullWidth/>
        <TextInput source="bahmniValue" fullWidth/>
        <BooleanInput source="coded"/>
    </SimpleForm>;
}

export const MappingMetadataCreate = (props) => (
    <Create {...props}>
        {getForm(false)}
    </Create>
);

export const MappingMetadataEdit = (props) => (
    <Edit {...props}>
        {getForm(true)}
    </Edit>
);
