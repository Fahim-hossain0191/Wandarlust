import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async() => {
    const res=await fetch('http://localhost:5000/destination')
    const destinations=await res.json()
    console.log(destinations);
    return (
        <div className='max-w-10xl mx-auto p-10'>
            <h1>All Destinations</h1>
            <div className='grid grid-cols-4 gap-5'>
                {
                    destinations.map(destination=><DestinationCard key={destination._id} destination={destination}></DestinationCard>)
                }
            </div>
        </div>
    );
};

export default DestinationPage;