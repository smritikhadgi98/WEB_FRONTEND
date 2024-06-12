import React, {useEffect} from 'react';

import { testApi } from '../../apis/Api';

const Homepage = () => {


    // Print Hello!, when page loads (Automatic)
    useEffect(() => {
        console.log('Helawww its me!!!!')


        // trigger testAPI
        testApi().then((res) => {
            console.log(res)   //Test api is Working!
        })
    })



    return (
        <>
        <div>
           
            HomePage!!!

            </div>
            </>
    )
}

export default Homepage;