# Lab: Deploy Flask Backend with Python Load Balancer on Kubernetes

In this lab, you'll set up and deploy multiple instances of a Flask backend on Kubernetes, configure a Python-based load balancer to distribute traffic across the backend instances, and perform load testing using Apache Benchmark (AB). This lab will introduce you to managing Kubernetes deployments with multiple services, simulating load balancing, and observing request distribution. By the end, you'll have experience with Kubernetes’ traffic management, service discovery, and how to test a load balancer's performance.

## Objectives
- Deploy multiple services in Kubernetes for a distributed backend application.
- Set up a Python-based load balancer to route traffic across backend instances.
- Use `minikube service` for accessing services if NodePort is unavailable.
- Perform load testing with Apache Benchmark to evaluate traffic distribution.

## Deliverables
- [ ] Show the TA the logs of one backend Pod in the MiniKube dashboard.
- [ ] Explain to the TA how the load balancer distributes requests to backend instances.
- [ ] Show a screenshot of Apache Benchmark (AB) test output with performance metrics.
- [ ] Explain how this setup could be applied in Milestone 3.

---

## Getting Started
1. **Start Docker**: Ensure Docker is running on your machine.
2. **Fork Repo**: Fork this [repo](https://github.com/purvag03/mlip-kubernetes-lab/tree/main)
3. **Install MiniKube**: Follow instructions [here](https://minikube.sigs.k8s.io/docs/start/).
4. **Start MiniKube**: Start MiniKube on your local setup. Run `minikube start`.
5. **Verify MiniKube**: Confirm that MiniKube is running by listing all pods:
```
kubectl get po -A
```


---

### Step 1: Set Up and Deploy the Flask Backend

1. **Download the Backend Code**: Obtain the files `backend.py` and `Dockerfile.backend`.
2. **Edit the Flask Backend**:
- Customize the response message in `backend.py` to include a unique identifier for each backend instance.
- **TODO**: Add a unique message or identifier to distinguish responses from different backend instances.
3. **Containerize the Backend**:
- Edit `Dockerfile.backend` to set up the Flask app, exposing port 5001.
- **TODO**: Replace `<your-dockerhub-username>` with your Docker Hub username when creating the image.
4. **Build and Push the Docker Image**:
```
docker build -t <your-dockerhub-username>/<backend-image-name>:1.0.0 -f Dockerfile.backend . 
docker push <your-dockerhub-username>/<backend-image-name>:1.0.0
```


5. **Configure Deployment and Service**:
- Edit `backend-deployment.yaml` and `backend-service.yaml`.
- **TODO**: In the YAML files, replace placeholders with your Docker Hub image and specify unique service names if needed.
6. **Deploy the Backend**:
```
kubectl apply -f backend-deployment.yaml 
kubectl apply -f backend-service.yaml
```

---

### Step 2: Set Up the Python Load Balancer

1. **Download Load Balancer Code**: Obtain `load_balancer.py` and `Dockerfile.loadbalancer`.
2. **Edit the Load Balancer Application**:
- Customize `load_balancer.py` to use round-robin distribution across backend instances.
- **TODO**: Add backend URLs for round-robin distribution and retrieve `user_id` from query parameters.
3. **Containerize the Load Balancer**:
- Edit `Dockerfile.loadbalancer`.
- **TODO**: Replace `<your-dockerhub-username>` with your Docker Hub username when creating the image.
4. **Build and Push the Docker Image**:
```
docker build -t <your-dockerhub-username>/<load-balancer-image-name>:1.0.0 -f Dockerfile.loadbalancer .
docker push <your-dockerhub-username>/<load-balancer-image-name>:1.0.0
```

---

### Step 3: Deploy the Load Balancer on Kubernetes

1. **Edit Load Balancer Deployment and Service Files**:
- Edit `loadbalancer-deployment.yaml` and `loadbalancer-service.yaml`.
- **TODO**: Specify your Docker Hub image in the YAML files, and ensure unique service names if deploying multiple services.
2. **Deploy the Load Balancer**:
```
kubectl apply -f loadbalancer-deployment.yaml 
kubectl apply -f loadbalancer-service.yaml
```

---

### Step 4: Access the Load Balancer and Test Traffic

1. **Access via NodePort**:
- Get the MiniKube IP:
  ```
  minikube ip
  ```
- Access the load balancer using `curl` (replace `<minikube-ip>` with the output from `minikube ip`):
  ```
  curl "http://<minikube-ip>:30080/?user_id=Alice"
  ```

2. **Use `minikube service` (If NodePort Does Not Work)**:
- Create a tunnel to the load balancer service:
  ```
  minikube service flask-load-balancer-service
  ```
- This command will provide a URL, typically in the format `http://127.0.0.1:<some-port>`, which you can use to test the load balancer.
- Send multiple requests and see how each request is being served by a different instance. Show this to the TA. 

3. **Launch MiniKube Dashboard**:
- Open the MiniKube dashboard to monitor the status of Pods, deployments, and services:
  ```
  minikube dashboard
  ```

---

### Step 5: Load Testing with Apache Benchmark (AB)

1. **Run Basic AB Test**:
- Use Apache Benchmark to send a series of requests to the load balancer:
  ```
  ab -n 100 -c 10 "http://127.0.0.1:<some-port>/?user_id=Alice"
  ```
- **TODO**: Replace `<some-port>` with the port provided by `minikube service`.
- This test sends 100 requests (`-n 100`) with 10 concurrent connections (`-c 10`).

  
**Apache Benchmark (ab) is not natively supported on Windows, but you can use alternative approaches to achieve similar load testing functionality. 
Here are two options for Windows users:**

**Option 1**: Use WSL (Windows Subsystem for Linux)
Install WSL: Follow Microsoft’s guide to install WSL if you haven't set it up yet.
Install Apache Benchmark:
Open a WSL terminal (Ubuntu, for example) and run:
```
sudo apt update
sudo apt install apache2-utils
```
Run Apache Benchmark in WSL:
Once installed, you can run the ab command in the WSL terminal:
```
ab -n 100 -c 10 "http://127.0.0.1:<some-port>/?user_id=Alice"
```
**Option 2**: Use an Alternative Load Testing Tool (e.g., curl or Postman Collection Runner)
Using curl
You can use curl in a loop to simulate multiple requests. This isn’t as powerful as Apache Benchmark but can be useful for simple testing.
### Run in PowerShell
  ```
for ($i=0; $i -lt 100; $i++) {
    curl "http://127.0.0.1:<some-port>/?user_id=Alice"
}
  ```
Using Postman Collection Runner
Set Up Request in Postman:

Create a new GET request in Postman with the URL http://127.0.0.1:<some-port>/?user_id=Alice.
Use Collection Runner:

Save the request in a collection.
Open the Collection Runner, set the iteration count (e.g., 100), and run the collection.

2. **Perform High-Load AB Test (Optional)**:
- Increase the request count and concurrency level to simulate high traffic:
  ```
  ab -n 1000 -c 50 "http://127.0.0.1:<some-port>/?user_id=Alice"
  ```
- Observe load balancer performance under high load and check backend Pod distribution.

3. **Observe Load Balancer Logs (Optional)**:
- Monitor the backend logs in real-time to verify that the load balancer distributes requests evenly:

  ```
  kubectl logs -l app=flask-backend -f
  ```

---

## Troubleshooting

- **Minikube IP Issues**: Use `minikube ip` to verify the correct IP.
- **Service Not Accessible**: If NodePort does not work, use `minikube service` to create a tunnel.
- **Backend Logs**: Use `kubectl logs -l app=flask-backend -f` to monitor requests going to the backend.
- **Load Balancer Logs**: Check the load balancer logs to see the request distribution:
   ```
  kubectl logs -l app=flask-load-balancer -f
  ```
- **Image Pull Issues**: Ensure your Docker images are pushed to Docker Hub with the correct tags. [More Details](https://docs.docker.com/get-started/introduction/build-and-push-first-image/)
