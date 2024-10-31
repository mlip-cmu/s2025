# MLIP Fall 2024 Lab 8 - Manage ML Projects with MLFlow

In [Lab8](https://github.com/Rajeevveera24/MLIP_MLFlow), you explore MLFlow to manage and track a small machine learning project using [MLFlow](https://mlflow.org/docs/latest/index.html).

MLFLow is a powerful tool that enables practices aligned with MLOps principles. MLFlow can track experiment results during development. It can perform version control on dataset and model and store versioned model objects to make your project reproducible and manageable.</br>

## Deliverables

- [ ] Set up Local MLFlow Server and complete the `train_model.py` file. Show the registered model at [http://127.0.0.1:6001/#/models](http://127.0.0.1:6001/#/models)
- [ ] Complete `load_model.py`. Show uploaded experiment runs (on MLFlow web page) and the console output of running `load_model.py`
- [ ] Update the training pipeline and register a new version of the model in deliverable 1. Add a meaningful description or tag and explain your choice of classification model to the TA.

### Environment Setup

In this step, we create a virtual environment, install MLFlow, and set up a tracking server. To begin this section, please clone [MLIP MLFlow Lab](https://github.com/Rajeevveera24/MLIP_MLFlow) and navigate to the cloned directory. Then, run the steps below to set up the environment.

```
python -m venv lab8_env
source lab8_env/bin/activate
pip install mlflow databricks-sdk
```

## Steps

### Setup (Local) MLFLow Tracking Server

1. Run `mlflow server --host 127.0.0.1 --port 6001` to launch tracking server on port 6001. Show the logs in the terminal to TA for deliverable 1.
2. Visit [http://127.0.0.1:6001](http://127.0.0.1:6001) to verify your MLFlow Tracking Server is running. Show the webpage in browser to TA for deliverable 1.

#### Complete the Machine Learning Pipeline

Build a simple machine learning project to simulate real-world scenario.

In `utility/pipeline.py`, there are 3 utility functions:

1. `data_preprocessing` generates the train and test dataset
2. `train_logistic_regression` generates a trained sklearn logistic regression model
3. `evaluation` returns accuracy of trained model on test dataset.

Use these 3 funtions to build a training pipeline in `train_model.py` and an inference pipeline in `load_model.py`.

#### Complete the Logistic Regression Model's Training Pipeline

Modify `train_model.py`:

1. Complete the TODO to extract the train and test dataset from `pipeline.data_preprocessing()`
2. Complete the TODO to obtain trained model from `pipeline.train_logistic_regression()`. This function outputs a fitted regressor.
3. Complete the TODO to obtain accuracy score from `pipeline.evaluation`. This function accepts X_test, y_test, model and output a float type accuracy score.

#### Complete the Inference Pipeline

Modify `load_model.py`:

1. Complete the TODO to predict the numpy array datapoint. You might need to convert the numpy array to a dataframe for inference (due to a constraint of MLFlow)

### Complete MLFlow Components

#### Complete the MLFLow tracking and model registering components in `train_model.py` (Deliverable 1)

1. Provide the tracking server uri in Line 10 (This is a local server - what should the URI be ?)
2. Provide your own email as experiment name.
3. Run `python train_model.py` to train the model, upload the model metrics and register the model to MLFlow Tracking Server. Find the model at [http://127.0.0.1:6001/#/models](http://127.0.0.1:6001/#/models)

#### Load the model and make a prediction by modifying `load_model.py`(Deliverable 2)

1. Provide the tracking server URI.
2. Provide the URI of registered model.

   > To obtain the uri, visit your [tracking server webpage](http://127.0.0.1:6001). Go to your experiment's page. Click the latest run under **run name** column. Under the artefacts tab, find the model_uri with the following text (example): `model_uri = 'runs:/69c93a9c4bd14210871e7ee78483f30e/iris_model`

3. Run `python load_model.py` to load the trained model from MLFlow Tracking Server and make a prediction.

### Update the registered model and register a new version (Deliverable 3)

1. Update the registered model and create a new version of it. The new version can be viewed at [http://127.0.0.1:6001/#/models](http://127.0.0.1:6001/#/models) under column **Latest Version**.
   > To update the model, you can use a different training algorithm in the training pipeline.
   > Justify your choice of new training algorithm to the TA.

## Optional Deliverables

- [ ] Deploy the MLFlow model as a docker container. Run inference using `sh ./test_inference.sh`.

### Deploy MLFlow Registered Model as Docker Container

Use MLFlow to deploy aockerized container of the model. MLFlow can pack a registered model into a docker container server. It also provides inference protocol in [Local Inference Spec Page](https://mlflow.org/docs/latest/deployment/deploy-model-locally.html#local-inference-server-spec). Let us build a docker container based on run id we previously obtained in [Complete the loading process](#Complete-the-loading-process).

1. First, run `export MLFLOW_TRACKING_URI=<Your tracking server uri>` to let the MLFlow CLI know the tracking server endpoint.
2. According to [MLFlow models documentation](https://mlflow.org/docs/latest/cli.html?highlight=docker#mlflow-models-build-docker), run `mlflow models build-docker --model-uri "<Previously obtained runs:/ uri>" --name "lab8"` to build the docker image.
3. Run `sudo docker run -p 6002:8080 "lab8"` to launch the server.
4. Run `./test_inference.sh` to send a test inference to the server. **Show TA the console output of test inference for deliverable 3.**

### Use Databricks free MLFlow Server

For a group project, a cloud server is better at team collaboration than local server.

1. Go to the [login page of Databricks CE](https://community.cloud.databricks.com/login.html)
2. Click on ==Sign Up== at the right bottom of the login box
3. Fill out all the necessary information. Remeber to choose community edition instead of any cloud services.
   When you set tracking server, instead of running `mlflow.set_tracking_uri("<your tracking server uri>")` in the python script, you should run `mlflow.login` and provide:

- Databricks Host: https://community.cloud.databricks.com/
- Username: Your Databricks CE email address.
- Password: Your Databricks CE password.

## References and recommended reading

[Explore MLFlow with Databricks](https://mlflow.org/blog/databricks-ce)

### FAQs

#### Bugs

- Will be added if/when bugs are reported.
