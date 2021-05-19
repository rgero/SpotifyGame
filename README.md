# The Spotify Game
This game is based on something I like to do when I am walking around while listening to music. I simply put a playlist on shuffle and then try to guess what artist or track is playing. I get a point if I get either right, lose one if I am wrong.

The problem with doing this manually is that I often forget the score. It'd be cool if something kept track of it for me.

That's where this could come in.

It's going to be interesting to see if I can construct or find a Spotify player that allows the user to select a playlist, or an artist, or use their currently playing spotify to do this. I think the first implementation will be mostly computer based so currently playing might not be a bad idea.

----
# Update on 2021-05-10

Using Spotify's Rest API, I was able to construct a crude example of what I'm thinking of doing.

![Image from 2021-05-10](Documents/Images/2021-05-10.png)

There are issues with this current implementation

- The user has to have Spotify open on their computer, since it's not actually being played through the browser
- There is no way currently to progress to the next song. Yet.

---
#Update on 2021-05-11

- Made it so that you can progress the song when you click right/wrong. However the image doesn't update immediately since it only checks every 5 seconds.
- Next thing to work on would be to hide the display immediately after you click right/wrong
