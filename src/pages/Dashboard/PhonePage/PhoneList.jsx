import LoanBenListTable from "../../../Components/LoanBeneficiary/LoanBenListTable";
import PhoneListTable from "../../../Components/Phone/PhoneListTable";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";

function PhoneList() {
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Phone"}
        redirectLink={"/phone/createphone"}
        url_endpoint={"/export-csv/?model=PhoneNumber&app_label=globalapp2"}
      />
      <PhoneListTable />
    </div>
  );
}

export default PhoneList;
