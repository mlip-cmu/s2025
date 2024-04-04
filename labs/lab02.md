# Lab 2: Kafka for Data Streaming

In this lab, you will gain hands-on experience with Apache Kafka, a distributed streaming platform that plays a key role in processing large-scale real-time data. You will establish a connection to a Kafka broker, produce and consume messages, and explore Kafka command-line tools. This lab will prepare you for your group project, where you'll work with Kafka streams. 

To receive credit for this lab, show your work to the TA during recitation.

## Deliverables
- [ ] Establish a secure SSH tunnel to the Kafka server. Explain to the TA about Kafka Topic and Offsets. How do they ensure message continuity if a consumer is disconnected?
- [ ] Modify starter code to implement producer and consumer modes for a Kafka topic.
- [ ] Use Kafka's CLI tools to manage and monitor Kafka topics and messages.


## Getting started
- Clone the starter code from this [Git repository](https://github.com/tanya-5/mlip-kafka-lab/).
- The repository includes a python notebook for Kafka producer and consumer model.
- Install the Kafka Python package by running:  
  `python -m pip install kafka-python`

## Connecting to Kafka server
1. Use SSH to create a tunnel to the Kafka server:  
   `ssh -L <local_port>:localhost:<remote_port> <user>@<remote_server> -NTf`
2. Test the Kafka server connection to ensure it's operational.

## Implementing Producer-Consumer Mode
### 1. Producer Mode: Writes Data to Broker
Refer TODO sections in the script. Edit the bootstrap servers and add 2-3 cities of your choice. Run the code to write to Kafka stream.

### 2. Consumer Mode: Reads Data from Broker

Use the notebook in this repository as starter code: https://github.com/tanya-5/mlip-kafka-lab/tree/main 

Modify the TODO section by filling appropriate parameters/arguments in the starter code. Verify `Kafka_log.csv`.  

Ref: [KafkaProducer Documentation](https://kafka-python.readthedocs.io/en/master/apidoc/KafkaProducer.html)   
  [KafkaConsumer Documentation](https://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html)

## Using Kafka’s CLI tools
Kcat is a CLI (Command Line Interface). Previously known as kafkacat.  
Install with your package installer such as:
- macOS: `brew install kcat`
- Ubuntu: `apt-get install kcat`
- Note for Windows Users: Setting up kcat on Windows is complex. Please work in pairs with someone with mac/Ubuntu during recitation for this deliverable. The purpose is to understand CLI which will be helpful in the group project for using Kafka on Virtual machines (Linux based).

Using the kcat documentation, write a command that connects to the local Kafka broker, specifies a topic, and consumes messages from the earliest offset. 

Ref: [kcat usage](https://docs.confluent.io/platform/current/app-development/kafkacat-usage.html)   
  [kcat GitHub](https://github.com/edenhill/kcat)   

## Optional but Recommended
For your group project you will be reading movies from the Kafka stream. Try finding the list of all topics and then read some movielog streams to get an idea of what the data looks like:  
`kcat -b localhost:9092 -L`

## Additional resources
- [Apache Kafka](https://kafka.apache.org/)
- [Kafka for Beginners](https://www.cloudkarafka.com/blog/2016-11-30-part1-kafka-for-beginners-what-is-apache-kafka.html)
- [What is Apache Kafka? - TIBCO](https://www.tibco.com/reference-center/what-is-apache-kafka)
- [Kafka Introduction Video 1](https://www.youtube.com/watch?v=PzPXRmVHMxI)
- [Kafka Introduction Video 2](https://www.youtube.com/watch?v=JalUUBKdcA0)

