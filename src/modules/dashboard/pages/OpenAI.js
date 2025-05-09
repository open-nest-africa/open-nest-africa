import React from "react";
import DashboardContentLayout from "../../DashboardContentLayout";
import OpenAIContent from "../../component/OpenAIContent";
import SEO from "../../../components/SEO";

function OpenAI() {
  return (
    <DashboardContentLayout>
      <SEO 
        title="OpenAI Projects - OpenNest-Africa"
        description="Access and contribute to OpenAI-related projects. Join African developers working on AI innovation and implementation."
      />
      <div>
        <OpenAIContent />
      </div>
    </DashboardContentLayout>
  );
}

export default OpenAI;
