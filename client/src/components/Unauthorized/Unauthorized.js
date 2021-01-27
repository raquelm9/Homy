import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
    return (
        <div className='container-unauthorized'>
            <div className="message-title">
                <h1>403 - You Shall Not Pass</h1>
            </div>
            <div className="gandalf" >
                <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3a1b54b-64ba-4815-ae49-aa9dcab706e8/d6fqcm5-9a2267dc-5662-4e8d-b7e2-581e69ebe3e6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjNhMWI1NGItNjRiYS00ODE1LWFlNDktYWE5ZGNhYjcwNmU4XC9kNmZxY201LTlhMjI2N2RjLTU2NjItNGU4ZC1iN2UyLTU4MWU2OWViZTNlNi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.hK-kNL3EhQl8nawPr8GtqtoR23CZ99OI98yqrOzoVyU"
                    alt="Gandalf"
                />
                <p>Uh oh, Gandalf is blocking the way! Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>
            </div>
            <div className="back-home-link">
                <p><Link to='/'>Back to Home</Link></p>
            </div>

        </div>
    )
}

export default Unauthorized;
