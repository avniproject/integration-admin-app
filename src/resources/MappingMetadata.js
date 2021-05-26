import {List, Datagrid, TextField} from "react-admin";

export const MappingMetadataList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="mappingGroup"/>
            <TextField source="mappingType"/>
            <TextField source="bahmniValue"/>
            <TextField source="avniValue"/>
            <TextField source="dataTypeHint"/>
        </Datagrid>
    </List>
);
