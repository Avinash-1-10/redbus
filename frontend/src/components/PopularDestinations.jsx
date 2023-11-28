import React from "react";
import himachal from "../assets/images/himachal.jpg";
import mumbai from "../assets/images/mumbai.jpg";
import kerala from "../assets/images/kerala.jpg";

const destinations = [
  { image: mumbai, name: "Mumbai" },
  { image: himachal, name: "Himachal" },
  { image: kerala, name: "Kerala" },
  {
    image:
      "https://images.pexels.com/photos/4014919/pexels-photo-4014919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    name: "Goa",
  },
];

const PopularDestinations = () => {
  return (
    <div className="mx-[130px] my-10">
      <h1 className="text-center mb-20 mt-10 text-[40px] baloo font-bold">
        <span className="text-[#F0BE2A]">Popular</span>{" "}
        <span className="text-[#2F94E4]">Destinations</span>
      </h1>
      <div className="flex justify-between items-center w-full">
        {destinations.map((destination, index) => (
          <div key={index} className="relative group cursor-pointer">
            <img
              src={destination.image}
              alt={destination.name}
              className="h-[385px] w-[250px] rounded-md object-cover shadow-md group-hover:opacity-80 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black bg-opacity-50 text-white text-center p-2 baloo font-bold">
              {destination.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
