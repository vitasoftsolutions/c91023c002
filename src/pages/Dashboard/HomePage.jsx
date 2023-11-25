import Chart_PaymentPerMonth from "../../Components/shared/AllCharts/Chart_PaymentPerMonth";
import Chart_MostDownloadedIndustry from "../../Components/shared/AllCharts/Chart_MostDownloadedIndustry";

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-[80vh]">
      <h1 className="text-primary text-4xl my-5 uppercase">
        Welcome to <span className="text-green-600">ERP</span>
      </h1>
      <div className="p-3 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold text-center text-black border-b-2">
              Cost Per Month
            </h2>
            <Chart_PaymentPerMonth />
          </div>
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold text-center text-black border-b-2">
              Customer Per Month
            </h2>
            <Chart_MostDownloadedIndustry />
          </div>
        </div>
        <div className="mt-20 p-3 bg-red-300">
          Copyright © 2012 - 2023 TermsFeed®. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default HomePage;
