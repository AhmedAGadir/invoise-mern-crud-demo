import { useState, useEffect } from "react";
import { Currency } from "../currencies";
import axios from "axios";

export type ExchangeRate = {
	[key in Currency]?: number;
};

const useCurrencyExchange = () => {
	const [selectedCurrency, setSelectedCurrency] = useState<Currency>();
	const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({});

	useEffect(() => {
		const fetchExchangeRate = async () => {
			try {
				if (!selectedCurrency) {
					setExchangeRate({});
					return;
				}
				const { data } = await axios.get(
					`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/${selectedCurrency}`
				);
				setExchangeRate(data?.conversion_rates);
			} catch (error) {
				console.error(error);
				setExchangeRate({});
			}
		};
		fetchExchangeRate();
	}, [selectedCurrency]);

	return {
		exchangeRate,
		selectedCurrency,
		setSelectedCurrency,
	};
};

export default useCurrencyExchange;
