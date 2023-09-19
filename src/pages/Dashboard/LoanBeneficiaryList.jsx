import LoanBenListTable from "../../Components/LoanBeneficiaryList/LoanBenListTable";
import TableHeader from "../../Components/shared/TableHeader/TableHeader";

const LoanBeneficiaryList = () => {
  return (
    <div className="max-w-screen">
      <TableHeader title={"Beneficiary"} redirectLink={"/loan-beneficiary-crete"} />
      <LoanBenListTable />
    </div>
  );
};

export default LoanBeneficiaryList;
