import './App.css';
import { Admin, Resource } from 'react-admin'
import dataProvider from "./DataProvider";
import authProvider from './AuthProvider';

function App() {
  return (
      <Admin dataProvider={dataProvider("http://localhost:8080")} authProvider={authProvider}>
      </Admin>
  );
}

export default App;
