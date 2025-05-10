import React from "react";
import ContributionGuide from "../../components/ContributionGuide";
import { contributionData } from "../../Data";
import Layout from "../../components/layout/Layout";

const Designers = () => {
  const designerData = contributionData.find(
    (contribution) => contribution.role === "Designers"
  );

  return (
    <Layout>
      <ContributionGuide
        data={designerData.contributions}
        role={designerData.role}
        icon={designerData.icon}
        info={designerData.intro}
        videoContent={!!designerData.videoTutorial}
        videoText={designerData.videoTutorial?.description}
        videoLink={designerData.videoTutorial?.link}
        summaryTitle={designerData.remarks.title}
        summaryContent1={designerData.remarks.content1}
        summaryContent2={designerData.remarks.content2}
      />
    </Layout>
  );
};

export default Designers;
