import React, { useState } from 'react';

const Clicker = (props) => {
    const [clicks, setClicks] = useState(0);
    return <div>
        <h1>Clicker</h1>
        <p>Clicks = {clicks}</p>
        <button type="button" onClick={() => setClicks(clicks + 1)}>Click me!</button>
    </div>
}

export default Clicker;
