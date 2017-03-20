

npm start to start the server


npm install
you will need to install redis

go to redis.io and follow the download instructions

you also need ngrok to expose your server to the internet, so your iphone/android phone can access the endpoints
in the config file
of the client
replace the host url with your ip given to you by ngrok

put ngrok in your  /usr/local/bin

so you can run

ngrok http 8000      8000 is whatever port your npm start server is running on (should be default 8000)


go to your snazr/client/components/config/util.js


sample ngrok ouput
Session Status                online
Version                       2.1.18
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://0db132e7.ngrok.io -> localhost:8000
Forwarding                    https://0db132e7.ngrok.io -> localhost:8000

change the HOST_URL: to the output of your ngrok forwarding address, i.e http://0db132e7.ngrok.io in this case.

then you should be able to make requests on your phone clients that will land on your server




sign up for aws, 



create bucket then in the bucket's permission tab
click bucket policy
then policy generator




in the code snippet where it's a json
pick the right commands to allow


it should look something like this
{
  "Version": "2012-10-17",
  "Principal":{"CanonicalUser":"Amazon S3 Canonical User ID assigned to origin access identity"}
  "Statement": [
    {
      "Sid": "Stmt1489974318330",
      "Action": [
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:GetObjectAcl",
        "s3:GetObjectTagging",
        "s3:GetObjectVersion",
        "s3:GetObjectVersionAcl",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:PutObjectTagging",
        "s3:PutObjectVersionAcl"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::snazr/uploads"
    }
  ]
}



don't worry about bundles, ghetto_client, public folders, those are just to test if servers are running and serves a index.html when you go to localhost, feel free to delete them 