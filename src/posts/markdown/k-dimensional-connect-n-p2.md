# K Dimensional connect N - Part 2: Deep Reinforcement Learning

In my previous blog post I showed how to extend the game connect 4 into any dimensions and and any number of N-in-a-row.

Now i'm going to show how machine learning algorithms can quite easily learn and play N-dimensional versions of this game.

All of the code for these experiments can be found [here](https://github.com/Bam4d/K-dimensional-connect-N/blob/master)
Please feel free to download and try to reproduce my experiments. And of course, let me know if there are any errors!

I'm going to be using Deep-Q learning and Policy gradient methods and see how they perform in different dimensional spaces.

Each model will be trained in an adversarial manner with a stage of pre-training:

1. Play the game against random moves over a set number of iterations.
1. Copy the pre-trained parameters to another network
1. Reset the epsilon (probability of picking random moves) values of both players
1. Compete the two models against each other over a set number of iterations.

## Reward Scheme

One thing i found that would happen quite a lot of the time is that the agent would keep choosing to play an invalid action. i.e the column of tokens was full. 
To try to discourage this, I set a negative reward and recorded that experience. The action was then sampled again from the model until a valid state was chosen. 
I hoped that this would discourage the agent from choosing bad states. I also made sure that the epsilon value was never 0, so the agent would not get stuck. 

Each move has a small negative reward. This is to encourage the agent to win as fast as possible.
Every win rewards the winning agent. There is no negative reward for losing (although this might help training).

## Let the games begin

Lets start with some simple configurations:

### 7x6 Grid, 4-in-a-row

This is the connect-4 game that everyone knows




## Conclusion

I couldn't quite get the hyper-parameters right to play the perfect game of traditional 7x6 connect-4... perhaps much longer training, different update frequency would help.  