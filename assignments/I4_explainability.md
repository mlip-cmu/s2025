# Individual Assignment 4: Explainability

(17-445/17-645 Machine Learning in Production)

## Overview

In this assignment you will consider how to explain a model and its decisions to users and other stakeholders. You will prototype a page explaining the model and a page providing individual explanations. You will provide evidence to demonstrate compliance with regulation and reflect on the experience. It will provide the basis for an in-class discussion of different explainability strategies and policies.

Learning goals:

* Understand and distinguish the different notions of transparency, interpretability, and explainability
* Use state-of-the-art tools for model explainability to generate model and individual explanations
* Interpret regulation and provide evidence to demonstrate compliance. Reflect on the difficulty of working with provided policies.

## Research in this Course

*We are conducting academic research on explainability policies and evidence. This research will involve analyzing student work of this assignment. You will not be asked to do anything above and beyond the normal learning activities and assignments that are part of this course. You are free not to participate in this research, and your participation will have no influence on your grade for this course or your academic career at CMU. If you do not wish to participate, please send an email to Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)). Participants will not receive any compensation or extra credit. The data collected as part of this research will not include student grades. All analyses of data from participants’ coursework will be conducted after the course is over and final grades are submitted -- instructors do not know who choses not to participate before final grades are submitted. All data will be analyzed in de-identified form and presented in the aggregate, without any personal identifiers. The de-identified homework solutions (without grades) will be shared with research collaborators at Yale university for further analysis. If you have questions pertaining to your rights as a research participant, or to report concerns to this study, please contact Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)) or the Office of Research Integrity and Compliance at Carnegie Mellon University ([irb-review@andrew.cmu.edu](mailto:irb-review@andrew.cmu.edu); phone: [412-268-4721](tel:4122684721)).*

# The Use Case: Diabetic Retinopathy Screening

