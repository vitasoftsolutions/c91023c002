import LoanBenListTable from "../../Components/LoanBeneficiary/LoanBenListTable";
import TableHeader from "../../Components/shared/TableHeader/TableHeader";

const LoanBeneficiaryList = () => {
  return (
    <div className="max-w-screen">
      <TableHeader title={"Beneficiary"} redirectLink={"/beneficiarylist/loan-beneficiary-crete"} />
      <LoanBenListTable />
    </div>
  );
};

export default LoanBeneficiaryList;
