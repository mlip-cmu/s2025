---
author: Christian Kaestner and Claire Le Goues
title: "MLiP: Improving Fairness"
semester: Spring 2024
footer: "Machine Learning in Production/AI Engineering • Christian Kaestner & Claire Le Goues, Carnegie Mellon University • Spring 2024"
license: Creative Commons Attribution 4.0 International (CC BY 4.0)
---
<!-- .element: class="titleslide"  data-background="../_chapterimg/17_fairnessgame.jpg" -->
<div class="stretch"></div>

## Machine Learning in Production


# Building Fair Products


---
## From Fairness Concepts to Fair Products

![Overview of course content](../_assets/overview.svg)
<!-- .element: class="plain stretch" -->



----
## Reading

Required reading: 
* Holstein, Kenneth, Jennifer Wortman Vaughan, Hal
Daumé III, Miro Dudik, and Hanna
Wallach. "[Improving fairness in machine learning systems: What do industry practitioners need?](http://users.umiacs.umd.edu/~hal/docs/daume19fairness.pdf)"
In Proceedings of the 2019 CHI Conference on Human Factors in
Computing Systems, pp. 1-16. 2019. 

Recommended reading:
* 🗎 Metcalf, Jacob, and Emanuel Moss. "[Owning ethics: Corporate logics, silicon valley, and the institutionalization of ethics](https://datasociety.net/wp-content/uploads/2019/09/Owning-Ethics-PDF-version-2.pdf)." *Social Research: An International Quarterly* 86, no. 2 (2019): 449-476.

----
## Learning Goals

* Understand the role of requirements engineering in selecting ML
fairness criteria
* Understand the process of constructing datasets for fairness
* Document models and datasets to communicate fairness concerns
* Consider the potential impact of feedback loops on AI-based systems
  and need for continuous monitoring
* Consider achieving fairness in AI-based systems as an activity throughout the entire development cycle

---
## Today: Fairness as a System Quality

Fairness can be measured for a model

... but we really care whether the system, as it interacts with the environment, is fair/safe/secure

... does the system cause harm?

![System thinking](component.svg)
<!-- .element: class="plain stretch" -->

----
## Fair ML Pipeline Process

Fairness must be considered throughout the entire lifecycle!

![](fairness-lifecycle.jpg)
<!-- .element: class="stretch" -->

<!-- references_ -->

_Fairness-aware Machine Learning_, Bennett et al., WSDM Tutorial (2019).


----
## Fairness Problems are System-Wide Challenges

* **Requirements engineering challenges:** How to identify fairness concerns, fairness metric, design data collection and labeling
* **Human-computer-interaction design challenges:** How to present results to users, fairly collect data from users, design mitigations
* **Quality assurance challenges:** Evaluate the entire system for fairness, continuously assure in production
* **Process integration challenges:** Incorprorate fairness work in development process
* **Education and documentation challenges:** Create awareness, foster interdisciplinary collaboration


---
# Understanding System-Level Goals for Fairness

i.e., Requirements engineering


----

## Recall: Fairness metrics

* Anti-classification (fairness through blindness)
* Group fairness (independence)
* Equalized odds (separation)
* ...and numerous others and variations!

**But which one makes most sense for my product?**

----
## Recall Breakout: Cancer Prognosis

![](cancer-stats.png)

* Does the model meet anti-classification fairness? _Can't tell_
* Does the model meet group fairness? _Sure_
   * P[cancer, M] = 0.023, P[cancer, F] = 0.026
* Does the model meet equalized odds? _No_
   * FPR, M = 0.023, F = 0.026
   * FNR, M = 0.64,  F = 0.133 
* Is the model fair enough to use?  How can we decide?

Notes:
prob cancer male vs female

----
## Identifying Fairness Goals is a Requirements Engineering Problem

<div class="smallish">

* What is the goal of the system? What benefits does it provide and to
  whom?
  <!-- .element: class="fragment" -->
