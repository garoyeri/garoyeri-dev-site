---
title: Sample JavaScript Application Part 2 - Data Modeling
type: post
date: 2020-04-19
tags: ["javascript", "firebase", "google", "series-samplejavascript"]
excerpt: |
  In the last segment, we implemented a simple map user interface we could use to find certain areas on the map and show markers for them. This time, we'll look at connecting a database to the backend, allowing us to click on the map to add comments to a latitude / longitude coordinate on the map, then allow others to see all the data that's been added to the map. We won't implement login yet, but leave it open for now.
---

## Overview ##

In the last segment, we implemented a simple map user interface we could use to find certain areas on the map and show markers for them. This time, we'll look at connecting a database to the backend, allowing us to click on the map to add comments to a latitude / longitude coordinate on the map, then allow others to see all the data that's been added to the map. We won't implement login yet, but leave it open for now.

If you're just seeing this, you should start with the first article in the series instead: [Sample JavaScript Application Introduction](sample-javascript-application-introduction).

These instructions assume you're starting from the application we setup in the previous article: [Sample JavaScript Application Frontend Part 1](sample-javascript-application-frontend-1). If you don't have that handy, you'll need to follow the instructions in the previous article to get a project configured that points to your own Firebase project on Google Cloud.

## What is the Google Cloud Firestore Database? ##

