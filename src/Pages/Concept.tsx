import React from "react";
import "../styles/concept.css";
import LiveFramework from "../assets/LiveFramework.svg";
import SystemArchitecture from "../assets/SystemArchitecture.svg";

interface Props {}

const Concept: React.FC<Props> = () => {
  return (
    <div className="container mt-5">
      <section className="framework-section align-center">
        <div className="row align-items-top">
          <h2 className="text-start">Live Framework</h2>
          <div className="col-md-12">
            <p className="text-start">
              To create living, interactive systematic reviews (LISRs), we built
              a living interactive evidence synthesis (LIvE) platform, which is
              undergoing constant updates to fully implement LIvE framework.
              Each LISR created using LIvE platform is linked to an independent
              webpage which is automatically updated as new data is added or new
              changes are implemented. As shown in the figure, LIvE framework
              consists of five major components to cover the entire process of
              living systematic reviews. To complete a LISR, the five components
              (i.e.., the automated search, the scanner, the extractor, the
              analyzer, and the tabulator) enable the raw data collection,
              screening, information extraction, data analysis, and interactive
              visualization of the analysis results, respectively. Moreover,
              LIvE framework has three pathways to further improve the
              flexibility and efficiency: conventional pathway, semi-automated
              human-in-the-loop pathway, and artificial intelligence (AI)
              powered pathway. Each pathway shares the same data structure to be
              compatible with different technical implementations and
              interchangeability, while has its own characteristics. The data
              can enter or leave the pipeline at each component and move across
              pathways allowing the flexible use of platform for specific tasks
              such as data-analysis or creating summary of findings (SoF)
              tables. The conventional pathway allows the data collection
              outside the LIvE platform and subsequently the structured data can
              be uploaded to the platform to maintain the LISR. The
              human-in-the-loop pathway allows the process to be fully completed
              in LIvE platform and facilitates the process by automated
              execution of a defined search strategy, web-assisted rule-based
              screening of new citations and data extraction on an interactive
              graphical user interface and automated data analysis. The
              AI-powered pathway, which is currently under development, will
              allow near-automation of this process including screening, data
              extraction and analysis. A key strength of LIvE platform is the
              interactive features (e.g., interactive PRISMA, interactive table
              of results, dynamic pairwise and network meta-analysis output, and
              SoF tables) regardless of the pathway used to maintain LISR in
              LIvE platform.
            </p>
          </div>
          <div className="col-md-12" style={{ textAlign: "center" }}>
            <img
              src={LiveFramework}
              alt="Live Framework"
              className="image-animation"
            />
          </div>
        </div>
      </section>
      <br />
      <hr />
      <br />
      <br />
      <section className="architecture-section">
        <div className="row align-items-top ">
          <h2 className="text-start">System Architecture</h2>
          <div className="col-md-12">
            <p className="text-start">
              To implement our proposed LIvE framework, we built the LIvE
              platform in a five-layer architecture, which includes: application
              layer, shared module layer, core service layer, middleware layer,
              and storage layer respectively. The modules in each layer
              decomposes the requests from upper layer and aggregates the
              responses from lower layer to complete specific tasks. In the
              application layer, there are 6 applications to provide the
              graphical user interface (GUI) to different users. Each
              application is designed for a specific task, such as monitoring
              the latest updates in studies (the watcher), screening studies for
              inclusion or exclusion and extracting data on or further analysis
              using web-assisted rule-based annotations implement through
              interactive graphical user interface (the scanner and the
              extractor), conducting the meta-analysis (pairwise or network
              meta-analysis) on selected studies (the analyzer). To support
              these functions, applications are built upon customized GUI
              modules and third-party frontend packages, which are listed in the
              shared module layer; In the core service layer, the meta-analysis
              application programming interface (API) receives the user
              operations from the modules in each application. Those user
              operations are forwarded to specific service modules, which are
              used to execute commands or packages in the middleware layer. For
              example, the outcome analysis service in the project management
              converts the requests from the modules in data analyzer to R
              script by Python network packages, then this service gets the
              results of the R script and sends the results back to users; In
              the storage layer, all the data used in the system, including the
              structured meta data of projects and studies, semi-structured user
              annotation data, and free-text data of study PDF files, are
              formatted as defined in our meta-analysis data standard and saved
              in different place according to its characteristics.
            </p>
          </div>
          <div className="col-md-12">
            <img
              src={SystemArchitecture}
              alt="System Architecture"
              className="image-animation"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Concept;
