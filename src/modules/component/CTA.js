import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-primary px-[212px] py-16 text-center">
      <h1 className="font-semibold text-6xl leading-[92.8px]">Our Commitment to Open Source</h1>
      <p className="text-[#04354A] -tracking-[1px] text-2xl">
        We're dedicated to making open source accessible to everyone. Join us in building a diverse, 
        inclusive community where knowledge is shared freely and innovation thrives.
      </p>
      <div className="mt-11">
        <Link to="/about-us">
          <Button
            className="bg-blue text-white font-semibold text-base px-[153px] py-4"
            text="Learn More"
          />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
