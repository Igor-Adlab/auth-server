Auth Server

Example of **settings.json**:
```json
{
     "domain": "http://***",
     "callbackUrl": "http://***",
     "providers": {
       "vkontakte": {
         "client": "***",
         "secret": "******",
         "args": {
           "test_mode": 1
         }
       },
       "google": {
         "client": "***",
         "secret": "******",
         "args": {
           "scope": ["profile"]
         }
       },
       "facebook": {
         "client": "***",
         "secret": "******",
         "args": {
           "authType": "rerequest",
           "scope": ["email", "user_about_me", "public_profile"],
           "profileFields": ["id", "displayName", "photos", "email"]
         }
       },
       "twitter": {
         "client": "***",
         "secret": "******",
         "args": {}
       }
     }
   }
```