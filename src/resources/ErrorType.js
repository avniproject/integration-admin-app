import {Create, Datagrid, Edit, List, required, SelectInput, SimpleForm, TextField, TextInput,} from "react-admin";
import React from "react";

export const ErrorTypeList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" sortable={false}/>
            <TextField source="name" sortable={false}/>
            <TextField source="comparisonOperator" sortable={false}/>
            <TextField source="comparisonValue" sortable={false}/>
            <TextField source="followUpStep" sortable={false}/>
        </Datagrid>
    </List>
);

let getForm = function (isEdit) {
    return <SimpleForm>
        {isEdit && <TextField source="id"/>}
        <TextInput source="name" type="name" validate={[required("Mandatory")]} name="name"/>
        <SelectInput label="Comparison Operator"
          choices={[
              { id: 'EQUALS', name: 'EQUALS' },
              { id: 'CONTAINS', name: 'CONTAINS' },
              { id: 'MATCHES', name: 'MATCHES' },
          ]}
          source="comparisonOperator" name="comparisonOperator" validate={[required("Mandatory")]}>
        </SelectInput>
      <TextInput source="comparisonValue" type="comparisonValue" validate={[required("Mandatory")]} name="comparisonValue"/>
      <SelectInput label="Follow Up Step"
                   choices={[
                     { id: 'Process', name: 'Process' },
                     { id: 'Terminal', name: 'Terminal' },
                   ]}
                   source="followUpStep" name="followUpStep" validate={[required("Mandatory")]}>
      </SelectInput>
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