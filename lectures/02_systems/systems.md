---
author: Christian Kaestner
title: "MLiP: From Models to Systems"
semester: Spring 2024
footer: "Machine Learning in Production/AI Engineering • Claire Le Goues & Christian Kaestner, Carnegie Mellon University • Spring 2024"
license: Creative Commons Attribution 4.0 International (CC BY 4.0)
---  
<!-- .element: class="titleslide"  data-background="../_chapterimg/02_systems.jpg" -->
<div class="stretch"></div>

## Machine Learning in Production


# From Models to Systems

<!-- Image: https://www.pexels.com/photo/delivery-robot-on-pavement-under-trees-8566570/ -->



---

# Administrativa

* Still waiting for registrar to add another section
* Follow up on syllabus discussion:
  * When not feeling well -- please stay home and get well, and email us for accommodation
  * When using generative AI to generate responses (or email/slack messages) -- please ask it to be brief and to the point!


----

# Learning goals

* Understand how ML components are a (small or large) part of a larger system
* Explain how machine learning fits into the larger picture of building and maintaining production systems
* Define system goals and map them to goals for ML components
* Describe the typical components relating to AI in an AI-enabled system and typical design decisions to be made


----
## Required Readings

* Chapters 4 (Goals), 5 (Components), and 7 (Experiences) from the book "Building Intelligent Systems: A Guide to Machine Learning Engineering" by Hulten






---
# ML Models as Part of a System


----
## Example: Image Captioning Problem

![Image captioning one step](imgcaptioning.png)

----
## Example: Image Captioning Problem

![Image captioning with ML](imgcaptioningml.png)


----
## Why do we care about image captioning?

![Image captioning one step](imgcaptioning.png)



----
## Machine learning as (small) component in a system

