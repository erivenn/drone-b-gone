# drone-b-gone

This app has been submitted for Reaktor's summer trainee assignment. Errors may occur as I made it on a very short notice and between uni deadline.
Note that this is the full version of the code, warts and all, which includes error logs (currently commented out) and everything else an evaluator may need to see how development of the app went.

## What does it do?

It's a single page application displaying (fictional) names of pilots whose drones violated a (fictional) 100x100m protected area around an endangered bird's nest.
The "naughty list" itself is scrollable, and all rule-breaker data is kept on the server for approximately 10 minutes from entering the NDZ (no-drone zone).
I had to keep it pretty simple so it doesn't do much else.

## How does it work?

The page's frontend is fairly simple React, with one component loading the names and the main (App) component doing everything else.
Backend is Node.js with express, mongoose and axios libraries (and nodemon to make my own life easier). Data is also stored in a MongoDB database as it's fairly simple to use and flexible.

Accessing the Reaktor endpoints (list of all drones in a 500x500m area in XML format, and individual owner/pilot information) is taken care of in the droneapi module.
Naughty.js parses the XML data and saves only the information of drones (and pilots) breaking the law (affectionately named the 'naughty list').

The naughty list is then passed to the zipNaughty function that merges drone and owner information. This makes database saving and retrieval easy and straightforward going forward.

The root file (index.js) handles DB stuff and updates the list so that each entry displays the **closest recorded distance** to the nest.
This is done dynamically, so you can see the information change and list be updated in real-time on the page itself.

However, finding a free hosting service that isn't a headache to use (whether due to being serverless or requiring extensive config compared to Heroku that I'm more used to) has been difficult, so I apologise if some errors occur down the line.

