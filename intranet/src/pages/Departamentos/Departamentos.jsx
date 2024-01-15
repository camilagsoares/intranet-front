import { React } from "react";
import TableDepartamentos from "./components/TableDepartamentos";


const Departamentos = () => {

    return (
        <div className="flex flex-col gap-4">
            <TableDepartamentos />
        </div>
    );
}

export default Departamentos;