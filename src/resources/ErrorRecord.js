import {List, Datagrid, TextField} from "react-admin";

export const ErrorRecordList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="avniEntityType"/>
            <TextField source="bahmniEntityType"/>
            <TextField source="entityId"/>
        </Datagrid>
    </List>
);
