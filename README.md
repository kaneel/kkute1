# KKute1

/!\ Work In progress. 

An editor for my Kawai k1m because it used to exist but was not running on my laptop at all.



## Why
Because I'm a lazy musician and I cannot be bothered with editing the Kawai k1 manually, especially since a lot of its edition relies on trial n error mixing waves together, it becomes easier if you have an user interface that allows fast switching between oscillators and experiment with ring mod. 
One of the thing that makes the k1 so special is that when using the reversed ring mod, it does not just revert the modulation between s1 and s2, it copies s2 into s1 and s1 into s2, making it pretty hard to replicate with synth panel softwares.

I already spent some hours getting into the kawai sysex after messing with the Renoise "guru" tool, you can find an exemple here: https://gist.github.com/kaneel/8181692

![A screenshot][screenshot]
![An animation of the element][synthanim1]
![Some more gif][synthanim2]



## What
A standalone electron React app. CSS's able to do very fine buttons just by itself!

## When 
Most of the logic works, I just need to focus on the design of the UI.
At the moment, you can:

- select a midi port
- edit just any part of the synthesizer through sysex
- edit the name of your patch (that is _very_ important too, you don't want to end with patch1 patch2 patch3 don't you?)

## What is missing ?

- a design! 
- cool options like "reset" and "copy osc x to osc y" (this exists on hardware level and is actually pretty reproducable on software side)
- dunno? 

[screenshot]: https://i.imgur.com/oIfVMhz.png
[synthanim1]: https://i.imgur.com/BGKpdKk.gif
[synthanim2]: https://i.imgur.com/ntkdOdT.gif
