import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import {
  getSearchList,
  getChartList,
  getCoinList,
} from "../../services/cryptoApi";

import styles from "./Search.module.css";

function Search({ currency, setCurrency, setChart, golds }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    } else {
      setIsLoading(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch(getSearchList(text), {
          signal: controller.signal,
        });
        const json = await response.json();
        if (json.coins) {
          setIsLoading(false);
          setCoins(json.coins);
        } else {
          console.log(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message);
        }
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [text]);

  const showHandler = async (coin) => {
    try {
      const response = await fetch(getChartList(coin.id));
      const json = await response.json();
      setChart({ ...json, coin });
    } catch (error) {
      setChart(null);
      console.log(error.message);
    }
  };

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {text && coins && (
        <div className={styles.searchResult}>
          {isLoading ? (
            <RotatingLines
              width="50"
              height="50"
              strokeColor="#3874ff"
              strokeWidth="2"
            />
          ) : (
            <ul>
              {coins.map((coin) => (
                <li key={coin.id} onClick={() => showHandler(coin)}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