The use case is to detect [diabetic retinopathy](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy) early with a special purpose ML-powered medical device. Diabetic retinopathy is a condition that can result in vision loss if left untreated. [AEYE Health](https://www.aeyehealth.com) is a comparable commercial offering.

Consider you are building a smartphone app, replacing current large commercial devices. The app will be used by trained users (nurses, volunteers) to perform screenings to detect potential problems simply by having patients look into the smart phone's camera through a specialized lens attachment (a small 3-d printed holder for a lens).

Deploying such medical diagnostics as a smart phone app and low-cost hardware extension has the potential to drastically reduce screening costs and make screenings much more available, especially in underresourced regions of the world. Instead of having to travel to a clinic with specialized equipment, trained users could perform screenings at mobile clinics or in patients homes. The app would provide information about a potential risk and encourage the patients to get in contact with medical professionals for more accurate testing and potential treatment.

In this assignment, you will focus not only on the model, but also consider its integration into a smartphone app and its use for screening by trained users in underresourced regions (e.g., remote areas, high-poverty areas).

## The Policy

While government regulation is still evolving, the company that creates the smartphone app has set an internal responsible AI policy to hold itself to high standards of responsible engineering. The policy is mandatory for all projects using machine learning (similar to what many other big companies in the tech and medical space have done). The following 8 points are the relevant parts of the policy:

**INTENDED USE** 

1. Describe the automated system’s intended use and the role of the automation (model). [*Guidance: Include its purpose, setting of use, and intended user(s). Include information about how the automated system may be used in combination with other information.*] 
2. Provide evidence that the automation (model) functions accurately, consistently, and effectively in the intended use case. [*Guidance: Evidence could take the form of accuracy testing disclosures, data from real-life tests of the tool, or independent review.*]

**HOW IT WORKS** 

3. Describe how the automation (model) works generally. Provide evidence that the documentation is effective for the policy purpose. [*Guidance: Where possible identify general mechanisms or factors that most strongly influence the automation.*]

4. Provide a mechanism to describe how the automation (model) works with regard to an instance of use. Ensure it is in a form accessible to all intended users and subjects affected by the automated system. Descriptions must include (1) that automation was used, (2) a short explanation of how the automation works, (3) what additional actors are involved in decisions, (4) what significant personal data was used for the decision, (5) what decisions were reached in a specific case. Provide evidence that the documentation is effective for the policy purpose. [*Guidance: Provide individual explanations using appropriate mechanisms, such as graphs, text-based explanations, counterfactuals, or SHAP plots.*]

**CONCERNS**

5. Describe limitations and misuse potential of the automated system beyond its intended purpose and any provided mitigations. [*Guidance: Identify concrete problems and assess their risks.*]

6. Describe the data used by the automated system. Justify the use of personal identifiable information.

7. Describe how to report misuse or harm from the automated system.

**LANGUAGE REQUIREMENTS**

8. Provide all documentation in language appropriate for the intended audience. All documentation for untrained users must use nontechnical language at an *eighth grade reading level*.



## Tasks

In this assignment, you will work with a provided model for a potential medical application ([diabetic retinopathy detection with a smartphone app](https://github.com/cmu-seai/diabetic-retinopathy)), create explanations, and demonstrate compliance with policy requirements. You will provide explanations for patients and nurses. You will reflect on your solution with the help of a Chatbot as instructed on Canvas (different students may be assigned different reflection strategies, please do not compare before completing the assignment; they are all comparable in workload and difficulty and have exactly the same grading criteria). Create a GitHub repository with optional starter code for your work with the provided GitHub classroom link on Canvas. While we only provide the model and training/test data, assume that the model is embedded in a real-world software product as described in the repository. 

The task is to generate two forms of transparency mechanisms or explanations, discuss policy compliance, and reflect on the experience:

**Global explanations for the device handbook (for nurses, volunteers):** Consider what a *nurse* or volunteer who is screening patients might want to know about the product, the model, or the data (transparency). Create a PDF file  `explanation_global.pdf`  (e.g., from a HTML page or Word document) that includes information about the data or model in a form that the company producing the product *may disclose for transparency on its website or a handbook*. This might include information about the data, about accuracy, about important features, or about fairness. 

**Individual explanations for patient handouts:** Identify what a *patient* would want to know about individual predictions. Create explanations that you could give to a patient *as a handout after the screening*. Write code that produces explanations or fragments of explanations for a specific input for a patient, possibly automatically producing HTML pages from a template. Create a PDF file  `explanation_local.pdf`  (generated with code or created in any other way) that shows the explanations for *two* patients (example inputs) -- that is concatenate the explanations for two selected patients in the same PDF. While the approach should be repeatable for other patients, the creation of the PDF does not need to be fully automated and can involve manual steps.

**LLM-supported problem/solution analysis:** Use the instructions on Canvas to assess your approach with the help of a chatbot at any point in the project, whether early to reflect on the design or later to check your solution or both. Include the transcripts of your interactions with the chatbot in a PDF file `chatbot.pdf` (e.g., print from browser, concatenate multiple sessions if you try repeatedly).

**Policy compliance:** In your submission to Gradescope, discuss whether your solution complies with the provided policy. Where possible provide evidence for compliance -- what you consider as evidence is for you to decide. Note that compliance is not necessary to receive full credit for this assignment. If you think that your solution does not comply, explain why and either (a) outline what additional work you could do to comply or (b) explain why compliance is not possible. 

**Reflection:** In a separate "Reflection" section of your Gradescope submission answer the following questions (questions 3-9 do not require explanations, but you are welcome to provide more context):

1. What prior experiences did you have that helped you approach this assignment? Or what experience do you wish you have? [1-2 paragraphs]

2. Did your interaction with the chatbot change your explanations or what you thought about explanation? Why or why not? [1-2 paragraphs]

3. Have you taken a college-level course on writing? [yes/no]

4. On a scale of 1 to 5 (5 most difficult), how difficult was it to provide an explanation in plain language? [1-5]

5. On a scale of 1 to 5 (5 most difficult), how difficult was it to provide the global explanation for nurses? [1-5]

6. On a scale of 1 to 5 (5 most difficult), how difficult was it to provide the local explanations for patients? [1-5]

7. On a scale of 1 to 5 (5 most difficult), how difficult was it to understand the policy? [1-5]

8. On a scale of 1 to 5 (5 most difficult), how difficult was it to comply with the policy? [1-5]

9. On a scale of 1 to 5 (5 most useful), how useful was this assignment to your learning about ML explainability? [1-5]

   


### Hints and guidance

This assignment is intentionally open ended. We interpret explainability broadly, including technical post-hoc explanations like SHAP, local and global explanations, nontechnical textual descriptions and traditional transparency mechanisms, such as audits and model and data disclosures. We have no specific requirements about approaches or techniques to include; make a judgment about what you think is needed for the policy and what is useful for the stakeholder and policy purpose.

You can explore many different explainability and transparency techniques, including the ones discussed in class and in the lab and ones you find on your own. We recommend to rely on existing explainability tooling for nontrivial analyses rather than to develop your own. Many existing tools can generate plots that you can integrate into the websites you generate, but textual explanations are also perfectly acceptable. We do not care about the visual quality of the generated PDFs.

There is no single right explanation and we expect to see a very wide range of very different solutions. We are looking for a plausible solution where you argue why this solution is suitable, not any specific tool or design. We accept inadequate solutions as long as the compliance discussion identifies the shortcomings and discusses how they could be overcome if you had more time or resources.

The chatbots may or may not be helpful in creating or refining your solution. We have no expectations on how you use the chatbot or that you implement all or any insights or suggestions emerging from the chatbot interactions.

It may not be possible to always comply with the policy and it may not even be obvious whether a solution complies with the policy or whether some evidence is convincing. Discussing compliance and limitations is the learning goal, not actual compliance. We will have an in-class discussion about these challenges after the assignment. Importantly, we encourage you to strive for compliance and require a discussion, but we will not deduct points for noncompliance or poor evidence if you clearly identify the problem or ambiguity in your compliance discussion.







## Deliverable

Submit all code you used to your GitHub repository. Commit the PDF files `explanation_global.pdf`,  `explanation_local.pdf`, and `chatbot.pdf` to *the root directory* of your GitHub repository. Do not include your own name or Andrew ID in those three PDFs, if possible.

Submit a report as a single PDF file to Gradescope that covers the following topics in clearly labeled sections:

1. **GitHub link:** Start the document with a link to your last commit on GitHub in the format https://github.com/mlip-cmu/[repo]/commit/[commitid]. Make sure that the link includes the long ID of the last commit.
2. **Explanations and compliance** (0.5 page per policy requirement max): For each of the 8 policy requirements write:
   * **Explanation:** Briefly describe what kind of explanations you created to address the policy requirement. Refer to specific techniques or tools if you used any. Provide links to relevant code where applicable. Point out where we can find this explanation in `explanation_global.pdf` or `explanation_local.pdf` if it is not obvious. Note, the same explanation may satisfy multiple policy requirements and you can point to prior sections rather than repeating content.
   * **Compliance:** Discuss whether your solution complies with the policy requirement. If possible, provide evidence to demonstrate compliance. Write this as if you were submitting a short report to a compliance/legal team in your company to convince them that your product complies and can be released. If you cannot comply or are unsure, discuss additional steps needed for compliance or explain why compliance may not be possible.
   
3. **Reflection** (2 page max): Include answers to the questions above (two text answers, ratings on the rest) in a clearly separated subsection. Good reflections are grounded in concrete observations or specific experiences and should avoid generic statements that could apply to most solutions.


Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over long and rambling ones.

## Grading

The assignment is worth 100 points. For full credit, we expect:

* [ ] 10 points: The document includes a link to a specific commit in your GitHub repository created with GitHub classroom. 
* [ ] 15 points: A PDF file `explanation_global.pdf` is included in the root directory of the linked repository that contains the global explanations for the assigned stakeholder. The PDF corresponds to the description in the report.
* [ ] 15 points: A PDF file `explanation_local.pdf` is included in the root directory of the linked repository that contains the individual/local explanations for the assigned stakeholder for *two* patients. The PDF corresponds to the description in the report.
* [ ] 5 points: A PDF file `chatbot.pdf` is included in the root directory of the linked repository that contains at least one chat transcript with a chatbot relating to the instructions on Canvas.
* [ ] 10 points: Where explanations (e.g., figures) were created with code, the code is included in the repository. It aligns with the description.
* [ ] 40 points (5 points each): For each of the following policy requirements (a) the answer describes how the requirement was addressed technically, (b) the provided PDF files illustrate the solution, and (c) the answer makes a good faith attempt at providing evidence to demonstrate compliance, or discusses additional steps needed for compliance, or explains why compliance may not be possible. 
   1. Describes the intended use and the role of the automation
   2. Provides evidence that the automation (model) functions accurately, consistently, and effectively in the intended use case
   3. Describes how the automation (model) works generally and provides evidence that the documentation is effective for the policy purpose. 
   4. Individual explanations that explain that automation was used, what significant personal data was used for the decision, and what decisions were reached in the specific case 
   5. Describes limitations and misuse potential of the automated system beyond its intended purpose and any provided mitigations.
   6. Describes the data used by the automated system. Justifies the use of personal identifiable information.
   7. Describes how to report misuse or harm from the automated system.
   8. Provides all documentation in language appropriate for the intended audience. All documentation for untrained users must use nontechnical language at an eighth grade reading level.
   
* [ ] 5 points: A good-faith attempt at answering the 9 reflection questions.

