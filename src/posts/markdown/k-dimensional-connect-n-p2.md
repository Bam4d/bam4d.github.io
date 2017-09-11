# K Dimensional connect N - Part 2: Deep Q Learning

In my [previous blog post](https://bam4d.github.io/#/post/k-dimensional-connect-n--part-1-environment/2) I showed how to extend the game connect 4 into any dimensions and and any number of N-in-a-row. Reading the previous post first will help in understanding the background to the problem and some of the concepts I talk about in this post. 

In this post I'm going to show how machine learning algorithms can quite easily learn and play N-dimensional versions of this game.

All of the code for these experiments can be found [here](https://github.com/Bam4d/K-dimensional-connect-N/blob/master)
Please feel free to download and try to reproduce my experiments. And of course, let me know if there are any errors!

I'm going to be using Deep-Q learning. There is no particular reason why I chose this other than just to see how it work. I may try using policy gradient methods and potentially see how they perform against each other, but that will not be included in this blog post.

Each model will be trained in an adversarial manner with a stage of pre-training:

1. Play the game against random moves over a set number of iterations. (This will be referred to as the "random player" in the rest of this post.)
1. Reset the epsilon (probability of picking random moves) values of both players
1. Compete the models against itself over a set number of iterations.

### Rewards

If the agent wins the reward is +200, every other action in any state has 0 reward.

I did think about trying to set a negative reward for every move, so the agent is encouraged to try to win as fast as possible, however this might also cause the agent to try to lose as fast as possible to minimize the negative reward.

## Let the games begin

Lets start with some simple configurations, you can find the hyper-parameters I have used for the various game board configurations on github.

Each game and the models are set up im the following way, the learning rate, layers and iterations were kept constant for all experiments
```python
    game_board = [8, 7, 6, 5, 4, 3, 2]  # 7 dimensional
    to_win = 4 # connect 4
    episode_state_history_max = 100000
    episode_state_history_min = 10000
    update_period = 1000

    # The environment
    env = KDimConnectN(game_board, to_win)

    # The number of inputs the model will have
    n_inputs = np.prod(game_board)

    # The number of outputs the model will have (both the inputs and the outputs are flattened to be compatible with the feed-forward model)
    n_outputs = np.prod(game_board[1:])

    # layer configuration
    layers = [
        [512, tf.nn.sigmoid],
        [256, tf.nn.sigmoid],
        [128, tf.nn.sigmoid],
        [n_outputs, tf.nn.sigmoid]
    ]

    # learning rate
    learning_rate = 1e-3

    # number of iterations
    iterations = 2000

    # Set up our model and target networks for Deep Q learning
    model = SimpleFeedForward(n_inputs, n_outputs, layers, learning_rate, use_bias=True, use_l2 = False, name="model")
    target = SimpleFeedForward(n_inputs, n_outputs, layers, learning_rate, use_bias=True, use_l2 = False, name="target")

    # Our Deep Q network
    deep_q_network = DeepQ(gamma, model, target, episode_state_history_max=episode_state_history_max, episode_state_history_min=episode_state_history_min, batch_sz=32, update_period=update_period)

```

### 6x7 Grid, 4-in-a-row

This is the connect-4 game that everyone knows. Lets see what happens when training a Deep Q network against a random player

#### Moving average reward over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/6x7-4/deepq_vs_random_reward_p1.png" />
    <img src="./images/connect-4/6x7-4/deepq_vs_random_reward_p2.png" /> 
</div>

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/6x7-4/deepq_vs_random_wins_p1.png" />
    <img src="./images/connect-4/6x7-4/deepq_vs_random_wins_p2.png" /> 
</div>

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/6x7-4/deepq_vs_random_steps.png" />
</div>

So we Can see here that our agent is definitely learning how to play connect 4 against a random player. The average rewards and the average probability of wins graphs are pretty much identical here. So for the rest of the results I won't show both sets. 

Now we can see what happens when we take our pre-trained model and play it against itself

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Deep Q Network)

<div class="plots">
    <img src="./images/connect-4/6x7-4/deepq_vs_deepq_wins_p1.png" />
    <img src="./images/connect-4/6x7-4/deepq_vs_deepq_wins_p2.png" /> 
</div>

Interestingly there does not seem to be much difference in terms of which player wins the most, although the player that starts first has a slight advantage.

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/6x7-4/deepq_vs_deepq_steps.png" />
</div>

The algorithm clearly has to work a bit harder to win in these situations, although the maximum number of iterations is only 2000, the games appear to be getting longer and longer, suggesting that the algorithm is finding better moves to stop the other player from winning.

### 60x70 grid, 4-in-a-row

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/60x70-4/deepq_vs_random_wins_p1.png" />
    <img src="./images/connect-4/60x70-4/deepq_vs_random_wins_p2.png" /> 
</div>  

Clearly this is an easy game board to master against the random player!

In this game board, against a random player, I think that the best strategy would be to build vertical lines and take advantage of the fact that the probability of a random input selection will be $1/70$. It would be interesting to analyse this and see if that is the strategy developed. 

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/60x70-4/deepq_vs_random_steps.png" />
</div>

The number of steps this reduces to here is about 7 steps. This is the absolute minimum number of steps in the game for trying to win 4 in a row. So how will this model perform when playing against itself?

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Deep Q Network)

