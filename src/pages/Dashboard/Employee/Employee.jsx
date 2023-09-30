import PhoneListTable from "../../../Components/Phone/PhoneListTable";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";

function Employee() {
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Employee"}
        redirectLink={"/employee/createemployee"}
        // url_endpoint={"/export-csv/?model=PhoneNumber&app_label=globalapp2"}
      />
      <PhoneListTable />
    </div>
  );
}

export default Employee;
