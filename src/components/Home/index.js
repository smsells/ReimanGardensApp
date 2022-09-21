import React from 'react'
import { Link} from 'react-router-dom'



const Home = () =>{
    return(
        <div className="Home">
            <header title="Welcome!"> </header>
            <Link to ="/notes"><button> Go to Notes</button> </Link>

        </div>
    )
}
export default Home;