<div class="plots">
    <img src="./images/connect-4/60x70-4/deepq_vs_deepq_wins_p1.png" />
    <img src="./images/connect-4/60x70-4/deepq_vs_deepq_wins_p2.png" /> 
</div>

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/60x70-4/deepq_vs_deepq_steps.png" />
</div>

As expected, the number of steps jumps dramatically as the model battles to win the game. After 2000 iterations, player 1 and player 2 are winning roughly the same amount of games. It would be interesting here to run this for a significantly longer amount of time to see if player 1 gains a significant advantage for starting.

### 10x10 grid, 5-in-a-row

Getting a little bit more interesting now... still in 2 dimensions, but lets see if we can learn 5 in a row..

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/10x10-5/deepq_vs_random_wins_p1.png" />
    <img src="./images/connect-4/10x10-5/deepq_vs_random_wins_p2.png" /> 
</div>  

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/10x10-5/deepq_vs_random_steps.png" />
</div>

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Deep Q Network)

<div class="plots">
    <img src="./images/connect-4/10x10-5/deepq_vs_deepq_wins_p1.png" />
    <img src="./images/connect-4/10x10-5/deepq_vs_deepq_wins_p2.png" /> 
</div>

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/10x10-5/deepq_vs_deepq_steps.png" />
</div>

As expected, the model can learn easily against the random player, and there seems to be a small advantage for player 1 when learning against itself.

Lets add some more complexity!!

### 4x4x4 grid, 4-in-a-row

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/4x4x4-4/deepq_vs_random_wins_p1.png" />
    <img src="./images/connect-4/4x4x4-4/deepq_vs_random_wins_p2.png" /> 
</div>  

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/4x4x4-4/deepq_vs_random_steps.png" />
</div>

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Deep Q Network)

<div class="plots">
    <img src="./images/connect-4/4x4x4-4/deepq_vs_deepq_wins_p1.png" />
    <img src="./images/connect-4/4x4x4-4/deepq_vs_deepq_wins_p2.png" /> 
</div>

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/4x4x4-4/deepq_vs_deepq_steps.png" />
</div>

The model learns slightly slower but the results are still moving in the expected direction. Again, we are only running on a maxiumum of 2K games, so there is still some fluctuation in the results.

### 3x3x3x3x3 grid, 3-in-a-row

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_random_wins_p1.png" />
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_random_wins_p2.png" /> 
</div>  

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_random_steps.png" />
</div>

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Deep Q Network)

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_deepq_wins_p1.png" />
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_deepq_wins_p2.png" /> 
</div>

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_deepq_steps.png" />
</div>

5 dimensions and 3 in a row seems like an easy goal for the model! 

### 8x7x6x5x4x3x2 grid, 4-in-a-row

