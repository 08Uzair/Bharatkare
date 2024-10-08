import React from "react";
import CustomCard from "../custom/CustomCard";

const AboutCards = () => {
  const data = [
    {
      txt1: "stethoscope",
      txt2: "Our Doctors",
      txt3: "Select a doctor and schedule",
      txt4: "an appointment.",
    },
    {
      txt1: "calendar_month",
      txt2: "Appointments",
      txt3: "Call 844-463-2778 or click ",
      txt4:"to request a same-day ."
    },
    {
      txt1: "distance",
      txt2: "Find Locations",
      txt3: "BharatKare HQ, Sector 17",
      txt4: "Gurgaon , 122003",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center flex-wrap mt-[4rem] mb-[4rem] w-[100%]">
        {data.map((item, index) => {
          return (
            <>
            <div className="m-8">
            <CustomCard
                txt1={item.txt1}
                txt2={item.txt2}
                txt3={item.txt3}
                txt4={item.txt4}
              />
            </div>
             
            </>
          );
        })}
      </div>
    </>
  );
};

export default AboutCards;
