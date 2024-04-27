import { useEffect, useState } from "react";

interface QuoteRandom {
    text: string;
    author: string;
}

function QuotesPage() {
    const [quote, setQuote] = useState<QuoteRandom>({ text: "", author: "" });
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://inspo-quotes-api.herokuapp.com/quotes/random");
            const data = await response.json();
            setQuote(data.quote);
        }
        fetchData();
    }, []);
    return (
        <>
            <h1>{quote.text}</h1>
            <p>{quote.author}</p>
        </>
    );
}

export default QuotesPage;
