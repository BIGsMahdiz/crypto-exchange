import { useEffect, useState } from "react";

import { getCoinList } from "../../services/cryptoApi";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(getCoinList(page, currency));
        const json = await response.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, currency]);

  return (
    <div>
      <Search
        currency={currency}
        setCurrency={setCurrency}
        setChart={setChart}
        golds={coins}
      />
      <TableCoin
        coins={coins}
        loading={isLoading}
        error={error}
        setChart={setChart}
      />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
}

export default HomePage;
