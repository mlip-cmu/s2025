# MLIP Lab7 - Manage and Track Machine Learning Project with MLFlow
In [Lab7](https://github.com/JayYu0116/MLIP_Lab7), you will explore how to manage and track Machine Learning Projects using [MLFlow](https://mlflow.org/docs/latest/index.html). Although MLFlow is helpful to team project M3, We recommend doing this lab on your personal machine to avoid multiple installations and environmental conflict.</br></br>
MLFLow is a powerful tool that enables practices aligned with MLOps principles. MLFlow can track experiment results during development. It can perform version control on dataset and model and store versioned model objects to make your project reproducible and manageable.</br></br>
To receive credit for this lab, please show your all deliverables to the TA during recitation.

## Deliverables
- [ ] Show the webpage MLFlow Tracking Server. Explain to TA your process of setting up the environment for this lab.
- [ ] Complete the `train_model.py` and `load_model.py`. Show TA your uploaded runs in Tracking Server webpage and the console output of running `load_model.py`
- [ ] Deploy the MLFlow model as a docker container. Show TA the console output of running `./test_inference.sh`.

## Environment Setup
In this step, we create a virtual environment, install MLFlow, and set up a tracking server. To begin this section, please clone [Lab7 repo](https://github.com/JayYu0116/MLIP_Lab7) to your machine. Run `cd MLIP_Lab7` to enter into the work directory. Then we begin the virtual environment setup"

### Setup Virtual Environment 
1. Run:
   ```bash
   python -m venv lab7
   ```
   to use python [venv](https://docs.python.org/3/library/venv.html) to create a virtual envrionment.
2. Run:
   ```
   source lab7/bin/activate
   pip install mlflow databricks-sdk
   ```
   to activate virtual environment and install mlflow package
   
### Setup MLFLow Tracking Server

#### Option 1(Please use this option in lab7): Run MLFLow Tracking Server on Localhost
1. Run `mlflow server --host 127.0.0.1 --port 6001` to launch tracking server on port 6001. Show the logs in the terminal to TA for deliverable 1.
2. Visit [http://127.0.0.1:6001](http://127.0.0.1:6001) to verify your MLFlow Tracking Server is running. Show the webpage in browser to TA for deliverable 1.

#### Option 2: Use Databricks free MLFlow Server
This option does not provide model registry. This is provided because a cloud server is better at team collaboration than local server.
1. Go to the [login page of Databricks CE](https://community.cloud.databricks.com/login.html)
2. Click on ==Sign Up== at the right bottom of the login box
3. Fill out all the necessary information. Remeber to choose community edition instead of any cloud services.
When you set tracking server, instead of running `mlflow.set_tracking_uri("<your tracking server uri>")` in the python script, you should run `mlflow.login` and provide:
- Databricks Host: https://community.cloud.databricks.com/
- Username: Your Databricks CE email address.
- Password: Your Databricks CE password.
For more details, please visit [Additional Reference](#Additional-Reference)

## Complete the Machine Learning Pipeline
In this step, we try to build a simple machine learning project to simulate real-world scenario. In _WORK_DIR/utility/pipeline.py_, we defined 3 utility functions: `data_preprocessing` function that generates train and test dataset, `train_logistic_regression` that generates trained sklearn logistic regression model, and `evaluation` function that returns accuracy of trained model on test dataset. <br><br>
Now, we use these 3 funtions to build a training pipeline in _WORK\_DIR/train\_model.py_ and a inference pipeline in _WORK\_DIR/load\_model.py_. In this process, please check documentation in _WORK\_DIR/utility/pipeline.py_ carefully. They are very helpful.

### Complete the Training Pipeline
In this step, we modify _WORK\_DIR/train\_model.py_ only.
1. Complete the TODO in Line 22 to extract the train and test dataset from `pipeline.data_preprocessing`. This function accept now arguments and returns `X_train, X_test, y_train, y_test`
2. Complete the TODO in Line 33 to obtain trained model from `pipeline.train_logistic_regression`. This function accepts X_train, y_train, params (sklearn logistic regression parameters) and output a fitted regressor.
3. Complete the TODO in Line 36 to obtain accuracy score from `pipeline.evaluation`. This function accepts X_test, y_test, model and output a float type accuracy score.
Now, we have a complete machine learning training pipeline without MLFlow component.

### Complete the Inference Pipeline
In this step, we modify _WORK\_DIR/load\_model.py_ only.
1. Complete the TODO in Line 20 to predict the numpy array datapoint. You need to convert the numpy array to pandas Dataframe for inference due to the constrain of MLFlow.

## Complete MLFlow Components

### Complete the tracking and model registering process
In this step, we complete the MLFLow tracking and model registering components in _WORK\_DIR/train\_model.py_ and _WORK_DIR/load\_model.py_. **After the completion of _WORK\_DIR/train\_model.py_, we need to run it before the next step** because next step requires the tracking server to have a registered model already. <br><br>
For _WORK\_DIR/train\_model.py_:
1. Provide the tracking server uri in Line 10.
2. Provide your own email as experiment name in Line 15.
Now, please **run `python train_model.py`** to train the model and upload the model metrics and register the current model to MLFlow Tracking Server.

### Complete the loading process
For _WORK\_DIR/load\_model.py_:
1. Provide the tracking server uri in Line 6.
2. Provide the uri of registered model in Line 10. To obtain the uri, you need to visit your [tracking server webpage](http://127.0.0.1:6001). Clike the **Experiment** section on the top. Click your experiment on the left side. Click the runs under **run name** column. Click on the artifacts on the top. On the screen's right side, under **Make Prediction** section, you can see something like _logged\_model = 'runs:/69c93a9c4bd14210871e7ee78483f30e/iris\_model'_. **This string is the uri you need**. **Show TA this page for deliverable 2**
Now, please **run `python load_model.py`** This should print out a prediction on your screen. **Please show this to TA for deliverable 2.**

## Deploy MLFlow Registered Model as Docker Container.
Now, we use MLFlow to help us with deployment. MLFlow can pack a registered model into a docker container server. It also provides inference protocol in [Local Inference Spec Page](https://mlflow.org/docs/latest/deployment/deploy-model-locally.html#local-inference-server-spec). Let us build a docker container based on run id we previously obtained in [Complete the loading process](#Complete-the-loading-process).

1. First, run `export MLFLOW_TRACKING_URI=<Your tracking server uri>` to let the MLFlow CLI know the tracking server endpoint.
2. According to [MLFlow models documentation](https://mlflow.org/docs/latest/cli.html?highlight=docker#mlflow-models-build-docker), run `mlflow models build-docker --model-uri "<Previously obtained runs:/ uri>" --name "lab7"` to build the docker image.
3. Run `sudo docker run -p 6002:8080 "lab7"` to launch the server.
4. Run `WORK_DIR/test_inference.sh` to send a test inference to the server. **Show TA the console output of test inference for deliverable 3.**

### Additional Reference
[Explore MLFlow with Databricks](https://mlflow.org/blog/databricks-ce)
