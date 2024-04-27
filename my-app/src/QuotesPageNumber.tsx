import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
interface QuoteRandom {
    text: string;
    author: string;
}
function QuotesPageNumber() {
    const { id } = useParams();
    const [quote, setQuote] = useState<QuoteRandom>({ text: "", author: "" });
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://inspo-quotes-api.herokuapp.com/quotes");
            const data = await response.json();
            const targetQuote = data.quotes[Number(id)];
            setQuote(targetQuote);
        }
        fetchData();
    }, []);

    return (
        <>
            <h1>{id}</h1>
            <h1>{quote.text}</h1>
            <p>{quote.author}</p>
        </>
    );
}

export default QuotesPageNumber;