Now this one I find a bit hard to conceptualize. I've tried to make it very hard for the deep Q algorithm to solve by adding in some dimensions that it cannot possibly win (because they have less than 4 spaces to put tokens).

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Random)

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_random_wins_p1.png" />
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_random_wins_p2.png" /> 
</div>  

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_random_steps.png" />
</div>

#### Moving average $P(wins)$ over last 100 turns p1 (Deep Q Network) vs p2 (Deep Q Network)

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_deepq_wins_p1.png" />
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_deepq_wins_p2.png" /> 
</div>

This took at least 48 hours to train, but as usual it looks like p1 has a slight advantage over p2

#### Moving average of steps per game 

<div class="plots">
    <img src="./images/connect-4/3x3x3x3x3-3/deepq_vs_deepq_steps.png" />
</div>

The average number of steps after the model plays 2K games against itself is around 680! This is an extremely long game! The longest possible game that can be played here with no winners is $8! = 40320$ so actually $680$ is quite a short game in comparison to the total number of steps possible. Without studying the possible combinations of wins and strategies in this game board, it would be hard to understand if $680$ is optimal. My guess is that a rule-based system could  beat this AI.

## Conclusion

I think that training time and complexity is much more related to the value of $N$ rather than the value of $|K|$ or $K_i$. If $K$ 

I couldn't quite get the hyper-parameters right to play the [perfect game of traditional 7x6 connect-4](http://tromp.github.io/c4.html)... perhaps much longer training or a different update frequency would help. 

Also perhaps having the same model play both player1 and player2 might actually be detriment to the overall performance of the model. The second player has to play a different strategy to the first one in order to win. Trying that goes beyond the scope of this blog post. 

It's hard to verify whether playing the same model against itself is infact learning any strategies, or just randomly playing. However It does seem that there appears to be an advantage for the first player in every configuration.

If anyone has any any way of knowing if the model is actually improving rather than just becoming increasingly more random, please leave me a comment, or try it out yourself and let me know.


### Training and rewards

If the model chooses an invalid state, we cannot simply dismiss this attempt and then move on to the next player, the ML player HAS to make a valid move. In order to achieve this the action had to be sampled multiple times from the model until a valid state was chosen. (the environment returns a boolean to indicate whether the action is valid in the current state)

```python
while not valid_move:
    next_action = model.sample_action(state, epsilon)
    next_action_coords = get_action_coords(next_action, game_board)
    next_state, reward, done, valid_move = env.step(np.atleast_1d(next_action_coords), player)

```

This posed a problem because the model will not change it's decision unless the state changes, or the model is updated. 
Teaching the model to not play invalid moves was quite difficult. I initially tried to set a negative reward each time the player tried to play an invalid move, however this seemed to have a very negative effect on the entire training regime, and still did not seem to stop the model from attempting invalid states. 

The solution for this was to make sure that the epsilon value was never 0. This would allow a random choice to be made very rarely, which would bring the game out of the loop where the model has chosen an invalid action.

#### Tracking loss/cost function

I've been using mean squared error as the loss function and have been trying to calculate the moving of average of this over the course of training.

```python 
error = self.G - tf.reduce_sum(tf.one_hot(self.A, n_outputs) * pred, axis=1)

self.cost = tf.reduce_sum(tf.square(error))
```

Returning it from training op:

```python
self.session.run(
    (self.cost, self.train_op),
    feed_dict = {
        self.X: np.atleast_2d(state),
        self.A: np.atleast_1d(actions),
        self.G: np.atleast_1d(G)
    }
)
```

I would expect that the MSE would reduce over time, however it seems to increase as the results of the model get better. I'm not entirely sure what is going wrong here. Potentially I have misunderstood something about the Deep Q algorithm. If anyone can look at my code and leave a comment on this post, that would be very helpful.

I don't think I am calculating this incorrectly, because otherwise the model would not be training.

### Dimensionality

As more dimensions were added, the training time increased as would be expected. additionally the more tokens required to win, the game time to win increased. I tried to run 60x70 game board with 40 tokens in a row, but after 4 hours, not a single game had been won by the model or the random player. I think a different approach such as the monte-carlo approach taken to defeat the game of go would be a good candidate solution to this.
 