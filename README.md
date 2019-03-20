# Splunk Toolbox - NodeJS edition
_A toolbox for communicating with the Splunk Servers_

## Version = 1.0.3



## Changelog
 - 1.0.0 3/20/2019 3:03 PM EST - initial Proof of concept untested
 - 1.0.1 3/20/2019 3:06 PM EST - bug fix fixed typo in boolean from upper to lowercase
-  1.0.2 3/20/2019 3:16 PM EST - bug fix, added call to set URL in the set settings as final call
-  1.0.3 3/20/2019 3:16 PM EST - bug fix, fixed typo of self in base call and prototyped the setbaseurl function, changed string enclosures

## Example



Below example code updates a ITSI notable event group
```

  var jsonbody = JSON.stringify({'status': '5'})

  var mySplunkServer = new splunkToolbox();

  mySplunkServer.setSettings(paramServerHost='127.0.0.1', paramAuthUsername='admin', paramAuthPassword='changeme', paramManagementPort='8089', paramSslEnabled=True, paramApiVersion='vLatest');

  mySplunkServer.post_update_to_notable_event_group(itsi_group_id='7e-au1327813-a87a', jsonbody=jsonbody ); 
```