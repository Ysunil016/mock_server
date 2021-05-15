<!-- Mock Server -->
## Mock Server

### Reason for Existence 

1. Mock Server, which often updates itself with some live field.
2. Mock Server, which rolls out faster, and can run on multiple ports, based on the requirement.
3. Mock Server, which just needs minimal configuration in one place.

### Offering from this Mock Server

1. Well-defined, config structure.
2. Default, Service endpoint, that updates the mocking data.
3. Upon successful update of mocks, the server automatically restarts.
4. Single, file configuration.
5. Entire mocking servers start within few seconds.
6. Mocking supports for regex validation over API.

### Prerequisites

In order to run the server, follow the steps - 
* Node
  ```sh
  brew install node
  ```
* Yarn
  ```sh
  brew install yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Ysunil016/mock_server.git
   ```
2. Install Node Modules packages
   ```sh
   yarn install
   ```
3. Modify the data.json, as per your need. <br><br>

4. Start the Sever
   ```sh
   node init.js
   ```
### Default Ports - 
```shell
   Mock Update Server PORT - 7890
   
   Mock_One PORT           - 3001  
   
   Mock_Two PORT           - 3002  
```

### Default Endpoints 
```shell
   Mock Update Server End Point - 7890
        `/mock_update`, updates the configuration based on latest data fetched from live calls.
   
   Mock_One PORT - 3001  
        `/home`, gets the mocked response and status code, for 3001, server configuration
            
   Mock_Two PORT - 3002  
        `/home`, gets the mocked response and status code, for 3002, server configuration
```
### Docker



### Dependencies

1. Express
2. Body-Parser
3. doenv
4. Axios
