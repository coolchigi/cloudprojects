<p align="center">
  <h1 align="center"><b> API with OpenAPI & AWS SAM </b></h1>
</p>



<details open="open">
  <summary><h2 style="display: inline-block">Project Details</h2></summary>
  <ol>
    <li><a href="#readme-goal">ReadMe Goal</a>
    <li><a href="#tech-stack">Tech Stack</a>
    </li>
    <li><a href="#project-description">Project Description</a></li>
    <li><a href="#sam-cli">SAM CLI</a></li>    
    <li><a href="#lambda-function">Lambda Function</a></li>
    <li><a href="#api-gateway">API Gateway</a></li>
    <li><a href="#javascript">JavaScript</a></li>
    <li><a href="#improvements">Improvements</a></li>
    <li><a href="#challenges-closing">Challenges & Closing</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


### ReadMe Goal
---------------------
The goal of this readme is to serve as a guide for others willing to build something similar. Whenever I am working on a project or following along with a tutorial, I always try to add my own twist. So if you're looking to follow along, hope you have your troubleshooting hats on because this is not your usual step-by-step guide. I am going to create a `Challenge` section where I'll turn all the issues I encountered into their own mini challenges. It wont be anything too complex..hopefully


### Tech Stack
------------------
- AWS SAM
- AWS Lambda
- API Gateway
- JavaScript
- GitHub Actions (CI/CD) using SAM Pipelines


### Project Description
-----------------
This is the [TBD]

## SAM CLI
<a href="https://github.com/coolchigi/Cloud-Projects/blob/main/openapi-sam/openapi.yaml">openapi.yaml</a>
-> 
This is an OpenAPI 3.0.1 specification file for an API Gateway in AWS. Let's break it down:

- `openapi: "3.0.1"`: This line specifies the version of the OpenAPI specification that the document is using.

- `info`: This section provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.

- `paths`: This section describes the available paths and operations for the API.

- `/pricepermeter`: This is the endpoint of the API. It supports a `POST` operation.

- `post`: This section describes the details of the `POST` operation on the `/pricepermeter` endpoint.

- `consumes` and `produces`: These fields specify the MIME type of the data that the API can consume and produce.

- `responses`: This section describes the possible responses from the `POST` operation.

- `x-amazon-apigateway-integration`: This is an extension provided by AWS to integrate the API with other AWS services. In this case, it's integrating with a Lambda function.

- `httpMethod: "POST"`: This specifies that the integrated service will be invoked using a `POST` request.

- `credentials`: This field is used to specify the credentials required to call the integrated service. Here, it's using an AWS IAM role.

- `uri`: This is the URI of the integrated service. Here, it's a Lambda function.

- `responses`: This section describes the possible responses from the integrated service.

- `passthroughBehavior: "when_no_match"`: This field determines how the request data will be passed to the integrated service when the request does not match any of the specified request parameters.

- `type: "aws"`: This specifies that the integrated service is an AWS service.


### Lambda
The functions defined in this repo are Lambda functions


## Trouble Shooting
### Problem Fix
```bash
"CloudWatch Logs role  
ARN must be set in     
account settings to    
enable logging         
(Service: ApiGateway,  
Status Code: 400,      
Request ID: 4b2ae96e-  
27d4-433b-948d-4f933a05499)"         
(RequestToken: eb3dab7 
c-86f8-06e5-35a7-fa1a1e2b1e65,          
HandlerErrorCode:      
InvalidRequest) 
```

<table>
  <tr>
    <th>Problem</th>
    <th>Solution</th>
  </tr>
  <tr>
    <td><code>CloudWatch Logs role ARN must be set in account settings to enable logging</code></td>
    <td><code>https://repost.aws/knowledge-center/api-gateway-cloudwatch-logs</code></td>
  </tr>
  <tr>
    <td><code>File with same data already exists at first-api/760ba5cba701dfdebe1c5b2edb6757b6.template, skipping upload </code></td>
    <td><code>Delete the stack using either `aws cli` or the console</code></td>
  </tr>
  <tr>
    <td><code>All the above</code></td>
    <td>  <a href="https://github.com/coolchigi/Cloud-Projects/blob/main/openapi-sam/template.yaml"><code>template.yaml</code></a></td>
  </tr>
</table>


### API GATEWAY
....
#### Test Your API
```json
{
    "price": "400000",
    "size": "1600",
    "unit": "sqFt",
    "downPayment": "20"
}
```
----
<h1>Result</h1>
<img src="assets/api-gateway-image.png" alt="Expected Result" width="500" height="200">

#### BUILD A MODEL
- We can build a model to represent the schema of the incoming request and response messages. We could also validate and transform the incoming request message to match a Lambda spec.

```yaml
components:
    schemas:
        costCalculatorRequest:
            type: object
            properties:
                price:
                    type: number
                size:
                    type: number
                unit:
                    type: string
                downPayment:
                    type: number
```
<h3>Code Breakdown:</h3>
<ul>
<li> components: This is a section for defining reusable components such as schemas, parameters, responses, etc. </li>
<li> schemas: This is a section for defining schemas.</li>
<li> costCalculatorRequest: This is the name of the schema being defined.</li>
<li>type: object: This indicates that the costCalculatorRequest is an object.</li>
<li>properties:: This section defines the properties of the costCalculatorRequest object </li>
<li>price, size unit, downPayment: These are the properties of the costCalculatorRequest object. 
            Each property has a type: field that specifies the data type of the property. For example, price and size are numbers, unit is a string, and downPayment is a number.</li>
</ul>

#### REQUEST VALIDATION
Request validation is used to ensure the incoming request is properly formatted and contains proper attributes. You can set up request validators in an API’s OpenAPI  definition file and then import the OpenAPI  definitions into API Gateway

<h3 style="color:blue;"> <strong>Create and configure request validators for your first API </strong> </h3> 

The following YAML code is part of an AWS API Gateway configuration in an OpenAPI specification file. It's defining request validators that are used to validate incoming requests to the API.

- `x-amazon-apigateway-request-validators`: This is a custom extension provided by AWS API Gateway. It's used to define request validators. In this code, three validators are defined: `All`, `Body`, and `Params`.

  - `All`: This validator is configured to validate both the request body and request parameters. This is indicated by `validateRequestBody: true` and `validateRequestParameters: true`.

  - `Body`: This validator is configured to validate only the request body and not the request parameters. This is indicated by `validateRequestBody: true` and `validateRequestParameters: false`.

  - `Params`: This validator is configured to validate only the request parameters and not the request body. This is indicated by `validateRequestBody: false` and `validateRequestParameters: true`.

- `x-amazon-apigateway-request-validator`: This is another custom extension provided by AWS API Gateway. It's used to set the default request validator for the API. In this code, `Body` is set as the default request validator. This means that, by default, only the request body will be validated for all API endpoints unless specified otherwise.


Here are the changes that was made: 
[Updated openapi.yaml](https://github.com/coolchigi/Cloud-Projects/blob/5a1fb72aaf0d51de89e7458fe5e4615ad94dbaf6/OpenApi-sam/openapi.yaml#L7)     



Read More here
- [Components Object](https://spec.openapis.org/oas/v3.1.0#components-object)
- [Schemas Object](https://spec.openapis.org/oas/v3.1.0#schemaObject)