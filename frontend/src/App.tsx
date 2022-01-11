import React, { useState, useEffect } from 'react';

function App() {

    const [greeting, setGreeting] = useState('')

    useEffect(() => {
        fetch('/api/greeting', {
            method: 'GET',
            headers: {
                'Accept': 'text/plain'
            }
        })
            .then(response => response.text())
            .then(text => setGreeting(text))
            .catch(err => setGreeting('Da ist etwas schief gelaufen'));
    }, []);

    return (
        <div>
            {greeting}
        </div>
    );
}

export default App;
