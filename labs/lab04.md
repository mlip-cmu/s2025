# Lab 4: Model Testing with Zeno platform

In this lab, you will gain hands-on experience with Zeno.
Zeno is an interactive AI evaluation platform for exploring, debugging, and sharing how your AI systems perform. Evaluate any task and data type with Zeno's modular views which support everything from chatbot conversations to object detection and audio transcription.
To receive credit for this lab, show your work to the TA during recitation.

## Deliverables
- [ ] Creating a Zeno Account; create a project and upload existing dataset to the project
- [ ] Adding the "avg length ratio" Zeno metric to your project
- [ ] Create 2/3 slices and derive meaningful insights and showcase them to the TA 

## Creating Zeno account
If you don't have a Zeno account already, create one on Zeno Hub (https://hub.zenoml.com/signup). After logging in to Zeno Hub, generate your API key by clicking on your profile at the top right to navigate to your account page.

## Getting started
- Clone the starter code from this [Git repository](https://github.com/sayalikandarkar/cmu-mlip-zeno-lab).
- The repository includes a python notebook which contains the started code.

## Installation instructions
- python 3.10 version is needed for the zeno packages to run correctly
- pip install packaging ~ version 23.2

## Code related details
- Replace the API key in the started code
- Create the project and verify if you can access your project on the hub
- Finish all 6 steps mentioned in the python notebook 
- Verify if the data has been uploaded on the zeno hub project you created
- Go back to Step 2 - Uncomment this line -> ZenoMetric(name="avg length ratio", type="mean", columns=["avg_length_ratio"])
- Go back to Step 3 - Uncomment the last line -> Complete the function to calculate the avg length ratio
- Upload the system outputs again and verify if the newly added metric has been reflected

## Additional resources
- [Zeno Getting Started](https://zenoml.com/docs/intro)
- [Exploring Zeno Projects] (https://hub.zenoml.com/home)
