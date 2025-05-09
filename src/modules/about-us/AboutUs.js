import React from "react";
import Layout from "../../components/layout/Layout";
import ImageCard from "../../components/ImageCard";
import SEO from "../../components/SEO";

const AboutUs = () => {
  return (
    <Layout>
      <SEO 
        title="About OpenNest-Africa - Who We Are"
        description="Get to know OpenNest-Africa—an open source community that welcomes everyone and connects people from all over the world."
      />
      <div className="px-[100px] py-16 w-full h-full mx-auto text-black space-y-[50px]">
        <h1 className="text-[64px] leading-[92.8px] font-semibold">About Us</h1>
        <p className="text-2xl leading-[34.8px]">
          At OpenNest, we are dedicated to fostering a welcoming and inclusive
          community for everyone who wants to explore the world of open-source
          software. Our mission is to provide beginners with resources, support,
          and guidance regardless of their technical background. Everyone
          deserves a safe space to learn, grow, and contribute to open-source
          projects.
        </p>
        <div>
          <h2 className="font-semibold text-4xl">OpenNest Team</h2>
          <p className="text-2xl leading-[34.8px] pt-3">
            <span className="font-bold">We're not just a team;</span> we're a
            family of passionate individuals who believe in the power of open
            source. Each of us brings our unique experiences and talents to the
            table, and together, we're on a mission to make open-source projects
            accessible and enjoyable for everyone.
          </p>
          <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 pt-10 gap-10">
            <ImageCard
              name="Noimot Alabi"
              role="Frontend Developer"
              image="/team-images/naima.svg"
            />
            <ImageCard
              name="Miracle Ozukalu"
              role="Product Designer"
              image="/team-images/miracle.svg"
            />
            <ImageCard
              name="Mutiat Bashua"
              role="Software Developer"
              image="/team-images/mutiat.svg"
            />
            <ImageCard
              name="Aishat Muibudeen"
              role="Community Manager & Product Designer"
              image="/team-images/maya.svg"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-4xl font-semibold">💖 Sponsor Us</h3>
          <div className="text-2xl leading-[34.8px] space-y-6">
            <p>
              We believe in making open source accessible to everyone. Your
              support helps us keep building, maintaining resources, and
              fostering a welcoming space for contributors.
            </p>
            <p>
              <h6>
                If you like what we're building, you can support us in two ways:
              </h6>
              <ul className="list-disc pl-5">
                <li>
                  ⭐{" "}
                  <a
                    href="https://github.com/open-nest-africa/open-nest-africa"
                    className="font-semibold underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Star us on GitHub
                  </a>
                  {" –  "}A quick way to show support and help others discover
                  our project.
                </li>
                <li>
                  🌐{" "}
                  <a
                    href="https://opencollective.com/open-nest-africa"
                    target="_blank"
                    className="font-semibold underline"
                    rel="noreferrer"
                  >
                    Sponsor us on OpenCollective
                  </a>{" "}
                  – If you believe in our mission, consider contributing to help
                  us grow and build a better community.
                </li>
              </ul>
            </p>
            <p>
              Your support, big or small, makes a real difference. Together, we
              can keep open source fun, accessible, and inclusive! 😊
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