According to the [Cloud Firestore Documentation](https://firebase.google.com/docs/firestore):

> Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform. Like Firebase Realtime Database, it keeps your data in sync across client apps through realtime listeners and offers offline support for mobile and web so you can build responsive apps that work regardless of network latency or Internet connectivity. Cloud Firestore also offers seamless integration with other Firebase and Google Cloud Platform products, including Cloud Functions.

For our purposes, it is a place we can securely store comments people post about certain map coordinates, then access them from our Firebase web application. Cloud Firestore can restrict access to the database so that it can only be accessed from your web application.

Cloud Firestore is referred to as a "NoSQL" database in that data is organized as "documents" instead of "tables". The discussion of "SQL" versus "NoSQL" is a bit out of range for this article, so I'll stick to what it means to use Cloud Firestore. What you need to know is that data is organized in "collections" that contain sets of "documents". These "documents" can be pretty much anything, but let's start with an example that is appropriate for the subject matter at hand: storing comments from users about locations on a map.

## Modeling User Interactions ##

### Labeling our Users ###

Before we can start modeling our database, we need to understand how we expect our users to use the application. Some people like to start hacking away at the code and the data, but prior planning prevents pretty poor performance (or so I've heard). Let's first think about the types of users we will have in this simple application. I expect three types of users:

1. **Readers:** users who want to see what data has been added to the map. They most likely won't be logged into the application and will want to search and see data without providing any of their own personal information.
2. **Writers:** users who want to add and edit comments about data on the map. They will need to be logged in (not in this episode, but next time) so that we can be sure they are only editing their own comments.
3. **Superusers:** users who manage the system and can add and edit any comments. They will need to be logged in (again, next time) so that we can be sure who is allowed to be this user.

Labeling your model users is a common practice so that your team can refer to users with the same vocabulary to avoid confusion. If everyone used a different word to refer to the "Writers", it could lead to granting inappropriate permissions to them.

### User Flows ###

"User Flows" are the different sets of actions we expect users to perform to achieve their desired outcomes. This is like writing a script for each user to follow that describes what they should do, and the order in which to do it. "User Flows" help us better understand the goals of our users and how we expect them to fulfill those goals. We can use a particular sentence structure to explain these flows in executable terms: "given" "when" "then".

For example: **Given** that the user is not logged in, **when** they browse the map by dragging it around, **then** they will see the locations that have comments indicated as markers on the map.

We can chain these together to describe a whole flow as well:

* Given that the user is not logged in
  * When they browse the map by dragging it around
    * Then they will see the locations that have comments indicated as markers on the map
  * When they click or tap on a marker on the map
    * Then they will see a popup with a list of public comments about that location
  * When they search the map
    * Then they will see a list of the search match locations as markers on the map

The biggest benefit here is that we can follow along with the user as they try different things. You can think about how you can expand the capabilities of the user. This case also describes what we would expect a "Reader" user to do, given that they are not logged in.

Let's think about the User Flow for a "Writer". At a glance, I would expect that the "When" statements in the above section would apply the same for a logged in user as well, but with some extra capabilities. We can "cheat" a little bit by using a "Given" statement that expects a "Then" to have already been done. See how that works in the following User Flows:

* Given that the user is either logged in or not
  * When they browse the map by dragging it around
    * Then they will see the locations that have comments indicated as markers on the map
  * When they click or tap on a marker on the map
    * Then they will see a popup with a list of public comments about that location
  * When they search the map
    * Then they will see a list of the search match locations as markers on the map
  * Given that the user is looking at the comments for a marker
    * When the marker contains no comments
      * Then the user will see a message indicating "no comments added"
    * When the marker contains more than 5 comments
      * Then the user will only see the most recent 5 comments

* Given that the user is logged in
  * Given that the user is looking at the comments for a marker
    * When the user clicks "Add a Comment"
      * Then they will be allowed to enter a comment for that location
    * When the user clicks "Edit" next to one of their own comments
      * Then they will be allowed to edit the specific comment
    * When the user clicks "Delete" next to one of their own comments
      * Then they will be asked to confirm deletion of the comment, then it can be deleted
    * When the users looks at the list of comments
      * Then they will only see "Edit" and "Delete" icons next to their own comments

This covers a lot of simple cases, and we can walk through each case manually to verify that it works. Next, as we think about our data model, we need to think about how it supports the actions that we want the user to be able to perform.

## Modeling the Data ##

When working with the Google Cloud Firestore service, we need to think about our "collections", "documents" and "queries".

* Collection: a named organizational unit that contains documents
* Document: a set of key-value pairs, where key is a name, and the value is a number, a string, a boolean, a complex object, or a list of any of these
* Query: how we plan to ask the service to restore the data we're looking for

Your first instinct will be to make some collections and documents to structure the data, then figure out the queries last. However, with "NoSQL" databases, this approach can lead to bad designs. Think of your queries first, then we can define the collections and the documents. We do it in this order because a query can only span one collection, so we need to be careful about how we store our documents.

### Queries ###

Thinking back to our User Flows, there some similar "Then" statements that will hint us to the queries we want to perform:

* Then they will see the locations that have comments indicated as markers on the map
  * At a glance, this says we should find ALL the comments in the system and put them on a map. This would work well when the database is small, but if people all over the country start adding comments, this will quickly get slower
  * We need to be able to think about what the map is looking at, then when the user stops dragging, we'll search that map location. However, if the user is zoomed out too far, it will pull back too many results and we should avoid that as well.
  * **Query: search for a list of markers within a Latitude Longitude box that have comments**
* Then they will see a popup with a list of public comments about that location and Then they will only see "Edit" and "Delete" icons next to their own comments and Then the user will only see the most recent 5 comments
  * These three statements go together because we need to think about extra information for each comment.
  * First, we need to pull a list of comments for a specific location. The map represents locations with a latitude / longitude, and we can capture clicks on a marker which is keyed with a latitude / longitude as well. So the query would be that given a specific latitude / longitude, return all the comments.
  * However, we need to limit the comments to the latest 5, so we need to make sure each comment has a "timestamp" when the comment was added.
  * We also need to identify the user's own comments, so we need a "userid" of the user who added the comment initially.
  * **Query: search for a list of comments for a marker given its unique identifier "id" at a specific latitude and longitude, return the most recent 5 comments**

* Then they will be allowed to enter a comment for that location
  * Queries are not just for searching for data, but also adding it. In this case, we need to be able to add a comment to a specific marker location.
  * The comment should just be a plaintext string, but needs to include the "userid" and the "timestamp".
  * **Query: add a new comment to a marker at a specific latitude and longitude, include the "comment", userid" and "timestamp"**
* Then they will be allowed to edit the specific comment
  * Queries can also be used to edit data. In this case, there is a specific comment we want to change.
  * However, to change a specific comment, we need to be able to pinpoint it's location in the data model. In software, we'll add an "id" (or unique identifier) that will allow us to point to a comment uniquely.
  * Also, we need to be sure the timestamp is updated when the comment is edited so we can show fresh comments.
  * **Query: edit a comment given its unique identifier "id", changing the comment text, and calculating a new timestamp, and keeping the userid the same.**
* Then they will be asked to confirm deletion of the comment, then it can be deleted
  * The "Delete" operation works the same as the "Edit" except the result is to remove data instead of editing it.
  * **Query: permanently delete a comment given its unique identifier "id"**

Whew! That's a lot more complicated than maybe you expected. Just thinking about a simple map with data requires multiple considerations. However, you're in luck because no one ever gets it completely right the first time through. Instead, we take a "best effort" approach and try to find a model that can fulfill these needs. Once we have it running, we can try it out and see how it behaves and performs, then make changes as we need.

### Data Structure ###

Based on the queries, I'm going to talk through how a data structure can be inferred. First, we look at the words we used in the queries and look for any nouns. At a glance, I see:

* marker
* marker id
* latitude
* longitude
* comment
* comment id
* user
* user id
* timestamp
* message

Most of these are familiar, some are a little weird: "user id", "marker id" and "comment id". When we use the word "ID" (or "id"), we are usually referring to a unique identifier in the system for that particular object. In this case, we need a unique identifer for the user and one for the comment. The user will be assigned an identifier by the authentication system (so we don't have to worry about it), but the comment and marker will need one too. Any time we need to specifically address a single item, it needs a unique identifier so there's no confusion. Luckily, the Cloud Firestore will come up with an "id" if we don't, and we can use that in this case.

Once we have the nouns figured out, we need to look at how the queries use those nouns, and think about inputs and outputs.

* Search for a list of markers within a Latitude Longitude box that have comments
  * Inputs:
    * latitude / longitude box (this is two latitude / longitude coordinates, one for the northwest corner and one for the southeast corner)
  * Outputs:
    * list of markers (to add a marker to the map though, we need a latitude / longitude, and we need an "id" so we can use it in further queries).
    * marker:
      * id
      * latitude
      * longitude
* Search for a list of comments for a marker given its unique identifier "id" at a specific latitude and longitude, return the most recent 5 comments
  * Inputs:
    * marker id
    * sort by timestamp, most recent first
    * pick top 5 items
  * Outputs:
    * list of comments (to do other actions, we'll need some more data about each comment)
    * comment:
      * id
      * message
      * timestamp
      * user id
* Add a new comment to a marker at a specific latitude and longitude, include the "comment", userid" and "timestamp"
  * Inputs:
    * marker id
    * message
    * timestamp
    * user id
  * Outputs:
    * for insertions and edits, we typically bring back the new or updated item
    * comment:
      * id
      * message
      * timestamp
      * user id
* Edit a comment given its unique identifier "id", changing the comment text, and calculating a new timestamp, and keeping the userid the same
  * Inputs:
    * comment id
    * message
    * timestamp
    * user id
  * Outputs:
    * for insertions and edits, we typically bring back the new or updated item
    * comment:
      * id
      * message
      * timestamp
      * user id
* Permanently delete a comment given its unique identifier "id"
  * Inputs:
    * comment id
  * Outputs:
    * (none)

Alright, now if you look back, you can see some natural models emerge for "comment" and "marker". These could be good candidates for our initial models. Here's my first stab at it:

* collections
  * markers
    * name (in Cloud Firestore, the id is called "name")
    * latitude
    * longitude
  * comments
    * name ("id")
    * message
    * timestamp
    * user id

It looks reasonable, but there's something missing. How do we connect the "comment" to the "marker"? The easy solution for now will be to add a "marker id" property to the "comments". This allows us to search for comments from a particular marker. So, for now, we'll settle on:

* collections
  * markers
    * name (in Cloud Firestore, the id is called "name")
    * latitude
    * longitude
  * comments
    * name ("id")
    * message
    * timestamp
    * user id
    * marker id

Now we have a data model, in the next article, we'll use that to create a database and start populating it with data.

## Today I Learned ##

Google Cloud Firestore is a "NoSQL" database that allows you to fairly loosely store your data. It expects data in collections and doesn't seem to have many constraints on it (yet). The documentation on the site is reasonable and has some video guides embedded in there as well, which is nice.

Modeling user interactions requires first thinking about your users and labeling them. This allows you to start using a common language when referring to them.

Use a "Given-When-Then" pattern for thinking about User Flows (or how you expect your users to use the system). This style is used for "Acceptance Testing" as well and can be used to create executable requirements that can be tested more easily. From the User Flows, extract the "Then" statements to think about the different types of queries that you'll need. From the queries, extract the nouns to try and identify the parts of the data model, then start to pieces toget the inputs and outputs of each query to try and determine the necessary data models. This process can take some time, and you won't be writing any code while doing it.

Finally, you'll rarely get it right the first time. Propose a design that you feel seems to meet the criteria, then try and execute. If there are issues, go back and reiterate. If you spend all your time trying to find the perfect data model, you'll end up in analysis-paralysis and never actually start building the product. However, rushing into the code without thinking about a data model is similarly a recipe for disaster. As you gain more experience, you'll learn to balance these properly and build good instincts for data modeling.