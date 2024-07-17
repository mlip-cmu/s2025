# Individual Assignment 4: Explainability

(17-445/17-645 Machine Learning in Production)

## Overview

In this assignment you will consider how to explain a model and its decisions to users and other stakeholders. You will prototype a page explaining the model and a page providing individual explanations. You will provide evidence to demonstrate compliance with regulation and reflect on the experience. It will provide the basis for an in-class discussion of different explainability strategies and policies.

Learning goals:

* Understand and distinguish the different notions of transparency, interpretability, and explainability
* Use state-of-the-art tools for model explainability to generate model and individual explanations
* Interpret regulation and provide evidence to demonstrate compliance. Reflect on the difficulty of working with provided policies.

## Research in this Course

*We are conducting academic research on explainability policies and evidence. This research will involve analyzing student work of this assignment. You will not be asked to do anything above and beyond the normal learning activities and assignments that are part of this course. You are free not to participate in this research, and your participation will have no influence on your grade for this course or your academic career at CMU. If you do not wish to participate, please send an email to Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)). Participants will not receive any compensation or extra credit. The data collected as part of this research will not include student grades. All analyses of data from participants’ coursework will be conducted after the course is over and final grades are submitted -- instructors will not know who chooses not to participate before final grades are submitted. All data will be analyzed in de-identified form and presented in the aggregate, without any personal identifiers. If you have questions pertaining to your rights as a research participant, or to report concerns to this study, please contact Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)) or the Office of Research Integrity and Compliance at Carnegie Mellon University ([irb-review@andrew.cmu.edu](mailto:irb-review@andrew.cmu.edu); phone: 412-268-4721).*

# The Use Case: Blindness Detection

The use case is to detect [diabetic retinopathy](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy) to stop blindness before it's too late with a special purpose ML-powered medical device. [AEYE Health](https://www.aeyehealth.com) is a comparable commercial offering.

Consider you are building a smartphone app, replacing current large commercial devices. The app will be used by trained users (nurses, volunteers) to perform screenings to detect potential problems simply by having patients look into the smart phone's camera through a specialized lens attachment (a small 3-d printed holder for a lens).

Deploying such medical diagnostics as a smart phone app and low-cost hardware extension has the potential to drastically reduce screening costs and make screenings much more available, especially in underresourced regions of the world. Instead of having to walk to a clinic with specialized equipment, trained users could perform screenings at mobile clinics or in patients homes. The app would provide information about a potential risk and encourage the patients to get in contact with medical professionals for more accurate testing and potential treatment.

In this assignment, you will focus not only on the model, but also consider its integration into a smartphone app and its use for screening by trained users in underresourced regions (e.g., remote areas, high-poverty areas).



## Tasks

