# Individual Assignment 4: Explainability

(17-445/17-645 Machine Learning in Production; 11-695 AI Engineering)

## Overview

In this assignment you will consider how to explain a model and its decisions to users and other stakeholders. You will prototype a page explaining the model and a page providing individual explanations. You will provide evidence to demonstrate compliance with regulation and reflect on the experience. It will provide the basis for an in-class discussion of different explainability strategies and policies.

Learning goals:

* Understand and distinguish the different notions of transparency, interpretability, and explainability
* Use state-of-the-art tools for model explainability to generate model and individual explanations
* Interpret regulation and provide evidence to demonstrate compliance. Reflect on the difficulty of working with provided policies.

## Research in this Course

*We are conducting academic research on explainability policies and evidence. This research will involve analyzing student work of this assignment. You will not be asked to do anything above and beyond the normal learning activities and assignments that are part of this course. You are free not to participate in this research, and your participation will have no influence on your grade for this course or your academic career at CMU. If you do not wish to participate, please send an email to Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)). Participants will not receive any compensation or extra credit. The data collected as part of this research will not include student grades. All analyses of data from participants’ coursework will be conducted after the course is over and final grades are submitted -- instructors will not know who chooses not to participate before final grades are submitted. All data will be analyzed in de-identified form and presented in the aggregate, without any personal identifiers. If you have questions pertaining to your rights as a research participant, or to report concerns to this study, please contact Nadia Nahar ([nadian@andrew.cmu.edu](mailto:nadian@andrew.cmu.edu)) or the Office of Research Integrity and Compliance at Carnegie Mellon University ([irb-review@andrew.cmu.edu](mailto:irb-review@andrew.cmu.edu); phone: 412-268-4721).*

## Tasks

In this assignment, you will work on a model for a potential medical application ([diabetic retinopathy detection with a smartphone app](https://github.com/cmu-seai/diabetic-retinopathy)) and one of six policies providing regulatory requirements, which we randomly assign (they are all comparable in workload and difficulty and have exactly the same grading criteria). You find your specific policy in the assignment text on Canvas. Create a GitHub repository with optional starter code for your work with the provided GitHub classroom link on Canvas. While we only provide the model and training/test data, assume that the model is embedded in a real-world software product as described in the repository. 

The task is to generate two forms of transparency mechanisms/explanations, discuss policy compliance, and reflect on the experience:

**Global explanations about the model or data:** Consider what external stakeholders might want to know about the product, the model, or the data (transparency). Create a HTML site that includes information about the data or model in a form that the company producing the product may disclose for transparency. This might include information about the data, about accuracy, about important features, or about fairness. We recommend but do not require automating the creation of this site.

**Individual explanations for predictions:** Identify what users or stakeholders would benefit from explanations about individual predictions and select one of them. Write code that produces an explanation for a specific prediction. Your code (e.g., a command line program or notebook) should receive the inputs for model inference and generate a prediction and corresponding explanation for a relevant stakeholder. The explanation should be presented as an HTML site -- ideally your code automatically generates HTML sites for any input (see scaffolding in the provided notebook), but you can also create the sites for two examples manually with the output of explainability tools.

**Policy compliance:** Discuss whether your solution complies with the provided policy (note that compliance is not necessary to receive full credit for this assignment). Where possible provide evidence for compliance -- what you consider as evidence is for you to decide. If you think that your solution does not comply, explain why and either (a) outline what additional work you could do to comply or (b) explain why compliance is not possible. 

**Reflection:** In two separate section reflect on your experience:

1. *Challenges:* What was challenging in interpreting, complying, or providing evidence for the policy, if any?
2. *Policy benefit:* Would you expect that the enforcement of the policy for this application will have a positive impact, and how and for whom?



### Hints and guidance

This assignment is intentionally open ended. We interpret explainability for this example broadly to include also various transparency mechanisms (e.g., model disclosure, data privacy) and interpretability.

You can explore many different explainability and transparency techniques, including the ones discussed in class and in the lab and ones you find on your own. We recommend to rely on existing explainability tooling for nontrivial analyses rather than to develop your own. Many existing tools can generate plots that you can integrate into the websites you generate, but textual explanations are also perfectly acceptable. We do not care about the visual quality of the generated sites.

There is no single right explanation and we expect to see a very wide range of very different solutions. We are looking for a plausible solution where you argue why this solution is suitable, not any specific tool or design. 

It will not always be obvious whether a solution complies with the policy or whether some evidence is convincing. This is an open problem in policy design. Discussing compliance and limitations is the learning goal, not getting it right. We will have an in-class discussion about these challenges after the assignment. Importantly, we encourage you to strive for compliance and require a discussion, but we will not deduct points for noncompliance or poor evidence.







## Deliverable

Submit your code, the generated HTML file with the global explanations, and two examples of generated HTML files with local explanations to your GitHub repository.

Submit a report as a single PDF file to Gradescope that covers the following topics in clearly labeled sections (ideally each section starts on a new page):

1. **GitHub link:** Start the document with a link to your last commit on GitHub in the format https://github.com/cmu-seai/[repo]/commit/[commitid]. Make sure that the link includes the long ID of the last commit.
1. **Stakeholders** (0.5 pages max): List at least 10 stakeholders for the product.
2. **Global explanations** (1 page max): Provide a link to the HTML file in your GitHub repository containing your global explanation. Briefly describe what kind of explanations you included and why. Identify which explanations are relevant for which stakeholder.
3. **Individual explanations** (1 page max): Provide instructions for how to use your code to generate explanations for specific inputs. Provide links to two HTML files in your GitHub repository that you have generated for example inputs. Clearly identify which stakeholder(s) your explanation is intended for. Describe how you explain the predictions and why you chose that form of explanation for this stakeholder.
4. **Policy compliance** (open ended): Discuss whether your global and individual explanations if they were integrated into the product comply with the provided policy. Provide evidence for compliance where possible either directly in this submission or as links to external artifacts in your GitHub repository.
5. **Reflection** (2 page max): Include textual answers to the two reflection prompts (challenges, policy benefits) above in two clearly separated subsections. 


Page limits are recommendations and not strictly enforced. You can exceed the page limit if there is a good reason. We prefer precise and concise answers over long and rambling ones.

## Grading

The assignment is worth 100 points. For full credit, we expect:

* [ ] 10 points: The document includes a link to a specific commit in your GitHub repository created with GitHub classroom. A list of at least 10 stakeholders is provided. All stakeholders are relevant to the product.
* [ ] 20 points: A description of the global explanations is provided; the description explains for which stakeholders each part of the explanation is relevant; a justification for the chosen explanation is included.
* [ ] 10 points: An HTML page that provides the described global explanations for the specific model or data is linked.
* [ ] 20 points: A functional implementation to automatically or semi-automatically create explanations for individual predictions is provided. 
* [ ] 10 points: Two examples of individual explanations in HTML files are linked. The examples correspond to the description.
* [ ] 10 points: A stakeholder is indicated for whom the individual explanations are intended. A description of the provided individual explanations and a plausible justification why this form of explanation is appropriate for the stakeholder identified. 
* [ ] 10 points: A discussion of policy compliance that makes a good faith attempt at providing evidence to demonstrate compliance or discusses additional steps needed for compliance or why compliance may not be possible.
* [ ] 10 points: A good-faith attempt at reflecting in two clearly identifiable subsections about (a) the challenges of interpreting, complying, or providing evidence for the policy and (b) the benefits of the enforcement of the policy.

