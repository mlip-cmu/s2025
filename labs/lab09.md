# Lab 9: Kubernetes
In Lab 9, we will explore the fundamental aspects of deploying and managing applications in Kubernetes. You'll learn how to create and apply deployment and service configurations, perform updates, and observe Kubernetes' self-healing and autoscaling mechanisms in action.

To receive credit for this lab, show your work to the TA during recitation.

## Deliverables
- [ ] Show the TA the logs of one Pod in the MiniKube dashboard
- [ ] Explain to the TA how Kubernetes deploys updates
- [ ] Show a screenshot of the crashed Pod(s)

## Getting started
- Start Docker
- Install MiniKube https://minikube.sigs.k8s.io/docs/start/ (i.e. `brew install minikube` for MacOS)
- Start MiniKube with `minikube start`
- Run `kubectl get po -A` to check that MiniKube is running and to show stats

## 1. Apply the Deployment and Service files
In Kubernetes, a `deployment.yaml` is needed to manage the desired state of your application, specifying how many replicas of a pod should be running and how they should be updated, providing declarative updates, scalability, and self-healing mechanisms. 

The `service.yaml` abstracts the access to the pods, providing a stable endpoint for communication, load balancing, and service discovery. Together, these configurations ensure that your application is reliably deployed, maintained, and accessible within the Kubernetes cluster, allowing it to be scaled and managed efficiently.

- Familiarize yourself with the two files [deployment.yaml](https://github.com/marliesgoes/mlip-kubernetes-lab/blob/6a9e180b41bd7718b73a55193ac7f5821290645b/deployment.yaml) and [service.yaml](https://github.com/marliesgoes/mlip-kubernetes-lab/blob/6a9e180b41bd7718b73a55193ac7f5821290645b/service.yaml).
- Either [clone the repo](https://github.com/marliesgoes/mlip-kubernetes-lab/) or download just the two yaml files (you won't need the other stuff in the repo). 
- Edit the `service.yaml` and give your service a name.
- Apply both files with the following commands:
    - `kubectl apply -f deployment.yaml`
    - `kubectl apply -f service.yaml`
- Your new service should now show up at `kubectl get services`

## 2. Start the Service
- Run `kubectl get services` to check the available services. One of them should be your created service of type `NodePort`
- Launch the service with `minikube service <my-fun-service-name>`
- Launch the MiniKube dashboard with `minikube dashboard`
- Open the displayed URL to test the app. You can see the code for the app in [app.py](https://github.com/marliesgoes/mlip-kubernetes-lab/blob/6a9e180b41bd7718b73a55193ac7f5821290645b/app.py). All it does is counting the number of GET-requests and displaying the average requests per second during the past 10 minutes. Reload the page a couple of times to see the effect.
- **Deliverable:** Explore the dashboard and find out how to view the logs of a certain Pod.

## 3. Deploy an Update
With Kubernetes we can seemlessly deploy an update of our app. There is an updated version of the flask app available in the Docker registry. All you have to do, is change the version number in your deployment.

- In your `deployment.yaml` you can see that we have currently deployed the Docker image with version `1.0.0`. Go to the dashboard and locate the version number in the image name. Verify that it is indeed `marliesgoes/mlip-kubernetes-lab:1.0.0`.
- Update the version in the `deployment.yaml` to `1.0.1`. 
- **Deliverable:** Apply the changes with `kubectl apply -f deployment.yaml` and directly switch back to the dashboard. Observe how Kubernetes deploys the update and explain to the TA what happened.

## 4. Test Auto-Restarts
When something unexpected happens and our server crashes, Kubernetes automatically restarts the affected system.

- **Deliverable:** Call the crash-endpoint to simulate a crashed server `<endpoint>/crash`. Quickly switch to the dashboard and take a screenshot of the crashed pods.
- Watch the pods restart.

## Optional if you're bored: Enable Autoscaling with Kubernetes

### Stresstest Application
- Use a tool to programmatically call the server many times. For example use `ab -n 1000 -c 10 <endpoint>` to incrementally run up to 1000 API calls. Reload the page to see the effect.
- See how it affects CPU usage with the dashboard.

### Launch Autoscaling
- Get the latest version of the metrics-server addon with `kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml`
- Enable the addon with `minikube addons enable metrics-server`
- Check that metrics-server is active `kubectl get deployment metrics-server -n kube-system`
- Setup autoscaling to automatically launch more pods if necessary. Use the following command and fill out the parameters: `kubectl autoscale deployment <deployment-name> --min=<#min-pods> --max=<#max-pods> --cpu-percent=<trigger-threshold>`
    - deployment-name: Find deployment name in the `deployments.yaml`
    - #min-pods: Decide on how many pods you want to start at least
    - #max-pods: Decide on how many pods you want to start at most
    - trigger-threshold: Decide on how much percent of the CPU has to be used to trigger the autoscaler
- Run `kubectl get hpa` to show the status of your autoscaler.

### Stresstest Application Again
- Run the stresstest again and check the dashboard.
- **Deliverable:** Take a screenshots of the list of Pods to show that the system auto-scaled.


## Troubleshooting
- `kubectl get pods` to show running pods
- `kubectl logs <affected-pod-id>` to show error message of crashed pod
- `kubectl delete pods -l app=flask-app` to delete pods