# Education


* **First Class Hons MEng in Applied Cybernetics, University of Reading.**
* 3 A-levels (3 A), Dr Challoner's Grammar School, United Kingdom.
* 12 GCSEs (6 A*, 4 A), Dr Challoner's Grammar School, United Kingdom.

# Publications

#### **Modular non-computational-connectionist-hybrid neural network approach to robotic systems.**
   Paladyn. Journal of Behavioral Robotics.
   February 6, 2012
   URL: <https://link.springer.com/article/10.2478/s13230-012-0003-6>

#### **Cavalcade neural network for mobile robot.**
   Cybernetic Intelligent Systems, 7th IEEE International Conference,
   September 1-2, 
   URL: <http://ieeexplore.ieee.org/document/5898087/>

# Professional Experience


#### 2015-today
### **Lead Research and Development engineer at import.io**
   import.io is a start-up of 10-50 employees that specializes in making it easy for non-technical users to gather and structure data from the web.
    I have worked at import.io since it was founded in 2012. I have worked mainly on designing and creating innovative technologies to generate a leading edge over any competitors. I have worked mainly in Java when building infrastructure and backend projects, and Python when doing Machine Learning.
   Some of the projects of which I have had significant input and I have enjoyed working on:
- **Bees** - import.io's highly distributed and scalable querying and   messaging platform. Bees handles many challenges that are faced     when building a distributed web extraction system, such as variable and unknown network latency, 
asynchronous IO across multiple servers and thousands of endpoints, pipelining and sorting of sparse data sets and collation of data from multiple sources.

    Bees also had to record and supply metrics for the business such as success rates, per-user statistics and billing information.
Uses technologies such as *Spring, Redis, S3, EC2, ElasticBeanstalk, CloudFormation and Docker*
- **Label Suggestion** - A statistical model that would return the "most likely next label" that a user would chose for a data column given the previous data columns the user had inputted. 
Label suggestion used some highly optimized BLAS libraries to quickly infer probabilities over a large data set of manually labelled training data.
- **Deep Learning** - Research projects with deep learning and web data extraction. For example I worked on several page classification approaches using Recurrent Neural networks and Recursive Neural networks. 

    Additionally I worked on data point recognition where i worked to develop algorithms that would classify where there were datapoints in a webpage and then classify what label those data points should be given.
The research was performed using a few different deep learning libraries; deeplearning4j, neon, keras (experimenting with tensorflow and theano). 

#### 2012-2015
### **Software Engineer at import.io**
Before the machine learning and algorithm team was created at import.io, We were a small team of 3-5 engineers. At this time I mainly worked on the main Java codebase. 
Some of the projects of which I have had significant input and I have enjoyed working on:
- **"Magic"** - An algorithm that finds and extracts lists of records in a webpage. This product made use of several different matching and allocation techniques such as Jaccard distance, 
Hirschberg's algorithm and Munkres(Hungarian) algorithm. The average time to detect and extract the top "most likely" tables was less than a second. 
*The success of this project lead me to become the Lead Research and Development engineer.*
- **Object Store** - A distributed platform for storing and retrieving data objects from an underlying database, originally a Percona SQL database was stored, with binary attachment storage on amazon S3, Later this was migrated to use amazon auroraDB. 
- **Job Service** - The precursor system to "bees", handled 200 user web extraction requests a second, distributing the requests around a cluster of 50 servers at full scale. Used Hazelcast for distributed map and queueing system.
      
#### 2010-2012
### **CTO at TouchGo Technology**
- Responsible for the development and integration of all technologies involved in the vending machine which won the Auto Vending Innovation Award 2010 for Machine Intelligence.

# Open Source Contributions


- **deeplearning4j/nd4j**
   Helped to write one of the first versions of GPU interfacing for the deep learning 4 java 
    library developed by skymind.io <skymind.io>

   Commits: <https://github.com/deeplearning4j/nd4j/commits?author=Bam4d>

- **Neon**
   Added a statistics callback which contains precision and recall metrics for multi-label classification problems.
  
   Commits: <https://github.com/NervanaSystems/neon/commits?author=Bam4d>

Personal Projects
=================

- **BLIF**
:   The successor to Neuretix, a spiking neural network library that takes inspiration from gradient descent based learning techniques in deep learning and applies it to the same leaky integrate and fire models that neuretix uses. 
:   This project is a work in progress and supercedes the Neuretix project.
:   Github: <https://github.com/Bam4d/BLIF>

 - **Roxxy**
:   A headless rendering engine that wraps the Chromium embedded framework with Facebook's proxygen libraries. This allows a browser to act as a server, requesting full rendered web pages using an API. It also allows multiple web requests to be         made in parallel.
:   Github: <https://github.com/Bam4d/Roxxy>

 - **Neuretix**
:   A spiking neural network implementation using the models I developed as part of my two publications.
    Neuretix uses a novel ring-buffer data structure to queue spikes. This allows computational complexity of forward pass updates reduce from 'O(n^2)' to 'O(n)', where 'n' is proportional to the number of neurons firing at a single time step.
:   Github: <https://github.com/Bam4d/Neuretix>

 - **Neural Stacks (Keras deep learning library)**
:   Although I did not contribute this implementation back to the Keras group, I enjoyed implementing the differentiable stack algorithm and seeing it work.
:   Github: <https://github.com/Bam4d/keras/tree/neural-stack>

# Key Skills

 - **Python**
   I have worked with python in many different types of projects, from research with deep learning libraries such as neon, keras, theano, tensorflow and scikitlearn; To building REST API services using 
   libraries such as Flask when productionizing machine learning models.

 - **Java**
   I am proficient in Java 8 paradigms such as futures, streams, lambdas and fluent APIs. I have also been following the release notes for java 9 and have started incorporating Reactive streams (Spring Project Reactor) into the
   code that I am working on.
   I have used Spring, SpringBoot, Hazelcast, Jedis, Jackson, Lettuce, Jetty 8/9, mockito, cucumber, gherkin and Google libraries such as Guava, Lombok and Futures.

 - **Amazon AWS**
   I have used a large number of features of amazon aws while at import.io and in some personal projects. I am comfortable with using Lambda, CloudFormation, ECR, ECS, ElasticBeanstalk, Route53, S3, EC2, Redshift, AuroraDB and ElastiCache

 - **C/C++**
   Neuretix, Roxxy and a few other of my personal projects and open source contributions not mentioned here have been in C/C++. C++ is probably my favourite programming language. It allows you to squeeze performance out of many algorithms and 
   programming methods where other programming languages are too restrictive.