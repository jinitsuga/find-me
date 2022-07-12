## Simple 'Hidden Objects' game around Path of Exile's unique items.

Find the listed items in an image with many of them, similar to finding Waldo's games.
Path of Exile is an ARPG game where there are thousands of unique items that you can collect, and only a small number of them are shown in the image used for this game. It's obviously more difficult to engage if you're not familiar with the game itself, but you can always google the name of the items you need to find and google them to have an image/icon for reference and try to find them in the picture!

In the project directory, you can run:

### `npm start`

Use this command to run the project locally if you want to do that for some reason. Feel free to tinker with it as well if you'd like!

**Challenges and discoveries**

My first real challenge while building this project was definitely how to tackle navigating an image and letting the app know where the mouse is on that image. After
some research, I found multiple ways of handling this, and I went with what seemed the most intuitive one, which was through the nativeEvent object generated from clicking the image element. Extracting the X and Y positions of the mouse click, then transforming these coordinates into the percentage of the image's width and height, with the help of 'event.target.width' and height. This allowed for the coordinates to always be the same regardless of screen size, as long as the image maintains its aspect ratio. By giving each item a max and min Y and X coords, I was able to form a rectangle and adapt it to the position and size of each item.

The second challenging aspect was around the 'clock' component, and all of its control flow on when to pause it, save time, keep the clock running, etc. Supporting myself on the localStorage for this was quite helpful, though it could be tweaked to make it so the time stays saved in localStorage to keep people from 'restarting' the timer by refreshing the page. Since the app is in just 'play for fun' mode I haven't done that just yet.

Something else that took some time and energy was the conditional rendering/styling of a bunch of elements, such as giving the items listed in teal to find a line-through when they've been found, showing an error message if the form to register the player on the leaderboards isn't validated, or knowing what to render depending on the state of the game (hasn't started, it's in process or it's been won). Achieved most of these by using styles in the React code and combining them with the conditions in Javascript right there, except the form validation one which was done through CSS, using the 'element:invalid' property.
I can confidently say that conditionally rendering and styling will be far easier for me in the future after this project!

Another thing that was fairly challenging was the chaining of props from a component to sometimes 2 or 3 components down the line. This is something that is better accomplished by using Redux (I think) but it's something I haven't learned yet, though it's probably the very next thing I'll be studying. I still made it work, obviously through a much more tedious and time-consuming approach and definitely not best-practice.

**Things I want to improve on/study soon**
This is the first project where I implemented any sort of backend, and I did it through Firebase, which was fairly simple but still took a certain amount of time and exploration. Database/backend is something that I definitely want to get into more, at the very least so I need to invest less time on it whenever I want to implement something as simple as I did here, and the next section in The Odin Project is all about the backend, so I'll be headed in that direction regardless!
Aside from that I'll soon be getting into these React topics:
-Redux
-Styled components