* Who are the stakeholders of the system? What are the stakeholders’ views or expectations on fairness and where do they conflict? Are we trying to achieve fairness based on equality or equity? 
<!-- .element: class="fragment" -->
* What subpopulations (including minority groups) may be using or be affected by the system? What types of harms can the system cause with discrimination?
<!-- .element: class="fragment" -->
* Does fairness undermine any other goals of the system (e.g., accuracy, profits, time to release)?
<!-- .element: class="fragment" -->
* Are there legal anti-discrimination requirements to consider? Are
  there societal expectations about ethics w.r.t. to this product? What is the activist position?
<!-- .element: class="fragment" -->
* ...
<!-- .element: class="fragment" -->

</div>


----
## 1. Identify Protected Attributes

Against which groups might we discriminate? What attributes identify them directly or indirectly?

Requires understanding of target population and subpopulations

Use anti-discrimination law as starting point, but do not end there
* Socio-economic status? Body height? Weight? Hair style? Eye color? Sports team preferences?
* Protected attributes for non-humans? Animals, inanimate objects?

Involve stakeholders, consult lawyers, read research, ask experts, ...


----
## Protected attributes are not always obvious

![ATM](atm.gif)
<!-- .element: class="stretch" -->

**Q. Other examples?**

----
## 2. Analyze Potential Harms

Anticipate harms from unfair decisions
* Harms of allocation, harms of representation?
* How do biased model predictions contribute to system behavior?

Consider how automation can amplify harm

Overcome blind spots within teams
* Systematically consider consequences of bias
* Consider safety engineering techniques (e.g., FTA)
* Assemble diverse teams, use personas, crowdsource audits


----
## Example: Judgment Call Game

<!-- colstart -->

Card "Game" by Microsoft Research

Participants write "Product reviews" from different perspectives
* encourage thinking about consequences
* enforce persona-like role taking

<!-- col -->

![Photo of Judgment Call Game cards](../_chapterimg/17_fairnessgame.jpg)
<!-- .element: class="stretch" -->

<!-- colend -->

----
## Example: Judgment Call Game

<!-- colstart -->
![user-review1](user-review1.png)

<!-- col -->
![user-review2](user-review2.png)
<!-- .element: class="stretch" -->

<!-- colend -->

