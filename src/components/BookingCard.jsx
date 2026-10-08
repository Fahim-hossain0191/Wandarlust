'use client'
import { authClient } from '@/lib/auth-client';
import { Button, Card, DateField, Label } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookingCard = ({destination}) => {
  const {_id,price,destinationName,imageUrl,country}=destination
  const { 
          data: session, 
         
      } = authClient.useSession()
  const user=session?.user
  console.log(user)
  const [departureDate,setDepartureDate]=useState(null);
  console.log(new Date(departureDate))

  const handleBooking=async()=>{
    const bookingData={
      userId:user?.id,
      userImage:user?.image,
      userName:user?.name,
      destinationId:_id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate)
    }
    try{
      const {data:tokenData}=await authClient.token()
      console.log(tokenData)
       const res=await fetch('http://localhost:5000/booking',{
      method:"POST",
      headers:{
        'content-type':"application/json",
        authorization:`Bearer ${tokenData?.token}`
      },
      body:JSON.stringify(bookingData)
    })
    const data=await res.json();
    console.log(data);
    toast.success("You booked successfully!")
    }catch(error){
     console.log(error);
    }
    
  }


    return (
        <Card className='rounded-none border mt-5'>
           <p className='text-sm text-muted'>Starting from</p>
           <h2 className='text-3xl text-cyan-200'>${price}</h2>
           <p className='text-sm text-muted'>per person</p>
            <DateField onChange={setDepartureDate} className="w-[256px]" name="date">
      <Label>Departure Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
    <Button onClick={handleBooking} className={"w-full rounded-none"}> Book Now</Button>
        </Card>
    );
};

export default BookingCard;