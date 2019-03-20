var request = require('request');


function splunkToolbox() {
    this.serverHost = 'localhost';
    this.authUsername = 'admin';
    this.authPassword = 'changeme';
    this.managementPort = '8089';
    this.sslEnabled = true;
    this.apiVersion = 'vLatest';
    this.fullUrl = 'http://'
  }

  this.set_base_url = function() {
      //Sets the Splunk base URL
    if (self.sslEnabled == false){
        //if mngmt port is 80 unecrypted http
        this.fullUrl = "http://"+this.serverHost;

        if (toString(this.managementPort) == '443'){
            throw new Error('Cannot use port 443 with non https schema for a management port.');
        }
        else if (toString(this.managementPort) == '80'){
            //pass
        }
        else {
            this.fullUrl = this.fullUrl + ':'+(toString(this.managementPort));
        }//end else
    }
    else {
        // if ssl == true
        this.fullUrl = 'https://'+this.serverHost;
        if (toString(this.managementPort) == '443'){
            //pass
        }
        else if (toString(this.managementPort) == '80'){
            throw new Error('Cannot use port 80, which is non https,  with https/ssl schema. ');
        }
        else {
            this.fullUrl = this.fullUrl + ':' + toString(this.managementPort);
        }//end else

    }//end if SSL == true
  }; //end set_base_url method



  splunkToolbox.prototype.setSettings = function(paramServerHost, paramAuthUsername, paramAuthPassword, paramManagementPort, paramSslEnabled, paramApiVersion, paramFullUrl) {
    if (paramServerHost !== null && paramServerHost !== ''){
        this.serverHost = toString(paramServerHost);
        console.log('Set parameter server host');
    }
    if (paramAuthUsername !== null && paramAuthUsername !== ''){
        this.authUsername = toString(paramAuthUsername);
        console.log('Set parameter Authentication username');
    }
    if (paramAuthPassword !== null && paramAuthPassword !== ''){
        this.authPassword = toString(paramAuthPassword);
        console.log('Set parameter Authentication password');
    }
    if (paramManagementPort !== null && paramManagementPort !== ''){
        this.managementPort = toString(paramManagementPort);
        console.log('set Parameter setting management port');
    }
    
    if (paramSslEnabled !== null && paramSslEnabled !== ''){
        this.sslEnabled = paramSslEnabled;
        console.log('set Parameter SSL enabled');
    }
    if (paramApiVersion !== null && paramApiVersion !== ''){
        this.apiVersion = paramApiVersion;
        console.log('set Parameter ApiVersion enabled');
    }

  };


  splunkToolbox.prototype.post_update_to_notable_event_group = function(itsi_group_id, json_body) {
    console.log('Starting post update to notable event/episode group in Splunks ITSI');
    auth = "Basic " + new Buffer(this.authUsername + ":" + this.authPassword).toString("base64");
    itsi_full_url = this.fullUrl + 'servicesNS/nobody/SA-ITOA/event_management_interface/notable_event_group/'+ toString(itsi_group_id) + '/?is_partial_data=1';
    request.post({
        url: itsi_full_url,
        headers: {
            "Authorization" : auth,
            'content-type' : 'application/json'
        }, 
        form: json_body,
        json: true,
        function (error, response, body){
            if (error){
                console.log(error);
            } else {
                console.log('No error');
            }
            if (response){
                console.log(response);
            } else{
                console.log('No response');
            }
            if (body){
                console.log(body)
            } else {
                console.log('There was no body in the response');
            }
        }//end response handler function

    });
  };
  
  var jsonbody = JSON.stringify({'status': '5'})

  var mySplunkServer = new splunkToolbox();

  mySplunkServer.setSettings(paramServerHost='127.0.0.1', paramAuthUsername='admin', paramAuthPassword='changeme', paramManagementPort='8089', paramSslEnabled=True, paramApiVersion='vLatest');

  mySplunkServer.post_update_to_notable_event_group(itsi_group_id='7e-au1327813-a87a', jsonbody=jsonbody ); 