<!--references_-->
[Judgment Call the Game: Using Value Sensitive Design and Design
Fiction to Surface Ethical Concerns Related to Technology](https://dl.acm.org/doi/10.1145/3322276.3323697)

----
## 3. Negotiate Fairness Goals/Measures

* Negotiate with stakeholders to determine fairness requirement for
the product: What is the suitable notion of fairness for the
product? Equality or equity?
* Map the requirements to model-level  (model) specifications: Anti-classification? Group fairness? Equalized odds? 
* Negotiation can be challenging! 
  * Conflicts with other system goals (accuracy, profits...) 
  * Conflicts among different beliefs, values, political views, etc., 

----
## Intuitive Justice: Research on what people perceive as fair (psychology)

<div class="smallish">

When rewards depend on inputs and participants can chose contributions: Most people find it fair to split rewards proportional to inputs
* *Which fairness measure does this relate to?*

Most people agree that for a decision to be fair, personal characteristics that do not influence the reward, such as gender or age, should not be considered when dividing the rewards. 
* *Which fairness measure does this relate to?*

Complexity: Individual and group differences not always clearly attributable, unequal starting positions

</div>

----
## Dealing with unequal starting positions

<div class="smallish">

Equality (minimize disparate treatment):
* Treat everybody equally, regardless of starting position
* Focus on meritocracy, strive for fair opportunities
* Equalized-odds-style fairness; equality of opportunity

Equity (minimize disparate impact):
* Lift disadvantaged group, affirmative action
* Strive for similar outcomes (distributive justice)
* Group-fairness-style fairness; equality of outcomes

Each rooted in long history of law/philosophy, and typically incompatable. 
Problem and goal dependent

</div>

----
## One heuristic: Punitive vs Assistive Decisions

* If the decision is **punitive** in nature:
  * Harm is caused when a group is given an unwarranted penalty
  * e.g. decide whom to deny bail based on risk of recidivism
  * Heuristic: Use a fairness metric (equalized odds) based on false positive rates
* If the decision is **assistive** in nature:
  * Harm is caused when a group in need is denied assistance
  * e.g., decide who should receive a loan or a food subsidy
  * Heuristic: Use a fairness metric based on false negative rates

----
## Fairness Tree

![](fairness_tree.png)
<!-- .element: class="stretch" -->

<!-- references_ -->

Ian Foster, Rayid Ghani, Ron S. Jarmin, Frauke Kreuter and Julia Lane. [Big Data and Social Science: Data Science Methods and Tools for Research and Practice](https://textbook.coleridgeinitiative.org/). Chapter 11, 2nd ed, 2020


----
## Trade-offs in Fairness vs Accuracy

<!-- colstart -->

![](fairness-accuracy.jpeg)
<!-- .element: class="stretch" -->


<!-- col -->

Fairness imposes constraints, limits what models can be learned

**But:** Arguably, unfair predictions are not desirable!

Determine how much compromise in accuracy or fairness is acceptable to
  your stakeholders

<!-- colend -->

<!-- references_ -->

[Fairness Constraints: Mechanisms for Fair Classification.](https://proceedings.mlr.press/v54/zafar17a.html) Zafar et
al. (AISTATS 2017).

----
## Fairness, Accuracy, and Profits

![](loanprofit.png)
<!-- .element: class="stretch" -->

<!-- references_ -->
Interactive visualization: https://research.google.com/bigpicture/attacking-discrimination-in-ml/

----
## Fairness, Accuracy, and Profits

Fairness can conflict with accuracy goals

Fairness can conflict with organizational goals (profits, usability)

Fairer products may attract more customers

Unfair products may receive bad press, reputation damage

Improving fairness through better data can benefit everybody



----
## Discussion: Fairness Goal for Mortgage Applications?

<!-- discussion -->

----
## Discussion: Fairness Goal for Mortgage Applications?

Disparate impact considerations seem to prevail -- group fairness 

Need to justify strong differences in outcomes

Can also sue over disparate treatment if bank indicates that protected attribute was reason for decision

<!-- ---- -->
<!-- ## Discussion: Fairness Goal for Cancer Prognosis? -->

<!-- ![](mri.jpg) -->
<!-- <\!-- .element: class="stretch" -\-> -->

<!-- * What kind of harm can be caused?  -->
<!-- * Fairness goal: Equality or equity? -->
<!-- * Model: Anti-classification, group fairness, or equalized odds (with FPR/FNR)? -->

----
## Fairness Goal for College Admission?

![](college-admission.jpg)
<!-- .element: class="stretch" -->


In practice, legally, in the US, most forms of group fairness are likely illegal.

In practice: Anti-classification


----
## Breakout: Fairness Goal for Hiring Decisions?

![](hiring.png)
<!-- .element: class="stretch" -->

Post as a group in #lecture: 
* What kind of harm can be caused? 
* Fairness goal: Equality or equity?
* Model: Anti-classification, group fairness, or equalized odds (with FPR/FNR)?

----
## Law: "Four-fifth rule" (or "80% rule")


* Group fairness with a threshold: $\frac{P[R = 1 | A = a]}{P[R = 1 | A = b]} \geq 0.8$
* Selection rate for a protected group (e.g., $A = a$) <
80% of highest rate => selection procedure considered as having "adverse
impact"
* Guideline adopted by Federal agencies (Department of Justice, Equal
Employment Opportunity Commission, etc.,) in 1978
* If violated, must justify business necessity (i.e., the selection procedure is
essential to the safe & efficient operation)
* Example: Hiring 50% of male applicants vs 20% female applicants hired
  (0.2/0.5 = 0.4) -- Is there a business justification for hiring men at a higher rate?

Notes: skip me

----
## Recidivism Revisited

![](recidivism-propublica.png)
<!-- .element: class="stretch" -->

* COMPAS system, developed by Northpointe: Used by judges in
  sentencing decisions across multiple states (incl. PA)
</div>

<!-- references_ -->

[ProPublica article](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing)


----
## Which fairness definition?

![](compas-metrics.png)
<!-- .element: class="stretch" -->

* ProPublica: COMPAS violates equalized odds w/ FPR & FNR
* Northpointe: COMPAS is fair because it has similar FDRs
  * FDR = FP / (FP + TP) = 1 - Precision; FPR = FP / (FP + TN)
* __Q. Which measure is appropriate in this context?__

<!-- references_ -->
[Figure from Big Data and Social Science, Ch. 11](https://textbook.coleridgeinitiative.org/chap-bias.html#ref-angwin2016b)
A. Chouldechova [Fair prediction with disparate impact: A study of bias in recidivism prediction instruments](https://arxiv.org/pdf/1703.00056.pdf)

---
# Dataset Construction for Fairness

<!-- ![](fairness-accuracy.jpeg) -->
![](bongo.gif)

* Instead of just focusing on building a "fair"' model, can we understand &
  address the root causes of bias?
  
<!-- references_ -->


----
## Flexibility in Data Collection

* Data science education often assumes data as given
* In industry, we often have control over data collection and curation (65%)
* Most address fairness issues by collecting more data (73%)
  * Carefully review data collection procedures, sampling bias, how
  trustworthy labels are
  * **Often high-leverage point to improve fairness!**


<!-- references -->

[Challenges of incorporating algorithmic fairness into practice](https://www.youtube.com/watch?v=UicKZv93SOY),
FAT* Tutorial, 2019  ([slides](https://bit.ly/2UaOmTG))

----
## Data Bias

![](data-bias-stage.png)
<!-- .element: class="stretch" -->

* Bias can be introduced at any stage of the data pipeline!

<!-- references_ -->

Bennett et al., [Fairness-aware Machine Learning](https://sites.google.com/view/wsdm19-fairness-tutorial), WSDM Tutorial (2019).


----
## Types of Data Bias

* __Population bias__
* Historical bias
* __Behavioral bias__
* Content production bias
* Linking bias
* Temporal bias

<!-- references -->

_Social Data: Biases, Methodological Pitfalls, and Ethical
Boundaries_, Olteanu et al., Frontiers in Big Data (2016).

----
## Population Bias

![](facial-dataset.png)
<!-- .element: class="stretch" -->

* Differences in demographics between dataset vs target population
* May result in degraded services for certain groups 

<!-- references_ -->
Merler, Ratha, Feris, and Smith. [Diversity in Faces](https://arxiv.org/abs/1901.10436)

----
## Behavioral Bias

![](freelancing.png)
<!-- .element: class="stretch" -->

* Differences in user behavior across platforms or social contexts
* Example: Freelancing platforms (Fiverr vs TaskRabbit)
  * Bias against certain minority groups on different platforms

<!-- references_ -->

_Bias in Online Freelance Marketplaces_, Hannak et al., CSCW (2017).

----
## Fairness-Aware Data Collection

* Address population bias
<!-- .element: class="fragment" -->
  * Does the dataset reflect the demographics in the target
  population?
  * If not, collect more data to achieve this
* Address under- & over-representation issues
<!-- .element: class="fragment" -->
	* Ensure sufficient amount of data for all groups to avoid being
	treated as "outliers" by ML
	* Also avoid over-representation of certain groups (e.g.,
     remove historical data)
	
<!-- references_ -->
_Fairness-aware Machine Learning_, Bennett et al., WSDM Tutorial (2019).

----
## Fairness-Aware Data Collection

* Data augmentation: Synthesize data for minority groups to reduce under-representation
  <!-- .element: class="fragment" -->
  * Observed: "He is a doctor" -> synthesize "She is a doctor"
* Model auditing for better data collection
  <!-- .element: class="fragment" -->
  * Evaluate accuracy across different groups
  * Collect more data for groups with highest error rates 
	
<!-- references_ -->
_Fairness-aware Machine Learning_, Bennett et al., WSDM Tutorial (2019).

----
## Example Audit Tool: Aequitas

![](aequitas.png)

----
## Example Audit Tool: Aequitas

![](aequitas-report.png)
<!-- .element: class="stretch" -->


<!-- ---- -->
<!-- ## Breaekout: College Admission -->

<!-- ![](college-admission.jpg) -->
<!-- <\!-- .element: class="stretch" -\-> -->

<!-- * Features: GPA, GRE/SAT, gender, race, undergrad institute, alumni -->
<!--   connections, household income, hometown, etc.,  -->
<!-- * Type into #lecture in Slack: -->
<!--   * What are different sub-populations? -->
<!--   * What are potential sources of data bias? -->
<!--   * What are ways to mitigate this bias? -->

----
## Documentation for Fairness: Data Sheets

![](datasheet.png)
<!-- .element: class="stretch" -->

* Common practice in the electronics industry, medicine
* Purpose, provenance, creation, __composition__, distribution
  * "Does the dataset relate to people?"
  * "Does the dataset identify any subpopulations (e.g., by age)?"

<!-- references_ -->

_Datasheets for Dataset_, Gebru et al., (2019). https://arxiv.org/abs/1803.09010

----
## Model Cards

See also: https://modelcards.withgoogle.com/about

![Model Card Example](modelcards.png)
<!-- .element: class="stretch" -->

<!-- references_ -->

Mitchell, Margaret, et al. "[Model cards for model reporting](https://www.seas.upenn.edu/~cis399/files/lecture/l22/reading2.pdf)." In Proceedings of the Conference on fairness, accountability, and transparency, pp. 220-229. 2019.


----
## Dataset Exploration

![](what-if-tool.png)
<!-- .element: class="stretch" -->

[Google What-If Tool](https://pair-code.github.io/what-if-tool/demos/compas.html)

<!-- ---- -->
<!-- ## Breakout: Data Collection for Fairness -->


<!-- * For each system, discuss: -->
<!--   * What harms can be caused by this system? -->
<!--   * What are possible types of bias in the data? -->
<!-- 	* Population bias? Under- or over-representation? -->
<!--   * How would you modify the dataset reduce bias? -->
<!--   * Collect more data? Remove? Augment? -->






---
# Fairness beyond the Model

----
## Bias Mitigation through System Design

<!-- discussion -->

Examples of mitigations around the model?

----
## 1. Avoid Unnecessary Distinctions


![Healthcare worker applying blood pressure monitor](blood-pressure-monitor.jpg)

*Image captioning gender biased?*


----
## 1. Avoid Unnecessary Distinctions


![Healthcare worker applying blood pressure monitor](blood-pressure-monitor.jpg)
<!-- .element: class="stretch" -->

"Doctor/nurse applying blood pressure monitor" -> "Healthcare worker applying blood pressure monitor"


----
## 1. Avoid Unnecessary Distinctions

Is the distinction actually necessary? Is there a more general class to unify them?

Aligns with notion of *justice* to remove the problem from the system


----
## 2. Suppress Potentially Problem Outputs

![Twitter post of user complaining about misclassification of friends as Gorilla](apes.png)
<!-- .element: class="stretch" -->

*How to fix?*


----
## 2. Suppress Potentially Problem Outputs

Anticipate problems or react to reports

Postprocessing, filtering, safeguards
* Suppress entire output classes
* Hardcoded rules or other models (e.g., toxicity detection)

May degrade system quality for some use cases

See mitigating mistakes generally

----
## 3. Design Fail-Soft Strategy

Example: Plagiarism detector

<!-- colstart -->

**A: Cheating detected! This incident has been reported.**

<!-- col -->

**B: This answer seems to perfect. Would you like another exercise?**


<!-- colend -->


HCI principle: Fail-soft interfaces avoid calling out directly; communicate friendly and constructively to allow saving face

Especially relevant if system unreliable or biased


----
## 4. Keep Humans in the Loop


![Temi.com screenshot](temi.png)
<!-- .element: class="stretch" -->

TV subtitles: Humans check transcripts, especially with heavy dialects

----
## 4. Keep Humans in the Loop

Recall: Automate vs prompt vs augment

Involve humans to correct for mistakes and bias

But, model often introduced to avoid bias in human decision

But, challenging human-interaction design to keep humans engaged and alert; human monitors possibly biased too, making it worse

**Does a human have a fair chance to detect and correct bias?** Enough information? Enough context? Enough time? Unbiased human decision?

----
## Predictive Policing Example

> "officers expressed skepticism
about the software and during ride alongs showed no intention of using it"

> "the officer discounted the software since it showed what he already
knew, while he ignored those predictions that he did not understand"

Does the system just lend credibility to a biased human process?

<!-- references -->
Lally, Nick. "[“It makes almost no difference which algorithm you use”: on the modularity of predictive policing](http://www.nicklally.com/wp-content/uploads/2016/09/lallyModularityPP.pdf)." Urban Geography (2021): 1-19.









---
# Monitoring


----
## Monitoring & Auditing

* Operationalize fairness measure in production with telemetry
* Continuously monitor for:
<!-- .element: class="fragment" -->
  - Mismatch between training data, test data, and instances encountered in deployment
  - Data shifts: May suggest needs to adjust fairness metric/thresholds
  - User reports & complaints: Log and audit system decisions
    perceived to be unfair by users
* Invite diverse stakeholders to audit system for biases
<!-- .element: class="fragment" -->

----
## Monitoring & Auditing

![](model_drift.jpg)
<!-- .element: class="stretch" -->

* Continuosly monitor the fairness metric (e.g., error rates for
different sub-populations)
* Re-train model with recent data or adjust classification thresholds
  if needed


----
## Preparing for Problems

Prepare an *incidence response plan* for fairness issues
* What can be shut down/reverted on short notice?
* Who does what?
* Who talks to the press? To affected parties? What do they need to know?

Provide users with a path to *appeal decisions*
* Provide feedback mechanism to complain about unfairness
* Human review? Human override?





---
# Process Integration

----
## Fairness in Practice today

Lots of attention in academia and media

Lofty statements by big companies, mostly aspirational

Strong push by few invested engineers (internal activists)

Some dedicated teams, mostly in Big Tech, mostly research focused

Little institutional support, no broad practices

----
## Barriers to Fairness Work

<!-- discussion -->


----
## Barriers to Fairness Work

1. Rarely an organizational priority, mostly reactive (media pressure, regulators)
2. Fairness work seen as ambiguous and too complicated for available resources (esp. outside Big Tech)
3. Most fairness work done by volunteers outside official job functions
4. Impact of fairness work difficult to quantify, making it hard to justify resource investment
5. Technical challenges
6. Fairness concerns are project specific, hard to transfer actionable insights and tools across teams

*What to do?*


----
## Improving Process Integration -- Aspirations

Integrate proactive practices in development processes -- both model and system level!

Move from individuals to institutional processes distributing the work

Hold the entire organization accountable for taking fairness seriously

*How?*

<!-- discussion -->


----
## Improving Process Integration -- Examples

1. Mandatory discussion of discrimination risks, protected attributes, and fairness goals in *requirements documents*
2. Required fairness reporting in addition to accuracy in automated *model evaluation*
3. Required internal/external fairness audit before *release*
4. Required fairness monitoring, oversight infrastructure in *operation*

----
## Improving Process Integration -- Examples

5. Instituting fairness measures as *key performance indicators* of products
6. Assign clear responsibilities of who does what
7. Identify measurable fairness improvements, recognize in performance evaluations

*How to avoid pushback against bureaucracy?*

----
## Affect Culture Change

Buy-in from management is crucial

Show that fairness work is taken seriously through action (funding, hiring, audits, policies), not just lofty mission statements

Reported success strategies:
1. Frame fairness work as financial profitable, avoiding rework and reputation cost
2. Demonstrate concrete, quantified evidence of benefits of fairness work
3. Continuous internal activism and education initiatives
4. External pressure from customers and regulators


----
## Assigning Responsibilities

Hire/educate T-shaped professionals

Have dedicated fairness expert(s) consulting with teams, performing/guiding audits, etc

Not everybody will be a fairness expert, but ensure base-level awareness on when to seek help


----
## Aspirations

<div class="smallish"> 

> "They imagined that organizational leadership would understand, support, and engage deeply with responsible AI concerns, which would be contextualized within their organizational context. Responsible AI would be prioritized as part of the high-level organizational mission and then translated into actionable goals down at the individual levels through established processes. Respondents wanted the spread of information to go through well-established channels so that people know where to look and how to share information."

</div>

<!-- references -->
From Rakova, Bogdana, Jingying Yang, Henriette Cramer, and Rumman Chowdhury. "Where responsible AI meets reality: Practitioner perspectives on enablers for shifting organizational practices." Proceedings of the ACM on Human-Computer Interaction 5, no. CSCW1 (2021): 1-23.

----
## Burnout is a Real Danger

Unsupported fairness work is frustrating and often ineffective

> “However famous the company is, it’s not worth being in a work situation where you don’t feel like your entire company, or at least a significant part of your company, is trying to do this with you. Your job is not to be paid lots of money to point out problems. Your job is to help them make their product better. And if you don’t believe in the product, then don’t work there.” -- Rumman Chowdhury via [Melissa Heikkilä](https://www.technologyreview.com/2022/11/01/1062474/how-to-survive-as-an-ai-ethicist/)




---
# Best Practices

----
## Best Practices

**Best practices are emerging and evolving**

Start early, be proactive

Scrutinize data collection and labeling

Invest in requirements engineering and design

Invest in education

Assign clear responsibilities, demonstrate leadership buy-in

----
## Many Tutorials, Checklists, Recommendations

Tutorials (fairness notions, sources of bias, process recom.): 
* [Fairness in Machine Learning](https://vimeo.com/248490141), [Fairness-Aware Machine Learning in Practice](https://sites.google.com/view/fairness-tutorial)
* [Challenges of Incorporating Algorithmic Fairness into Industry Practice](https://www.microsoft.com/en-us/research/video/fat-2019-translation-tutorial-challenges-of-incorporating-algorithmic-fairness-into-industry-practice/)

Checklist:
* Microsoft’s [AI Fairness Checklist](https://www.microsoft.com/en-us/research/project/ai-fairness-checklist/): concrete questions, concrete steps throughout all stages, including deployment and monitoring





---
# Anticipate Feedback Loops

----
## Feedback Loops

![Feedback loop](feedbackloop.svg)
<!-- .element: class="plain" -->

----
## Feedback Loops in Mortgage Applications?

<!-- discussion -->

----
## Feedback Loops go through the Environment

![](component.svg)
<!-- .element: class="plain" -->



----
## Analyze the World vs the Machine

![world vs machine](worldvsmachine.svg)
<!-- .element: class="plain stretch" -->

*State and check assumptions!*


----
## Analyze the World vs the Machine

How do outputs affect change in the real world, how does this (indirectly) influence inputs?

Can we decouple inputs from outputs? Can telemetry be trusted?

Interventions through system (re)design:
* Focus data collection on less influenced inputs
* Compensate for bias from feedback loops in ML pipeline
* Do not build the system in the first place


----
## Long-term Impact of ML

* ML systems make multiple decisions over time, influence the
behaviors of populations in the real world
* *But* most models are built & optimized assuming that the world is
static
* Difficult to estimate the impact of ML over time
  * Need to reason about the system dynamics (world vs machine)
  * e.g., what's the effect of a mortgage lending policy on a population?

----
## Long-term Impact & Fairness

<!-- colstart -->

Deploying an ML model with a fairness criterion does NOT guarantee
  improvement in equality/equity over time

Even if a model appears to promote fairness in
short term, it may result harm over long term 

<!-- col -->

![](fairness-longterm.png)
<!-- .element: class="stretch" -->

<!-- colend -->

<!-- references_ -->
[Fairness is not static: deeper understanding of long term fairness via simulation studies](https://dl.acm.org/doi/abs/10.1145/3351095.3372878),
in FAT* 2020.


----
## Prepare for Feedback Loops

We will likely not anticipate all feedback loops...

... but we can anticipate that unknown feedback loops exist

-> Monitoring!




---
# Summary

* Requirements engineering for fair ML systems
  * Identify potential harms, protected attributes
  * Negotiate conflicting fairness goals, tradeoffs
  * Consider societal implications
* Apply fair data collection practices 
* Anticipate feedback loops
* Operationalize & monitor for fairness metrics  
* Design fair systems beyond the model, mitigate bias outside the model
* Integrate fairness work in process and culture


----
## Further Readings

<div class="smaller">

- 🗎 Rakova, Bogdana, Jingying Yang, Henriette Cramer, and Rumman Chowdhury. "[Where responsible AI meets reality: Practitioner perspectives on enablers for shifting organizational practices](https://arxiv.org/abs/2006.12358)." *Proceedings of the ACM on Human-Computer Interaction* 5, no. CSCW1 (2021): 1-23.
- 🗎 Mitchell, Margaret, Simone Wu, Andrew Zaldivar, Parker Barnes, Lucy Vasserman, Ben Hutchinson, Elena Spitzer, Inioluwa Deborah Raji, and Timnit Gebru. "[Model cards for model reporting](https://arxiv.org/abs/1810.03993)." In *Proceedings of the conference on fairness, accountability, and transparency*, pp. 220-229. 2019.
- 🗎 Boyd, Karen L. "[Datasheets for Datasets help ML Engineers Notice and Understand Ethical Issues in Training Data](http://karenboyd.org/Datasheets_Help_CSCW.pdf)." Proceedings of the ACM on Human-Computer Interaction 5, no. CSCW2 (2021): 1-27.
- 🗎 Bietti, Elettra. "[From ethics washing to ethics bashing: a view on tech ethics from within moral philosophy](https://dl.acm.org/doi/pdf/10.1145/3351095.3372860)." In Proceedings of the 2020 Conference on Fairness, Accountability, and Transparency, pp. 210-219. 2020.
- 🗎 Madaio, Michael A., Luke Stark, Jennifer Wortman Vaughan, and Hanna Wallach. "[Co-Designing Checklists to Understand Organizational Challenges and Opportunities around Fairness in AI](http://www.jennwv.com/papers/checklists.pdf)." In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems, pp. 1-14. 2020.
- 🗎 Hopkins, Aspen, and Serena Booth. "[Machine Learning Practices Outside Big Tech: How Resource Constraints Challenge Responsible Development](http://www.slbooth.com/papers/AIES-2021_Hopkins_and_Booth.pdf)." In Proceedings of the 2021 AAAI/ACM Conference on AI, Ethics, and Society (AIES ’21) (2021).
- 🗎 Metcalf, Jacob, and Emanuel Moss. "[Owning ethics: Corporate logics, silicon valley, and the institutionalization of ethics](https://datasociety.net/wp-content/uploads/2019/09/Owning-Ethics-PDF-version-2.pdf)." *Social Research: An International Quarterly* 86, no. 2 (2019): 449-476.

</div>
