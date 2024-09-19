# Lab 4: Model Testing with Zeno and LLM

In this lab, you will gain hands-on experience with Zeno and LLM-based test case generation.
- Zeno is an interactive AI evaluation platform for exploring, debugging, and sharing how your AI systems perform. Evaluate any task and data type with Zeno's modular views which support everything from chatbot conversations to object detection and audio transcription.
- LLM has been increasingly used for generating synthetic data, and one use case there is to generate additional test cases for a model.

To receive credit for this lab, show your work to the TA during recitation.

## Deliverables
- [ ] Successfully start a local Zeno server on the dataset provided, with metrics and model predictions
- [ ] Create 5 slices in the Zeno interface, derive meaningful insights and showcase them to the TA
- [ ] Write down 3 additional slices you want to create and successfully generate 10 examples for one selected slice

## Getting started
- Clone the starter code from this [Git repository](https://github.com/malusamayo/cmu-mlip-model-testing-lab).
- The repository includes a python notebook which contains the starter code.

## Installation instructions
- python 3.10 version is needed for the zeno packages to run correctly
- pip install zenoml datasets transformers tqdm

## Code related details
- Finish all 7 steps mentioned in the python notebook
- If you have trouble downloading the datasets and/or running model inference, use `tweets.csv` shared in the folder
- If you have trouble using the GPTs provided, use plain ChatGPT for test case generation
