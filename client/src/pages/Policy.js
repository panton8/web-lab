import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>1. This Policy of the limited liability company "Belsinema" regarding the processing of digital data (hereinafter referred to as the Policy), developed in accordance with the legislation of the Republic of Belarus on the protection of digital data.</p>
          <p>2. The Policy applies to relationships in the processing of digital data, including collection, systematization, storage, change of scope, use, depersonalization, blocking, distribution, transfer, deletion of digital data, permitted with and without the use of automation tools.</p>
          <p>3. Policy for consultations between subjects of medical data - individuals in respect of whom medical data is processed.</p>
          <p>4. The processing of personal data by the Operator is based on the principles of legality, protection of the rights and interests of individuals, and the inviolability of their private life.</p>
          <p>5. The Policy is published in the public domain on the Internet information and telecommunications network on the Operator’s website.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;