# CodeStars Evaluator Microservice
- This microservice is a part of the Codestars (Online Judge Project).

### Links to other Project Components:
- ***Microservices:***
    1. <a href="https://github.com/SCube27/CodeStars_Problem_Service">CodeStars Problem Service</a>
    2. <a href="https://github.com/SCube27/CodeStars_Submission_Service">CodeStars Submission Service</a>

- ***Frontend:***
    1. <a href="https://github.com/SCube27/CodeStars_Frontend">CodeStars Frontend</a>

### Tech Stack Used:
- TypeScript
- Node.js
- Express
- Redis (BullMQ)
- Docker

## Functions of this Microservice:
1. The functioning of this microservice is solely based on evaluating the problem submission forwarded by the submission service and giving a verdict on it.

2. A *Redis* queue is integrated using *BullMQ* that stores the problem submissions given by the submission service, this service picks the jobs from the queue and evaluates them.

3. This service picks up the submission job from the queue, detects the programming language of the submission and accordingly spins up a Docker Container to run the program.

4. If the problem is executed, string matching between the *Container Output* and *TestCases* happen and verdict is given else if problem is not executed then associated error is given.

- [**NOTE**] Currently 3 language submissions are supported at the Backend namely *C++*, *Java* and *Python*.

## Installation & Setup:
1. Clone the repository locally:
```
git clone https://github.com/SCube27/CodeStars_Evaluator_Service.git 
```

2. Install the dependencies:
```
npm install
```

3. Setup a `.env` file according to the `template.env` given.

4. Start the Server:
```
npm run dev
```

**If the project interests you a star to the repository and other associated repositories would be appreciated.**