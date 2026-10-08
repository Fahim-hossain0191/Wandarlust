import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { TrashBin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;
  console.log(user);
  console.log(session);
  const res = await fetch(`http://localhost:5000/booking/${user?.id}`);
  const bookings = await res.json();
  console.log(bookings);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">My bookings</h1>
      <div className="space-y-5">
        {bookings.map((booking) => (
          <div className="flex border p-5 min-w-3xl " key={booking._id}>
            <div>

            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              height={200}
              width={200}
            ></Image>
            </div>
            <div className="pl-3">
              <h1>{booking.destinationName}</h1>
              <p>
                {new Date(booking.departureDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>BookingId: {booking._id}</p>
              <p className="text-3xl font-bold">${booking.price}</p>
              <BookingCancelAlert bookingId={booking._id}></BookingCancelAlert>
              {/* <Button className={"rounded-none border-red-500 text-red-500"} variant="outline">
                <TrashBin></TrashBin>Cancel
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingPage;
