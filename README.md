# Tour radar
This is task 2 and 3 of a TourRadar's assignment. To run the feature test you need to do following setup-
```bash
    Node v8.10.0 and NPM 5.6.
        nvm install 8.10.0
        nvm alias default 8.10.0
        npm install -g npm@5.6
```
Verify node and npm installed correctly by running following command
 ```bash       
        node -v
        
        nvm -v
 ```
Install latest chrome driver from [here](https://chromedriver.storage.googleapis.com/index.html).


if you want to check which version of chromedriver is present on your machine then run 
```bash
    which chromedriver
```    
Install cucumber and selenium webdriver globally
```bash
  * npm install cucumber

  * npm install selenium-webdriver
```
Go TourRadar folder from command prompt and run
```bash
  npm install
```
above command will install all the project dependancies on your machine. If you see any error then please check network and proxy settings.

To run all the test
```bash
        npm run cucumber
```

To run the tests which are not marked as @ignore
```bash        
  npm run cucumber -- "--tags=not @ignore"
```