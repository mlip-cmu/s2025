# Lab 5: Containerizing with Docker

In this lab, you'll learn how to containerize a Flask application, train and deploy a machine learning model using Docker and Docker Compose. By the end of the lab, you'll have a Flask API running in a Docker container that can serve predictions using a machine learning model trained on the Iris dataset.

Clone the code from [this](https://github.com/purvag03/mlip-docker-lab-f24/) repository.

## Deliverables

- [ ] Setup Docker on your system
- [ ] Containerize training the ML Model
- [ ] Containerize the Flask App for inference
- [ ] Train and deploy the machine learning model using Docker

## Deliverable 1 - Setup Docker

- Install Docker on your system
- Verify Docker installation

Follow the instructions for your operating system to install Docker. Then test your installation with:

```bash
docker run hello-world
```

## Deliverable 2 - Containerize training the Machine Learning Model

Complete file named `Dockerfile.train`
Fill in the TODO sections.
- Copy requirements.txt and install dependencies
- Copy train.py to the working directory
- Set the command to run train.py

## Deliverable 3 - Containerize the Flask App for inference
### Step 1: Implement the predict() Function

In the server.py file, there is a function called predict() where you need to:
- Load the trained machine learning model.
- Run inference using an input sent through a GET request.
- Return the prediction as the response.

Fill in the TODO sections.

### Step 2: Complete Dockerfile.infer
Fill in the TODO sections.
- [ ] Set the working directory to /app
- [ ] Copy requirements.txt and install dependencies
- [ ] Copy server.py to the working directory
- [ ] Expose port 8080 or any other free port
- [ ] Set the command to run  server.py

## Deliverable 4 - Completing the Docker Compose
### Docker Compose Overview
Docker Compose is a tool that allows you to define and manage multi-container Docker applications. It uses a docker-compose.yml file to configure the application's services, networks, and volumes. In this lab, you'll use Docker Compose to set up two services:

- Training Service: This service will train a machine learning model using the Iris dataset.
- Inference Service: Once the model is trained, the inference service will load the trained model and serve predictions via a Flask API.
  
Fill in the TODO sections:
- Set the `Dockerfile.train` for the training service and Dockerfile.infer for the inference service.
-  Use a shared volume (model_storage) to store the trained model between the services.
-  Expose port 8080 (or nay other port) for the Flask app in the inference service.
-  Ensure the inference service starts only after the training service completes (depends_on).
-  Declare the model_storage volume at the end for both services to access the trained model.

### Running the Entire Setup

- Build and run services with Docker Compose
- Verify both services are running correctly

Use the following command to start your services:

```bash
docker-compose up --build
```

## Testing the Prediction Endpoint
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

## Troubleshooting

If you encounter issues:
- Check Docker daemon status
- Verify port availability
- Review service logs with `docker-compose logs`
- Ensure the training service completes before the inference service starts