[![Audit risk meter](audit-risk-meter.png)<!-- .element: style="width:100%" -->](https://ttlc.intuit.com/community/choosing-a-product/help/about-the-audit-risk-meter/00/25924)

Note: Traditional non-ML tax software, with an added ML component for audit risk estimation

----
## Machine learning as (small) component in a system

![Tax system architecture with an ML component](tax-with-ml.svg)
<!-- .element: class="plain stretch" -->


----
## Machine learning as (core) component in a system

![Screenshot of Temi transcription service](temi.png)
<!-- .element: class="stretch" -->

Note: Transcription service, where interface is all built around an ML component

----
## Machine learning as (core) component in a system


![Transcription system architecture](transcriptionarchitecture.svg)
<!-- .element: class="plain  stretch" -->



----
## Products using Object Detection?

![Object detection example](objectdetection.png)
<!-- .element: class="plain stretch" -->

----
## Products using Object Detection

![Delivery robot](deliveryrobot.jpg)
<!-- .element: class="plain stretch" -->

----
## What if Object Detection makes a Mistake?

![Delivery robot](deliveryrobot.jpg)
<!-- .element: class="plain stretch" -->

----
## Products using Object Detection

![Image Search on Google Photos](imagesearch.png)
<!-- .element: class="plain stretch" -->


----
## What if Object Detection makes a Mistake?

![Image Search on Google Photos](imagesearch.png)
<!-- .element: class="plain stretch" -->


----
## Products using Image Synthesis?

![Dall-e generated example of chairs in the form of an avocado](dall-e.png)
<!-- .element: class="plain stretch" -->

<!-- references_ -->
From https://openai.com/blog/dall-e/

----
## Products using ... a Juggling Robot?

<iframe width="100%" height="600" src="https://www.youtube.com/embed/9asDO_1A27U?start=24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


----
## Many more examples of ML in products:

<div class="small">

* Product recommendations on Amazon
* Surge price calculation for Uber
* Inventory planning in Walmart
* Search for new oil fields by Shell
* Adaptive cruise control in a car
* Smart app suggestion in Android
* Fashion trends prediction with social media data
* Suggesting whom to talk to in a presidential campain
* Tracking and predicting infections in a pandemic
* Adaptively reacting to network issues by a cell phone provider
* Matching players in a computer game by skill
* ...
* 
* Some for end users, some for employees, some for expert users
* Big and small components of a larger system
* More or less non-ML code around the model

</div>

---
# Model-Centric vs 
# System-Wide Focus

----
## Traditional Model Focus (Data Science)

![](pipeline.svg)
<!-- .element: class="plain" -->

Focus: building models from given data, evaluating accuracy


----
## Automating Pipelines and MLOps (ML Engineering)

![](pipeline2.svg)
<!-- .element: class="plain" -->

Focus: experimenting, deploying, scaling training and serving, model monitoring and updating

----
## MLOps Infrastructure

![](mlopsboxes.png)<!-- .element: class="plain"  style="width:100%"-->

<!-- references -->
From: Sculley, David, et al. "Hidden technical debt in machine learning systems." NIPS 28 (2015).

Note: Figure from Google’s 2015 technical debt paper, indicating that the amount of code for actual model training is comparably small compared to lots of infrastructure code needed to automate model training, serving, and monitoring. These days, much of this infrastructure is readily available through competing MLOps tools (e.g., serving infrastructure, feature stores, cloud resource management, monitoring).

----
## ML-Enabled Systems (ML in Production)

![](pipeline-in-system.svg)<!-- .element: class="plain" style="width:90%" -->

Interaction of ML and non-ML components, system requirements, user interactions, safety, collaboration, delivering products



---
# Model vs System Goals

<!-- twitter https://twitter.com/Fra_Pochetti/status/1502708228173578240?t=dNbEpulbras763WHt-QZvg&s=03 -->

----
## Case Study: Self-help legal chatbot

![Website](lawchat.png)
<!-- .element: class="stretch" -->


<!-- references_ -->

Based on the excellent paper: Passi, S., & Sengers, P. (2020). [Making data science systems work](https://journals.sagepub.com/doi/full/10.1177/2053951720939605). Big Data & Society, 7(2).

Note: Screenshots for illustration purposes, not the actual system studied

----
## Case Study: Self-help legal chatbot

![Website](lawchat2.png)
<!-- .element: class="stretch" -->



----
## Previous System: Guided Chat

![Baseline: Guided chat](guidedchat.png)
<!-- .element: class="stretch" -->

<!-- references_ -->
Image source: https://www.streamcreative.com/chatbot-scripts-examples-templates

----
## Problems with Guided Chats

<!-- colstart -->
<div class="smallish">

Non-AI guided chat was too limited
* Cannot enumerate problems
* Hard to match against open entries ("I want to file for bankruptcy" vs "I have no money")

Involving human operators very expensive 

Old-fashioned

</div>

<!-- col -->
![Baseline: Guided chat](guidedchat.png)

<!-- colend -->

----
## Initial Goal: Better Chatbot

Help users with simple task

Connect them with lawyers when needed

Modernize appearence; "future of digital marketing"

----
## Buy or Build?

[![Botsify website](botsify.png)](https://botsify.com/)
<!-- .element: class="stretch" -->

Note: One of many commercial frameworks for building AI chatbots

----
## Data scientists' challenges

<div class="smallish">


**Infrastructure:** Understand chat bot infrastructure and its capabilities

**Knowing topics:** Identify what users talk about, train/test concepts with past chat logs
  * "*We fed VocabX a line deliberately trying to confuse it. We wrote, ‘I am thinking about chapter 13 in Boston divorce filing.’ VocabX figured out the two topics: (1) business and industrial/company/bankruptcy (2) society/social institution/divorce.*"

**Guiding conversations:** Supporting open-ended conversations requires detecting what's on topic and finding a good response; intent-topic modeling
  * *Is talk about parents and children on topic when discussing divorce?*
  * Data gathering/labeling very challenging -- too many corner cases

</div>

----
## Stepping Back: What are the goals of the system?

<!-- discussion -->

----
## Status meeting with (inhouse) Customer

<div class="small">

The chatbot performed better than before but was far from ready for deployment. There were “too many edge cases” in which conversations did not go as planned. 

> **Customer:** "Maybe we need to think about it like an 80/20 rule. In some cases, it works well, but for some, it is harder. 80% everything is fine, and in the remaining 20%, we try to do our best."
>
> **Data science lead:** The trouble is how to automatically recognize what is 80 and what is 20.
>
> **Data scientist:** It is harder than it sounds. One of the models is a matching model trained on pairs of legal questions and answers. 60,000 of them. It seems large but is small for ML.
>
> **Customer:** That’s a lot. Can it answer a question about say visa renewal?
>
> **Data scientist:** If there exists a question like that in training data, then yes. But with just 60,000, the model can easily overfit, and then for anything outside, it would just fail.
>
> **Customer:** I see what you are saying. Edge cases are interesting from an academic perspective, but for a business the first and foremost thing is value. You are trying to solve an interesting problem. I get it. But I feel that you may have already solved it enough to gain business value.

</div>


Note: Adapted from Passi, S., & Sengers, P. (2020). [Making data science systems work](https://journals.sagepub.com/doi/full/10.1177/2053951720939605). Big Data & Society, 7(2).

----
## System Goal for Chatbot


* Collect user data to sell to lawyers
* Signal technical competency to lawyers
* Acceptable to fail: Too complicated for self-help, connect with lawyer
* Solving edge cases not important

> "Edge cases are important, but the end goal is user information, monetizing user data. We are building a legal self-help chatbot, but a major business use case is to tell people: ‘here, talk to this lawyer.’ We do want to connect them with a lawyer. Even for 20%, when our bot fails, we tell users that the problem cannot be done through self-help. Let us get you a lawyer, right? That is what we wanted in the first place."
<!-- .element: class="smallish" -->


Note: See
Passi, S., & Sengers, P. (2020). [Making data science systems work](https://journals.sagepub.com/doi/full/10.1177/2053951720939605). Big Data & Society, 7(2). 

----
## Model vs System Goal?

![Image captioning one step](imgcaptioning.png)

----
## Model vs System Goal?

[![Audit risk meter](audit-risk-meter.png)<!-- .element: style="width:100%" -->](https://ttlc.intuit.com/community/choosing-a-product/help/about-the-audit-risk-meter/00/25924)

----
## Model vs System Goal?

![Screenshot of Temi transcription service](temi.png)
<!-- .element: class="stretch" -->

----
## Model vs System Goal?

![Object detection example](objectdetection.png)
<!-- .element: class="plain stretch" -->


----
## Model vs System Goal?

![Image Search on Google Photos](imagesearch.png)
<!-- .element: class="plain stretch" -->


----
## Model vs System Goal?

![Dall-e generated example of chairs in the form of an avocado](dall-e.png)
<!-- .element: class="plain stretch" -->

----
## Model vs System Goal?

<iframe width="100%" height="600" src="https://www.youtube.com/embed/9asDO_1A27U?start=24" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


----
## Model vs System Goal?

![Model and system goals not aligning at booking.com](bookingcom2.png)
<!-- .element: class="stretch" -->


----
## More Accurate Predictions may not be THAT Important

* "Good enough" may be good enough
* Prediction critical for system success or just an gimmick? 
* Better predictions may come at excessive costs 
    - need way more data, much longer training times
    - privacy concerns
* Better user interface ("experience") may mitigate many problems
    - e.g. explain decisions to users
* Use only high-confidence predictions?





----
## Machine learning that matters

<div class="smallish">

* 2012(!) essay lamenting focus on algorithmic improvements and benchmarks
  - focus on standard benchmark sets, not engaging with problem: Iris classification, digit recognition, ...
  - focus on abstract metrics, not measuring real-world impact: accuracy, ROC
  - distant from real-world concerns
  - lack of follow-through, no deployment, no impact
* Failure to *reproduce* and *productionize* paper contributions common
* Ignoring design choices in how to collect data, what problem to solve, how to design human-AI interface, measuring impact, ...
* *Argues: Should focus on making impact -- requires building systems*

</div>

<!-- references -->

Wagstaff, Kiri. "Machine learning that matters." In Proceedings of the 29 th International Conference on Machine Learning, (2012).




---
# On Terminology
<div class="smallish">

* There is no standard term for referring to building systems with AI components
* **ML-Enabled Systems**, *Production ML Systems*, *AI-Enabled Systems*,  or *ML-Infused Systems*; *SE4AI*, *SE4ML*
* sometimes **AI Engineering** / **ML Engineering** -- but usually used with a ML-pipeline focus
* **MLOps** ~ technical infrastructure automating ML pipelines
* sometimes **ML Systems Engineering** -- but often this refers to building distributed and scalable ML and data storage platforms
* "AIOps" ~ using AI to make automated decisions in operations; "DataOps" ~ use of agile methods and automation in business data analytics
* My preference: **Software Products with Machine-Learning Components**

</div>

![Random letters](../_assets/onterminology.jpg)<!-- .element: class="cornerimg" -->








---
# Setting and Untangling Goals



----
## Step 1 of Requirements...

![Overview of course content](../_assets/overview.svg)
<!-- .element: class="plain stretch" -->




Start understanding the **requirements** of the system and its components



----
## Layers of Success Measures

<!-- colstart -->

<div class="small">

* **Organizational objectives:** Innate/overall goals of the organization
* **System goals:** Goals of the software system/product/feature to be built
* **User outcomes:** How well the system is serving its users, from the user's perspective
* **Model properties:** Quality of the model used in a system, from the model's perspective
*
* **Leading indicators:** Short-term proxies for long-term measures, typically for organizational objectives

*Ideally, these goals should be aligned with each other*

</div>

<!-- col -->

![Goal relationships](goal-relationships.svg)
<!-- .element: class="plain" -->

<!-- colend -->




----
## Organizational Goals

<div class="smallish">

*Innate/overall goals of the organization*

* Business
    * Current/future revenue, profit
    * Reduce business risks
* Non-Profits
    - Lives saved, animal welfare increased, CO2 reduced, fires averted
    - Social justice improved, well-being elevated, fairness improved
* Often not directly measurable from system output; slow indicators

**Implication: Accurate ML models themselves are not the ultimate goal!**

**ML may only indirectly influence such organizational
  objectives; influence is often hard to quantify; lagging measures**

</div>

----
## Leading Indicators

<div class="smallish">

*Short-term proxies for long-term measures*

Typically measures correlating with future success, from the business perspective




Examples: 
* Customers sentiment: Do they like the product? (e.g., surveys, ratings)
* Customer engagement: How often do they use the product?
  * Regular use, time spent on site, messages posted
  * Growing user numbers, recommendations

Caveats
  * Often indirect, proxy measures
  * Can be misleading (e.g., more daily active users => higher profits?)

</div>

----
## System/Feature Goals

*Concrete outputs the system (or a feature of the system) should produce*

Relates to system requirements

Examples:
* Detect cancer in radiology scans
* Provide and recommend music to stream
* Make personalized music recommendations
* Transcribe audio files
* Provide legal help with a self-service chatbot




----
## User Goals

*How well the system is serving its users, from the user's perspective*

Examples: 
  * Users choosing recommended items and enjoying them
  * Users making better decisions
  * Users saving time thanks to the system
  * Users achieving their goals

Easier and more granular to measure, but possibly only indirect relation to organization/system objectives


----
## Model Goals

*Quality of the model used in a system, from the model's perspective*

* Model accuracy
* Rate and kinds of mistakes
* Successful user interactions
* Inference time
* Training cost

**Often not directly linked to organizational/system/user goals**



----
## Success Measures in the Transcription Scenario?

<!-- colstart -->

![Transcription service screenshot](temi.png)<!-- .element: style="width:60%" -->

Organizational goals? Leading indicators? System goals? User goals? Model goals?

<!-- col -->

![Goal relationships](goal-relationships.svg)
<!-- .element: class="plain" -->

<!-- colend -->

----
## Success Measures in the Audit Risk Scenario?

<!-- colstart -->

[![Audit risk meter](audit-risk-meter.png)<!-- .element: style="width:80%" -->](https://ttlc.intuit.com/community/choosing-a-product/help/about-the-audit-risk-meter/00/25924)

Organizational goals? Leading indicators? System goals? User goals? Model goals?

<!-- col -->

![Goal relationships](goal-relationships.svg)
<!-- .element: class="plain" -->

<!-- colend -->

----
## Breakout: Automating Admission Decisions

What are different types of goals behind automating admissions decisions to a Master's program?

As a group post answer to `#lecture` tagging all group members using template:
> Organizational goals: ...<br />
> Leading indicators: ...<br />
> System goals: ...<br />
> User goals: ...<br />
> Model goals: ...<br />

----
## Academic Integrity Issue

* Please do not cover for people not participating in discussion
* Easy to detect discrepancy between # answers and # people in classroom 
* Please let's not have to have unpleasant meetings.


----
## Breakout: Automating Admission Decisions

What are different types of goals behind automating admissions decisions to a Master's program?

As a group post answer to `#lecture` tagging all group members using template:
> Organizational goals: ...<br />
> Leading indicators: ...<br />
> System goals: ...<br />
> User goals: ...<br />
> Model goals: ...<br />











---
# Systems Thinking

![](system.svg)
<!-- .element: class="plain" -->


----
## Repeat: Machine learning as component in a system

![Transcription system architecture](transcriptionarchitecture.svg)
<!-- .element: class="plain stretch" -->



----
## The System Interacts with Users

[![Audit risk meter](audit-risk-meter.png)<!-- .element: style="width:100%" -->](https://ttlc.intuit.com/community/choosing-a-product/help/about-the-audit-risk-meter/00/25924)

Note: Audit risk meter from Turbo-Tax

----
## The System Interacts with the World

![Smart Toaster](toaster.jpg)<!-- .element: style="width:65%" -->


----
## The System Interacts with the World

![Crime Map](crime-map.jpg)

* Model: Use historical data to predict crime rates by neighborhoods
* Used for predictive policing: Decide where to allocate police patrol

----
## User Interaction Design

Often: System interact with the world through *by influencing people* ("human in the loop")


**Automate**: Take action on user's behalf

**Prompt**: Ask the user if an action should be taken 

**Organize/Annotate/Augment**: Add information to a display 

Hybrids of these


----
## Factors to Consider (from Reading)


**Forcefulness**: How strongly to encourage taking an action (or even automate it)?

**Frequency**: How often to interact with the user?

**Value**: How much does a user (think to) benefit from the prediction?

**Cost**: What is the damage of a wrong prediction?





----
## Discussion: Safe Browsing


<!-- colstart -->


![Safe browsing warning](warning.png)



<!-- col -->


(1) How do we present the intelligence to the user?

(2) Justify in terms of system goals, forcefulness, frequency, value of correct and cost of wrong predictions

<!-- colend -->


Notes:
Devices for older adults to detect falls and alert caretaker or emergency responders automatically or after interaction. Uses various inputs to detect falls.
Read more: [How fall detection is moving beyond the pendant](https://www.mobihealthnews.com/content/how-fall-detection-moving-beyond-pendant), MobiHealthNews, 2019


----
## Collecting Feedback

![Safe Browsing Feedback](safe-browsing-feedback.png)





----
## Feedback Loops


![Feedback loop with data creating model, creating decisions, creating data](feedbackloop.svg)
<!-- .element: class="plain stretch" -->


----
## The System Interacts with the World
![Predictive policing](predictive-policing.png)

----
## ML Predictions have Consequences

Assistance, productivity, creativity

Manipulation, polarization, discrimination

Feedback loops


➤ Need for **responsible engineering**

----
## Safety is a System Property

* Code/models are not unsafe, cannot harm people
* Systems can interact with the environment in ways that are unsafe

![Smart Toaster](toaster.jpg)

----
## Safety Assurance in/outside the Model

*Goal: Ensure smart toaster does not burn the kitchen*

<!-- discussion -->

----
## Safety Assurance in/outside the Model

<!-- colstart -->
<div class="smallish">

In the model
  - Ensure maximum toasting time
  - Use heat sensor and past outputs for prediction
  - Hard to make guarantees

Outside the model (e.g., "guardrails")
  - Simple code check for max toasting time
  - Non-ML rule to shut down if too hot
  - Hardware solution: thermal fuse

</div>

<!-- col -->

![Thermal fuse](thermalfuse.png)
(Image CC BY-SA 4.0, C J Cowie)
<!-- .element: class="small" -->
<!-- colend -->

----
## Model vs System Properties

Similar to safety, many other qualities should be discussed at model **and** system level
  - Fairness
  - Security
  - Privacy
  - Transparency, accountability
  - Maintainability
  - Scalability, energy consumption
  - Impact on system goals
  - ...




----
## Thinking about Systems

<div class="smallish">


* Holistic approach, looking at the larger picture, involving all stakeholders
* Looking at relationships and interactions among components and environments
    - Everything is interconnected
    - Combining parts creates something new with emergent behavior
    - Understand dynamics, be aware of feedback loops, actions have effects
* Understand how humans interact with the system

> A system is a set of inter-related components that work together in a particular environment to perform whatever functions are required to achieve the system's objective -- Donella Meadows

</div>

<!-- references_ -->
Leyla Acaroglu. "[Tools for Systems Thinkers: The 6 Fundamental Concepts of Systems Thinking](https://medium.com/disruptive-design/tools-for-systems-thinkers-the-6-fundamental-concepts-of-systems-thinking-379cdac3dc6a)." Blogpost 2017

----
## System-Level Challenges for AI-Enabled Systems

* Getting and updating data, concept drift, changing requirements
* Handling massive amounts of data
* Interactions with the real world, feedback loops
* Lack of modularity, lack of specifications, nonlocal effects
* Deployment and maintenance
* Versioning, debugging and incremental improvement
* Keeping training and operating cost manageable
* Interdisciplinary teams
* Setting system goals, balancing stakeholders and requirements
* ...















---

# Operating Production ML Systems

(deployment, updates)

----
## Things change...


<!-- colstart -->


Newer better models released (better model architectures, more training data, ...)

Goals and scope change (more domains, handling dialects, ...)

The world changes (new products, names, slang, ...)

Online experimentation



<!-- col -->

![Architecture diagram of transcription service; many components, not just ML](transcriptionarchitecture.svg)
<!-- .element: class="plain" -->


<!-- colend -->
----
## Things change...





*Reasons for change in audit risk prediction model?*
![Audit prediction](audit-risk-meter.png)<!-- .element: style="width:100%" -->



----
## Monitoring in Production

Design for telemetry

<!-- colstart -->
![Safe Browsing Feedback](safe-browsing-feedback.png)
<!-- col -->
![Safe Browsing Statistics](safe-browsing-stats.png)
<!-- colend -->


----
## Monitoring in Production



*What and how to monitor in audit risk prediction?*
![Audit prediction](audit-risk-meter.png)<!-- .element: style="width:100%" -->


----
## Pipeline Thinking


![Pipeline](pipeline2.svg)
<!-- .element: class="plain" -->



----
## Design with Pipeline and Monitoring

![Architecture diagram of transcription service; many components, not just ML](transcriptionarchitecture2.svg)
<!-- .element: class="plain stretch" -->

----
## Pipelines Thinking is Challenging

<div class="smallish">

In enterprise ML teams:
* Data scientists often focus on modeling in local environment, model-centric workflow
* Rarely robust infrastructure, often monolithic and tangled
* Challenges in deploying systems and integration with monitoring, streams etc

Shifting to pipeline-centric workflow challenging
* Requires writing robust programs, slower, less exploratory
* Standardized, modular infrastructure 
* Big conceptual leap, major hurdle to adoption

</div>

<!-- references -->

O'Leary, Katie, and Makoto Uchida. "[Common problems with Creating Machine Learning Pipelines from Existing Code](https://research.google/pubs/pub48984.pdf)." Proc. Third Conference on Machine Learning and Systems (MLSys) (2020).






































---
# Summary

Production AI-enabled systems require a *whole system perspective*, beyond just the model or the pipeline

Distinguish goals: organization, system, user, model goals

Quality at a *system* level: safety beyond the model, beyond accuracy

Large design space for user interface (intelligent experience): forcefulness, frequency, telemetry

Plan for operations (telemetry, updates)



---
# Recommended Readings

<div class="smaller">


* 🗎 Passi, S., & Sengers, P. (2020). [Making data science systems work](https://journals.sagepub.com/doi/full/10.1177/2053951720939605). Big Data & Society, 7(2).
* 🗎 Wagstaff, Kiri. "[Machine learning that matters](https://arxiv.org/abs/1206.4656)." In Proceedings of the 29th International Conference on Machine Learning, (2012).
* 🗎 Sculley, David, Gary Holt, Daniel Golovin, Eugene Davydov, Todd Phillips, Dietmar Ebner, Vinay Chaudhary, Michael Young, Jean-Francois Crespo, and Dan Dennison. "[Hidden technical debt in machine learning systems](http://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf)." In Advances in neural information processing systems, pp. 2503-2511. 2015.
* 🗎 O'Leary, Katie, and Makoto Uchida. "[Common problems with Creating Machine Learning Pipelines from Existing Code](https://research.google/pubs/pub48984.pdf)." Proc. Third Conference on Machine Learning and Systems (MLSys) (2020).
* 🗎 Nushi, Besmira, Ece Kamar, Eric Horvitz, and Donald Kossmann. "[On human intellect and machine failures: troubleshooting integrative machine learning systems](http://erichorvitz.com/human_repair_AI_pipeline.pdf)." In *Proceedings of the Thirty-First AAAI Conference on Artificial Intelligence*, pp. 1017-1025. 2017.
* 🗎 Nahar, Nadia, Shurui Zhou, Grace Lewis, and Christian Kästner. “[Collaboration Challenges in Building ML-Enabled Systems: Communication, Documentation, Engineering, and Process](https://arxiv.org/abs/2110.10234).” In Proceedings of the 44th International Conference on Software Engineering (ICSE), May 2022.
* 🗎 Yang, Qian. "[The role of design in creating machine-learning-enhanced user experience](https://www.aaai.org/ocs/index.php/SSS/SSS17/paper/viewPaper/15363)." In 2017 AAAI Spring Symposium Series. 2017.
* 🗎 Sambasivan, Nithya, Shivani Kapania, Hannah Highfill, Diana Akrong, Praveen Paritosh, and Lora M. Aroyo. "[“Everyone wants to do the model work, not the data work”: Data Cascades in High-Stakes AI](https://research.google/pubs/pub49953/)". In proceedings of the 2021 CHI Conference on Human Factors in Computing Systems, pp. 1-15. 2021.
* 🗎 Bernardi, Lucas, Themistoklis Mavridis, and Pablo Estevez. “150 successful machine learning models: 6 lessons learned at Booking.com.” In Proceedings of the 25th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining, pp. 1743–1751. 2019.

</div>