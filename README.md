# drone-b-gone

This app has been submitted for Reaktor's summer trainee assignment. Errors may occur as I made it on a very short notice and between uni deadlines.
Note that this is the full version of the code, warts and all, which includes error logs and everything else an evaluator may need to see how development of the app went (for better or worse).

See the app live at:
https://dronebgone.onrender.com

Deployed Render build repository can be found here:
https://github.com/erivenn/dbgbuild

The code is virtually the same as here, with the exception that there is only the minified build version of React frontend. 

Finding a free hosting service that wasn't a headache to use was difficult since Heroku suspended their free tier. On top of that, I ran into many errors due to the different "quirks" a lot of services had. Therefore, I has to isolate the problem into its own repository.

## What does it do?

It's a single page application displaying (fictional) names of pilots whose drones violated a (fictional) 100x100m protected area around an endangered bird's nest.
The "naughty list" itself is scrollable, and all rule-breaker data is kept on the server for approximately 10 minutes from entering the NDZ (no-drone zone).
I had to keep it pretty simple so it doesn't do much else.

## How does it work?

The page's frontend is fairly simple React, with one component loading the names and the main (App) component doing everything else.
Backend is Node.js with express, mongoose and axios libraries. Data is also stored in a MongoDB database as it's fairly simple to use and flexible.

Accessing the Reaktor endpoints (list of all drones in a 500x500m area in XML format, and individual owner/pilot information) is taken care of in the droneapi module.
Naughty.js parses the XML data and saves only the information of drones (and pilots) breaking the law (affectionately named the 'naughty list').

The naughty list is then passed to the zipNaughty function that merges drone and owner information. This makes database saving and retrieval easy and straightforward going forward.

The root file (index.js) handles DB stuff and updates the list so that each entry displays the **closest recorded distance** to the nest.
This is done dynamically, so you can see the information change and list be updated in real-time on the page itself.

