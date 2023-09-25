import LoanBenListTable from '../../../Components/LoanBeneficiary/LoanBenListTable'
import PhoneListTable from '../../../Components/Phone/PhoneListTable'
import TableHeader from '../../../Components/shared/TableHeader/TableHeader'

function PhoneList() {
  return (
    <div className="max-w-screen">
    <TableHeader title={"Phone"} redirectLink={"/phone/createphone"} />
    <PhoneListTable />
  </div>
  )
}

export default PhoneList
