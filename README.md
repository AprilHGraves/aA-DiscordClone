# Overview

[See it on Heroku](https://conflict-discord-clone.herokuapp.com)

Conflict is a single-page Discord clone. Like Discord, people can create and join servers, where they can discuss a variety of topics in separate channels. Server owners can invite other users to join their servers by generating invite links, which can be customized to have a set duration or max-use limit. People can paste the invite link in the url or when adding a server to join.
 
* Rails and Postgres backend
* React Redux js frontend
* jQuery for ajax calls to my API
* AWS s3 storage for photo-hosting

![Splash Page Gif](https://i.imgur.com/O76XJ1r.gif)

# Features
 
### Users
* Users register with an email, username, and password (protected by BCrypt)
* Users use their emails and passwords to login / logout.
* Users can share usernames. They are differentiated by their unique tags (ex: "demoUser#8174")
* Users can change their usernames, emails, passwords, and avatar picture

![Change_User_Info Gif](https://i.imgur.com/aqgfACc.gif)

### Servers
* Each server has a name and picture
* Server owners can change a server's name and picture
* Server owners can delete their servers
* Server members can leave servers
* A server's members can set a nickname to be displayed for that server

![Server_Demo_Gif](https://i.imgur.com/NlATABZ.gif)

### Channels
* Servers have channels with names and topics
* Server owners can add and delete channels
* Server owners can change their channel's information

![Channel Demo Gif](https://i.imgur.com/KQyD8jS.gif)

### Invite Links
* Server owners can generate invite links
* Each invite link is unique and is associated with the channel it was created in
* Server owners can create invite links with a set duration and/or max-use limit
* Server owners can see invites for a server or for a channel in the relevant settings
* The invites displayed in the settings show their codes, creators, number of times used, max-use limit if present, and expiration countdown if present.
* Server owners can delete invites
* Users can join a server by using the invite link in the url or when adding a server
![Invite Demo Gif](https://i.imgur.com/cFrpAkr.gif)

### Messages
* Server members can create messages in channels
* The message owner can edit the message
* The server owner or the message owner can delete a message
* Messages show their creator's avatar picture and nickname or username
* Messages show the time created if it is on the same day. Otherwise, they show their date created.

![Message Demo Gif](https://i.imgur.com/smz1yQM.gif)

# Future Directions
* Create Direct Messages
* Add friends feature
* Use socket.io to update messages in real-time


