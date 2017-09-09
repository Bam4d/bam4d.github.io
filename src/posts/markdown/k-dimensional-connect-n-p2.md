# K Dimensional connect N - Part 2: Deep Q Learning

In my previous blog post I showed how to extend the game connect 4 into any dimensions and and any number of N-in-a-row.

Now i'm going to show how machine learning algorithms can quite easily learn and play N-dimensional versions of this game.

All of the code for these experiments can be found [here](https://github.com/Bam4d/K-dimensional-connect-N/blob/master)
Please feel free to download and try to reproduce my experiments. And of course, let me know if there are any errors!

I'm going to be using Deep-Q learning. There is no particular reason why I chose this other than just to see how it work. I may try using policy gradient methods and potentially see how they perform against each other, but that will not be included in this blog post.

Each model will be trained in an adversarial manner with a stage of pre-training:

1. Play the game against random moves over a set number of iterations.
1. Reset the epsilon (probability of picking random moves) values of both players
1. Compete the models against itself over a set number of iterations.

### Reward Scheme

If the agent wins the reward is +200, every other action in any state has 0 reward.

I did think about trying to set a negative reward for every move, so the agent is encouraged to try to win as fast as possible, however this might also cause the agent to try to lose as fast as possible to minimize the negative reward.

## Let the games begin

Lets start with some simple configurations:

### 7x6 Grid, 4-in-a-row

This is the connect-4 game that everyone knows. You can find the hyper-parameters I have used in the code on github.








## Conclusion

I couldn't quite get the hyper-parameters right to play the [perfect game of traditional 7x6 connect-4](http://tromp.github.io/c4.html)... perhaps much longer training or a different update frequency would help. 

Also perhaps having the same model play both player1 and player2 might actually be detriment to the overall performance of the model. The second player has to play a different strategy to the first one in order to win. Trying that goes beyond the scope of this blog post. 

It's hard to verify whether playing the same model against itself is infact learning any strategies, or just randomly playing. However It does seem that there appears to be an advantage for the first player in every configuration.

If anyone has any any way of knowing if the model is actually improving rather than just becoming increasingly more random, please leave me a comment, or try it out yourself and let me know.