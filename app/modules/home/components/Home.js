import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
    <div>
        <span>home</span><p />
        <Link to='/away'>Away</Link>
    </div>
);

export default Home;