Create a GitHub repository with optional starter code for your work with the provided GitHub classroom link on Canvas. Use this starter code with data and model for [diabetic retinopathy detection](https://github.com/cmu-seai/diabetic-retinopathy). You do not actually need to build the smartphone app or deal with hardware, but you should think about explanations that could be plausibly provided either within the app (displaying instructions or results) or as additional external documentation (e.g., product website, handbooks, tutorials).

You will provide explanations (or transparency) for one of the following stakeholders:

* **Patients:** Consider what information you would provide to patients (a) before and (b) after the procedure. The information will be electronically displayed on the smart phone and can also be emailed to the patient or printed for the patient.
* **Trained users (nurses, volunteers) who perform the screening:** Consider what information you would provide to those performing the screening through (a) a handbook/manual and (b) information shown on the smartphone display after a the screening for a patient.
* **Physicians who follow up on diagnoses:** Consider what information you would provide to those seeing patients who received a diagnosis of having diabetic retinopathy from the device, with (a) a of how the screening was performed and (b) the diagnosis for the patient.
* **Healthcare providers (hospitals, social work nonprofits):** Consider what information you would provide to those making purchasing/adoption decisions for the this medical device, including (a) general information about the product and (b) examples of how screening results will be displayed.
* **Product managers:** Consider what information you would provide to the product manager who makes the decision about when the product is ready to be released, showing (a) that the product overall works well and (b) examples that the product works for individual patients.

Ensure that your explanations meet the policy requirements assigned to you on Canvas (different students may receive different policies, please do not compare before completing the assignment; they are all comparable in workload and difficulty and have exactly the same grading criteria). 

*Assume the policy was created for internal use by the company that creates the smartphone app to hold itself to high standards of responsible engineering -- management has affirmed it and it is mandatory for all projects using machine learning.*

We recommend to proceed in the following order:

1. **Stakeholder and policy understanding:** Think about the needs of the specific stakeholder and read the policy. Identify what the company wants to achieve with the internal policy. This should guide the following steps.
2. **Create explanations.** Create explanations for the stakeholder. Whenever explanations are specific to a  patient rather than about the model or product generally, show two examples of the explanation for two patients of your choice (i.e., two instances from the provided training or test data). Commit code you use to create explanations to your GitHub repository (e.g., python scripts or notebook). Provide your explanations in PDF files `explanation_a.pdf` and `explanation_b.pdf`  in the root directory of your repository, corresponding to the *(a)* and *(b)* requirement of your stakeholder above. We recommend that you create HTML files with the explanations or copy relevant images into text documents and then convert them to PDFs. For patient-specific implementation include both examples in the same pdf file.

3. **Policy compliance:** In your Gradescope submission, discuss whether your solution complies with the provided policy (note that compliance is not necessary to receive full credit for this assignment). Where possible provide evidence for compliance -- what you consider as evidence is for you to decide. If you think that your solution does not comply, explain why and either (a) outline what additional work you could do to comply or (b) explain why compliance is not possible. 

4. **Reflection:** In two separate section in your Gradescope submission reflect on your experience:
  1. *Challenges:* What was challenging in interpreting, complying, or providing evidence for the policy, if any?
  2. *Policy benefit:* Would you expect that the enforcement of the policy for this application will have a positive impact for your stakeholder (or for anybody else)?




### Hints and guidance

This assignment is intentionally open ended. We interpret explainability broadly, including technical post-hoc explanations like SHAP, local and global explanations, nontechnical textual descriptions and traditional transparency mechanisms, such as audits and model and data disclosures. We have no specific requirements about approaches or techniques to include; make a judgment about what you think is useful for the stakeholder and policy purpose.

You can explore many different explainability and transparency techniques, including the ones discussed in class and in the lab and ones you find on your own. The technique shown in the lab was intended as an illustration, it may not be appropriate for your explanations here. We recommend to rely on existing explainability tooling for nontrivial analyses rather than to develop your own. Many existing tools can generate plots that you can integrate into your explanations, but textual explanations are also perfectly acceptable. We do not care about the visual quality of the explanations, but we care about whether the explanations are meaningful to the stakeholder and the policy.

There is no single right explanation and we expect to see a very wide range of very different solutions. We are looking for a plausible solution where you argue why this solution is suitable, not any specific tool or design. We accept incomplete and inadequate solutions as long as the compliance discussion identifies the shortcomings and discusses how they could be overcome if you had more time or resources.

It will not always be obvious whether a solution complies with the policy or whether some evidence is convincing. This is an open problem in policy design. Discussing compliance and limitations is the learning goal, not getting it right. We will have an in-class discussion about these challenges after the assignment. Importantly, we encourage you to strive for compliance and require a discussion, but we will not deduct points for noncompliance or poor evidence.







## Deliverable

Submit your code, the generated PDFs files `explanation_a.pdf` and `explanation_b.pdf` to your GitHub repository.

Submit a report as a single PDF file to Gradescope that covers the following topics in clearly labeled sections (ideally each section starts on a new page):

1. **GitHub link:** Start the document with a link to your last commit on GitHub in the format https://github.com/cmu-seai/[repo]/commit/[commitid]. Make sure that the link includes the long ID of the last commit.
2. **Explanations** (2 pages max): Briefly describe what kind of explanations you included in your explanations for *(a)* and *(b)* for your stakeholder, and why. Justify why those explanations are suitable for your stakeholder and policy.
5. **Policy compliance** (open ended): Discuss whether your explanations as illustrated in your PDF files comply with the provided policy. Write this as if you were submitting a short report to a compliance/legal team in your company to convince them that your product complies and can be released.
6. **Reflection** (2 page max): Include textual answers to the two reflection prompts (challenges, policy benefits) above in two clearly separated subsections. 


Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over long and rambling ones.

## Grading

The assignment is worth 100 points. For full credit, we expect:

* [ ] 10 points: The document includes a link to a specific commit in your GitHub repository created with GitHub classroom. A list of at least 10 stakeholders is provided. All stakeholders are relevant to the product.
* [ ] 20 points: A description of the *explanations* is provided; a justification for the chosen explanation is included.
* [ ] 10 points: A PDF file `explanation_a.pdf` is included in the root directory of the linked repository that contains the description for the stakeholder covering requirement (a). The PDF corresponds to the description in the report.
* [ ] 10 points: A PDF file `explanation_b.pdf` is included in the root directory of the linked repository that contains the description for the stakeholder covering requirement (b). The PDF corresponds to the description in the report.
* [ ] 10 points: For explanations that relate to individual patients, two examples are included in the PDF files.
* [ ] 10 points: Code to generate explanations (figures etc) is included in the repository. It aligns with the description.
* [ ] 20 points: A discussion of policy compliance that makes a good faith attempt at providing evidence to demonstrate compliance or discusses additional steps needed for compliance or why compliance may not be possible.
* [ ] 10 points: A good-faith attempt at reflecting in two clearly identifiable subsections about (a) the challenges of interpreting, complying, or providing evidence for the policy and (b) the benefits of the enforcement of the policy.

