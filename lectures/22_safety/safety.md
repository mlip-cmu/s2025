---
author: Claire Le Goues & Christian Kaestner
title: "MLiP: Safety"
semester: Spring 2024
footer: "Machine Learning in Production/AI Engineering • Christian Kaestner & Claire Le Goues, Carnegie Mellon University • Spring 2024"
license: Creative Commons Attribution 4.0 International (CC BY 4.0)
---  
<!-- .element: class="titleslide"  data-background="../_chapterimg/22_safety.jpg" -->
<div class="stretch"></div>

## Machine Learning in Production

# Safety




<!-- img: https://pixabay.com/photos/circus-the-fire-breathing-fire-4318438/ -->

---
## Mitigating more mistakes...

![Overview of course content](../_assets/overview.svg)
<!-- .element: class="plain stretch" -->



----
## Reading


S. Mohseni et al., [Practical Solutions for Machine Learning Safety in Autonomous Vehicles](http://ceur-ws.org/Vol-2560/paper40.pdf).
SafeAI Workshop@AAAI (2020).



---
## Learning Goals

* Understand safety concerns in traditional and AI-enabled systems
* Understand the importance of ML robustness for safety
* Apply hazard analysis to identify risks and requirements and understand their limitations
* Discuss ways to design systems to be safe against potential failures 
* Suggest safety assurance strategies for a specific project
* Describe the typical processes for safety evaluations and their limitations




---
# AI Safety

![Robot uprising](robot-uprising.jpg)
 
<!-- references -->
Amodei, Dario, Chris Olah, Jacob Steinhardt, Paul Christiano, John Schulman, and Dan Mané. "[Concrete problems in AI safety](https://arxiv.org/pdf/1606.06565.pdf%20http://arxiv.org/abs/1606.06565)." arXiv preprint arXiv:1606.06565 (2016).

----
## Your Favorite AI Dystopia?

<!-- discussion -->

----
## The AI Alignment Problem

AI is optimized for a specific objective/cost function
  * Inadvertently cause undesirable effects on the environment
  * e.g., [Transport robot](https://www.youtube.com/watch?v=JzlsvFN_5HI): Move a box to a specific destination
  * Side effects: Scratch furniture, bump into humans, etc.,

Side effects may cause ethical/safety issues (e.g., social media optimizing for clicks, causing teen depression)

Difficult to define sensible fitness functions:
  * Perform X *subject to common-sense constr. on the
    environment*
  * Perform X *but avoid side effects to the extent
      possible*



----
## Reward Hacking

> PlayFun algorithm pauses the game of Tetris indefinitely to avoid losing  

> When about to lose a hockey game, the PlayFun algorithm exploits a bug to make one of the players on the opposing team disappear from the map, thus forcing a draw.

> Self-driving car rewarded for speed learns to spin in circles  

[Example: Coast Runner](https://www.youtube.com/watch?v=tlOIHko8ySg)

----
## Reward Hacking

* AI can be good at finding loopholes to achieve a goal in unintended ways
* Technically correct, but does not follow *designer's informal intent*
* Many possible causes, incl. partially observed goals, abstract rewards, feedback loops
* In general, a very challenging problem!
  * Difficult to specify goal & reward function to avoid all
  possible hacks
  * Requires careful engineering and iterative reward design

<!-- references -->
Amodei, Dario, Chris Olah, Jacob Steinhardt, Paul Christiano, John Schulman, and Dan Mané. "[Concrete problems in AI safety](https://arxiv.org/pdf/1606.06565.pdf%20http://arxiv.org/abs/1606.06565)." arXiv preprint arXiv:1606.06565 (2016).

----
## AI Alignment Problem = Requirements Problem

Recall: "World vs. machine"
* Identify stakeholders in the environment & possible effects on them
* Anticipate side effects, feedback loops
* Constrain the scope of the system
* Perfect contracts usually infeasible, undesirable

But more requirements engineering unlikely to be only solution


----
## Existential AI Risk

Existential risk and AI alignment common in research

Funding through *longtermism* branch of effective altruism *(Longtermism is the view that positively influencing the longterm future is a key moral priority of our time.)*

Ord estimates 10% existential risk from unaligned AI in 100 years

**Our view:** AI alignment not a real concern for the kind of ML-enabled products we consider here

<!-- references -->
Ord, Toby. The precipice: Existential risk and the future of humanity. Hachette Books, 2020.

Note: Relevant for reinforcement learning and AGI

----
## More pressing AI isks?

![TechCrunch article](techcrunch.png)
<!-- .element: class="stretch" -->

> “Those hypothetical risks are the focus of a dangerous ideology
called longtermism that ignores the actual harms resulting from the
deployment of AI systems today,” they wrote, citing worker
exploitation, data theft, synthetic media that props up existing power
structures and the further concentration of those power structures in
fewer hands.



----
## Practical Alignment Problems

Does the model goal align with the system goal? Does the system goal align with the user's goals?
* Profits (max. accuracy) vs fairness
* Engagement (ad sales) vs enjoyment, mental health
* Accuracy vs operating costs

Test model *and* system quality *in production*

(see requirements engineering and architecture lectures)


---
# System Safety

----
## Defining Safety

Prevention of a system failure or malfunction that results in:
  * Death or serious injury to people
  * Loss or severe damage to equipment/property
  * Harm to the environment or society

Safety is a system concept
  * Can't talk about software/ML being "safe"/"unsafe" on its own
  * Safety is defined in terms of its effect on the **environment**

----
## Safety != Reliability

Reliability = absence of defects, mean time between failure

Safety = prevents accidents, harms

Can build safe systems from unreliable components (e.g. redundancy, safeguards)

System may be unsafe despite reliable components (e.g. stronger gas tank causes more severe damage in incident)

Accuracy is usually about reliability!


----
## Safety of AI-Enabled Systems

<div class="tweet" data-src="https://twitter.com/EmilyEAckerman/status/1186363305851576321"></div>

Notes: Systems can be unsafe in unexpected ways

----
## Safety of AI-Enabled Systems

<div class="tweet" data-src="https://twitter.com/skoops/status/1065700195776847872"></div>

Notes: Systems can be unsafe in unexpected ways

----
## Safety is a broad concept

Not just physical harms/injuries to people

Includes harm to mental health

Includes polluting the environment, including noise pollution

Includes harm to society, e.g. poverty, polarization

----
## Case Study: Self-Driving Car

![](self-driving.jpeg)

----
## How did traditional vehicles become safer?

<!-- colstart -->

![](nader-report.png)
<!-- .element: class="stretch" -->

<!-- col -->

National Traffic & Motor Safety Act (1966): 
* Mandatory design changes (head rests, shatter-resistant windshields, safety belts)
* Road improvements (center lines, reflectors, guardrails)
* Significant reduction (13-46%) in traffic fatalities 

<!-- colend -->

----
## Autonomous Vehicles: What's different?

![](av-hype.png)
<!-- .element: class="stretch" -->

* In traditional vehicles, humans ultimately responsible for safety
  * Built-in safety features (lane keeping, emergency braking) 
  * i.e., safety = human control + safety mechanisms
* Use of AI in autonomous vehicles: Perception, control, routing,
etc.,
  * Inductive training: No explicit requirements or design insights
  * __Can ML achieve safe design solely through lots of data?__

----
## Demonstrating Safety

![](av-miles.jpg)
<!-- .element: class="stretch" -->

__Q. More miles tested => safer?__


----
## Challenge: Edge/Unknown Cases

![](av-weird-cases.jpg)
<!-- .element: class="stretch" -->

* Gaps in training data; ML unlikely to cover all unknown cases
* Is this a unique problem for AI? What about humans?


----
## Safety Engineering

Safety Engineering: An engineering discipline which assures that engineered systems provide acceptable levels of safety.

Typical safety engineering process:
  * Identify relevant hazards & safety requirements
  * Identify potential root causes for hazards
  * For each hazard, develop a mitigation strategy
  * Provide evidence that mitigations are properly implemented



----
## Improving Safety of ML-Enabled Systems

Anticipate problems (hazard analysis, FTA, FMEA, HAZOP, ...)

Anticipate the existence of unanticipated problems

Plan for mistakes, design mitigations (recall earlier lecture!)
* Human in the loop
* Undoable actions, failsoft
* Guardrails
* Mistaked detection
* Redundancy, ...


---
# Demonstrating and Documenting Safety


----
## Demonstrating Safety

Two main strategies:

1. **Evidence of safe behavior in the field** 
   * Extensive field trials
   * Usually expensive
2. **Evidence of responsible (safety) engineering process**
   * Process with hazard analysis, testing mitigations, etc
   * Not sufficient to assure safety

Most standards require both

----
## Demonstrating Safety

![](av-miles.jpg)
<!-- .element: class="stretch" -->

__How do we demonstrate to a third-party that our system is safe?__

----
## Safety & Certification Standards

<div class="smallish">

* Guidelines & recommendations for achieving an acceptable level of
safety
* Examples: DO-178C (airborne systems), ISO  26262 (automotive), IEC 62304 (medical
software), Common Criteria (security)
* Typically, **prescriptive & process-oriented**
  * Recommends use of certain development processes
  * Requirements specification, design, hazard analysis, testing,
    verification, configuration management, etc., 
* Limitations
	* Most not designed to handle ML systems (exception: UL 4600)
	* Costly to satisfy & certify, but effectiveness unclear (e.g., many
    FDA-certified products recalled due to safety incidents)
* Good processes are important, but not sufficient; provides only indirect evidence for system safety

</div>

----
## Certification Standards: Example


![IEC process](IEC-process.png)
<!-- .element: class="stretch" -->

----
## Demonstrating Safety

Two main strategies:

1. **Evidence of safe behavior in the field** 
   * Extensive field trials
   * Usually expensive
2. **Evidence of responsible (safety) engineering process**
   * Process with hazard analysis, testing mitigations, etc
   * Not sufficient to assure safety

**Most standards require both, but often not sufficient!**

----
## Assurance (Safety) Cases

* An emerging approach to demonstrating safety
* An explicit argument that a system achieves a desired safety
requirement, along with supporting evidence
* Structure:
  * Argument: A top-level claim decomposed into multiple sub-claims
  * Evidence: Testing, software analysis, formal verification,
  inspection, expert opinions, design mechanisms...

----
## Documenting Safety with Assurance (Safety) Cases

![](safetycase.svg)
<!-- .element: class="stretch plain " -->


----
## Assurance Cases: Example

![](safetycase.svg)
<!-- .element: class="stretch plain " -->

Questions to think about:
  * Do sub-claims imply the parent claim?
  * Am I missing any sub-claims?
  * Is the evidence strong enough to discharge a leaf claim?

----
## Assurance Cases: Example

![](aurora-safety-case.png)
<!-- .element: class="stretch" -->

[Aurora Safety Case](https://aurora.tech/blog/aurora-unveils-first-ever-safety-case-framework)


----
## Discussion: Assurance Case for Recommender

![](movie-recommendation.png)
<!-- .element: class="stretch" -->

How would you argue that your recommendation system
provides at least 95% availability? What evidence would you provide? 

----
## Assurance Cases: Benefits & Limitations

<div class="smallish">

* Provides an explicit structure to the safety argument
  * Easier to navigate, inspect, and refute for third-party auditors
  * Provides traceability between system-level claims &
    low-level evidence
  * Can also be used for other types of system quality (security,
    reliability, etc.,)
* Challenges and pitfalls
  * Informal links between claims & evidence, e.g., Does the sub-claims actually imply the top-level claim? 
  * Effort in constructing the case & evidence: How much evidence is enough?
  * System evolution: If system changes, must reproduce the case & evidence
* Tools for building & analyzing safety cases available
	* e.g., [ASCE/GSN](https://www.adelard.com/gsn.html) from Adelard
	* But ultimately, can't replace domain knowledge & critical thinking

</div>

----
## Testing is still important!

![UI bug in Omnipod App](pump-bug.png)


----
## Other Challenges

<div class="smallish">

* Safe Exploration
  - Exploratory actions "in production" may have consequences
  - e.g., trap robots, crash drones
* Robustness to Drift
    - Drift may lead to poor performance that may not even be recognized
* Scalable Oversight
    - Cannot provide human oversight over every action (or label all possible training data)
  - Use indirect proxies in telemetry to assess success/satisfaction

</div>

<!-- references -->
Amodei, Dario, Chris Olah, Jacob Steinhardt, Paul Christiano, John Schulman, and Dan Mané. "[Concrete problems in AI safety](https://arxiv.org/pdf/1606.06565.pdf%20http://arxiv.org/abs/1606.06565)." arXiv preprint arXiv:1606.06565 (2016).




---
# Robustness for ML-based Systems

----
## Robustness

Environment sometimes __deviates__ from expected, normal conditions
- Extreme weathers, unexpected obstacles, etc., 
- Erratic user behaviors; unusually high service demand
- Adversarial actors; users trying to game your system, etc., 

Does your system work reasonably well under these deviations? i.e., is
it _robust_?

Most safety-critical systems require some level of robustness
- Not enough to show that system is safe in normal conditions
