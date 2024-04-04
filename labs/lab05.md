# Lab 5: Containerizing with Docker
In this lab, you'll learn about Docker and how to deploy Flask applications and Machine Learning models on it. 

Docker is a tool that allows developers, sys-admins etc. to easily deploy their applications in a sandbox (called containers) to run on the host operating system i.e. Linux. The key benefit of Docker is that it allows users to package an application with all of its dependencies into a standardized unit for software development. Unlike virtual machines, containers do not have high overhead and hence enable more efficient usage of the underlying system and resources.

Complete all the Deliverables mentioned below and show it to a TA for credit.

## Deliverables
- [ ] Setup Docker on your system
- [ ] Containerize the Flask App
- [ ] Deploy Machine Learning Models on Docker

## Deliverable 1 - Setup Docker

For this lab, you'll need Docker setup on your computer. Docker is available for all major operating systems, follow instructions for [Mac](https://docs.docker.com/desktop/install/mac-install/), [Linux](https://docs.docker.com/engine/install/ubuntu/) or [Windows](https://docs.docker.com/desktop/install/windows-install/) to setup Docker.

Once you are done installing Docker, test your Docker installation by running the following:
```
$ docker run hello-world

Hello from Docker.
This message shows that your installation appears to be working correctly.
...
```
## Deliverable 2 - Containerize Flask App

### Setup

Clone the code from [this](https://github.com/eshetty/mlip-docker-lab) repository.
Install all the required packages:
```
pip3 install -r requirements.txt
```

Run the Flask App to ensure everything works. (The flask could break due to dependency/version issues, if this is case try to troubleshoot this yourself and get the Flask app running)
```
python3 server.py
```

This should now run on `localhost:8080/` and return
```
Welcome to Docker Lab
```

### Dockerizing

This part should help familiarize you with the process of containerizing a Flask App. A `Dockerfile` is a text document that contains all the commands a user could call on the command line to assemble an image. This helps you establish a pipeline while setting up a docker image. 

You should be provided with an incomplete `Dockerfile`. Your task is fill in the TODO tasks to create a valid `Dockerfile`. Follow [this](https://docs.docker.com/engine/reference/builder/) reference guide for tips/helpful commands. **(Note: If you changed any of the requirement versions and you have a different Python version, make sure to update the python version in the [Dockerfile](https://github.com/eshetty/mlip-docker-lab/blob/dc7b44b3a0d55190a125565d275fe61aa6f40bbe/Dockerfile#L3))**

Once you're done with the Dockerfile, you can build a docker image using the Docker CLI. Replace `<IMAGE_NAME>` with a suitable name for the Docker Image (for ex: `mlip-lab`).
```
docker build --tag <IMAGE_NAME> .
```

If you have a valid Dockerfile, this should run smoothly and create a Docker image. You can confirm this with the following command
```
$ docker images
REPOSITORY      TAG       IMAGE ID       CREATED          SIZE
mlip-docker     latest    2cf4bd7e7c58   10 minutes ago   164MB
```

Now,  you can run the Docker image to setup the Flask App. `-p 8080:8080` helps us bind the port 8080 on the Docker Image to a Local Port for easy access.
```
docker run -p 8080:8080 <IMAGE_NAME>   
```

This should work smoothly and once again `localhost:8080/` should be accessible with the same message as before.


## Deliverable 3 - Deploy Machine Learning Models on Docker 

Now that we have a working Flask App on our Docker, we can use this to deploy machine learning models and run inference on the Flask Server. This deliverable aims to teach you how to deploy machine learning models using Flask and Docker.

### Step 1 - Train a Machine Learning Model
Run `train.py` as it is. This should create a basic SciKit Learn Iris Classifier and save the model as a pickle file. After the script runs, you should find a `iris-model.pkl` file in your directory.

### Step 2 - Fill in the Blanks in predict()
In `server.py`, there is a function `predict()`. Fill in the TODOs to:
1. Load a Machine Learning model 
2. Run inference on an input sent through `GET` (Check [Calling a GET Request](https://github.com/eshetty/mlip-docker-lab/blob/dc7b44b3a0d55190a125565d275fe61aa6f40bbe/Dockerfile#L11) for the curl command)
3. Return prediction back as a response. Run the Flask App locally to see if your implementation works.

### Step 3 - Update the Dockerfile
The `Dockerfile` needs to be updated to copy the model file into the image. Use the `COPY` command to copy the `iris-model.pkl` as you did in [Deliverable (2)](https://github.com/eshetty/mlip-docker-lab/blob/dc7b44b3a0d55190a125565d275fe61aa6f40bbe/Dockerfile#L11). Repeat steps in Deliverable (2) to rebuild the image and test whether it's running on Flask.

### Calling a GET Request
For this assignment, run the following CURL command to test your flask setup.

```
curl --location --request GET 'localhost:8080/predict' \
--header 'Content-Type: application/json' \
--data '{
    "input": [6.3, 3.3, 6 , 2.5]
}'
```
Alternatively, you can test this on Postman as well - ensure that your body is JSON with the following data
```json
{
    "input": [6.3, 3.3, 6 , 2.5]
}
```

## Additional resources 
1. [Docker For Beginners](https://docker-curriculum.com/)
2. [Build and Deploy Flask Applications with Docker](https://www.digitalocean.com/community/tutorials/how-to-build-and-deploy-a-flask-application-using-docker-on-ubuntu-20-04)
3. [Models on Docker](https://towardsdatascience.com/build-and-run-a-docker-container-for-your-machine-learning-model-60209c2d7a7f)

