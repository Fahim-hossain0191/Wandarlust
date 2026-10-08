import { Button, Link } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { LuExternalLink } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
const DestinationCard = ({ destination }) => {
  const { _id,imageUrl, price, destinationName, duration, country } = destination;

  return (
    <div className="border">
      <Image
        alt={destinationName}
        src={imageUrl}
        height={400}
        width={400}
      ></Image>
      <div className="p-2">
        <div className="flex items-center gap-2">
          <LuMapPin />
          <span>{country}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <div>
              <h2 className="text-xl font-bold">{destinationName}</h2>
            </div>
            <div className="flex gap-2 items-center">
              <SlCalender />
              {duration}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">${price}</h3>
          </div>
        </div>
      <Link href={`/destinations/${_id}`}>
      <Button variant="ghost" className="mt-1 text-cyan-500">Book Now <LuExternalLink /></Button>

      </Link>
      </div>
      
    </div>
  );
};

export default DestinationCard;
