# K Dimensional connect N - Part 1: Environment

![2 dimensional connect 4](./images/connect-4/connect-4.jpg "6x7 connect 4" =300x)

## What does this title even mean....?!
I recently became fairly obsessed with a version of the popular game of "connect-4" where instead of there being a 7x6 grid, there was a 4x4x4 grid:

![3 Dimensional connect 4](./images/connect-4/3d-connect-4.jpg "6x7 connect 4" =300x)

It's far more difficult to play, requires a fair amount of forward planning and overall is much more fun!!

So this got me thinking about some potential modifications to make the game even better:

### What if the game is *not* limited to 4 in a row?

Would the game be more interesting/harder to play if, instead of 4 in a row, we played 3 or even 5 in a row?

### What if the game is *not* limited to 2 or 3 dimensions??!!

The only two dimensional configurations I have played have been 7x6 and 4x4x4. Why not 100x100, or 4x5x9x10?

Obviously for a human player, playing in more than 3 dimensions would be a struggle and would probably require visualizing projections in terms of 2d or 3d space. 5+ would be pretty much impossible.

But we have "computers" now, so why not build it and then see if we can develop algorithms that can play in any number of dimensions?!

## Generalize

We have to create the game environment, but we want to create it so that we can configure the number of dimensions $K$ or the number of "things in a row" $N$ it would take to win.

All the code for this blog post can be found [here](https://github.com/Bam4d/K-dimensional-connect-N/blob/master/environment/env.py)

### Generalization for $N$

Firstly, we need a generic algorithm that can detect when the game is complete.

My first thoughts at solving this was that I should just try and brute force going though every line in every dimensions and every diagonal in every dimension.... However, this would be fairly computationally expensive even for small boards. This process would have to happen every time a new token has been added to the board.

In 2 dimensions: 7x6, you would have to do 6 checks horizontally $O(6\times 7)$ followed by 7 checks vertically $O(7\times 6)$ so you end up with a time complexity that is essentially $O(MN)$ for an MxN grid.

For a game environment that is any number of dimensions $K = [k_1,k_2,...,k_{d-1},k_d]$, this increases to $O(\prod_{i=0}^d k_i)$. At this point we haven't even thought about diagonals! I needed a faster way of doing this.

The second method relies on the fact that we only need to check around the position that the last token has fallen into on a set of vectors, the horizontal, vertical and diagonals.

The first step would be to work out the vectors for any game board dimensions $K$ and the second to just search along those vectors in the space around the last token. If we find 4 tokens the same along any of the vectors, the game has been won.

I will explain how to find the set of vectors for any game board $X$ with dimensions $K$ in the next section.

Lets start with an example standard 7 by 6 grid. 

$$
X = \begin{bmatrix}
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
\end{bmatrix}
$$

The vectors we will need to search across if we drop a token in will be:

* $v_1 = [0,1]$ vertical
* $v_2 = [1,0]$ horizontal
* $v_3 = [1,1]$ up and right
* $v_4 = [1,-1]$ down and right

We can use these vectors to look around our "last placed" token. Imagine our 2D game board, 1 represents player 1 and -1 represents player 2 (There's good reason for this). If we are several moves into the game, and a player drops token into a winning position, shown in red:

$$
X = \begin{bmatrix}
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 0 & 0 & 0 & 0 \\
    0 & 0 & 0 & 1 & 0 & 0 & 0 \\
    0 & 0 & \color{red}{1} & 1 & 0 & 0 & 0 \\
    0 & 1 & -1 & -1 & 0 & 0 & 0 \\
    1 & -1 & -1 & -1 & 0 & 0 & 0 \\
\end{bmatrix}
$$

The token has fallen at position [2, 2], so using our above vectors $V$ we can produce the list of coordinates we need to check for a line of 4. 

* We can find the start position of our array by *subtracting* the vector $v_k$, $N-1$ times from the position of the token: $\color{blue}{[2,2] - 3[0,1] = [2,-1]}$
    * Note here that $[2,-1]$ is not a position in the grid, so our start position is actually $\color{blue}{[2,0]}$, we will have to deal with these kinds of edge cases..
* We can find the start position of our array by *adding* the vector $v_k$, $N-1$ times to the position of the token: $\color{green}{[2,2] + 3[0,1] = [2,5]}$

Therefore:

* $v_1$ : $[\color{blue}{X[2,0]}, X[2,1], X[2,2], X[2,3], X[2,4], \color{green}{X[2,5]}] = [-1, -1, 1, 0, 0, 0] $

* $v_2$ : $[X[0,2], X[1,2], X[2,2], X[3,2], X[4,2], X[5,2]] = [0, 0, 1, 1, 0, 0]$
* $v_3$ : $[X[0,0], X[1,1], X[2,2], X[3,3], X[4,4], X[5,5]] = [1, 1, 1, 1, 0, 0]$
* $v_4$ : $[X[0,4], X[1,3], X[2,2], X[3,1], X[4,0]] = [0, 0, 1, -1, 0]$

looking at the result of following vector $v_3$, there are 4 '1's in a row. we can declare that player 1 has won! yay!

This algorithm is clearly going to be much faster because the time complexity is related to $N$ and the number of dimensions of the game board. In fact, the time complexity for finding out if a player has won is the same, regardless of the magnitude of the elements of $K$. Checking for a win in a 10000x10000 grid would be the same complexity as finding the win in the 7x6 grid.

Here is some python code for working out if we have won, given a vector, $v_i$ is given as the parameter `increment_vector`, the start and end locations are calculated, and then the algorithm follows the vector from start to end location to check if there are `self.N-1` in a row... 

```python
        def is_valid_position_state(position):
            return np.alltrue(position >= 0) \
            and np.alltrue(self.dimension_configuration - (position) > 0)


        def check_line(last_token_location, increment_vector, player):
            """
            Check the sum of a line of tokens
            """

            done = False
            iters = 0
            # Find the start point
            start_point = np.copy(last_token_location)
            while not done and iters != self.N-1:
                next_position = start_point - increment_vector
                if not is_valid_position_state(next_position):
                    done = True
                else:
                    start_point = next_position
                    iters += 1

            iters = 0
            done = False
            # Find the end point
            end_point = np.copy(last_token_location)
            while not done and iters != self.N-1:
                next_position = end_point + increment_vector
                if not is_valid_position_state(next_position):
                    done = True
                else:
                    end_point = next_position
                    iters += 1

            done = False
            # are there N in a row?
            player_token_count = 0
            check_point = np.copy(start_point)
            while not done:

                token = self.state[np.expand_dims(check_point, axis=1).tolist()]
                if token == player:
                    player_token_count += 1
                else:
                    player_token_count = 0

                if player_token_count == self.N:
                    return True

                if np.alltrue(check_point==end_point):
                    return False

                check_point += increment_vector
```

But where to these vectors come from, other than just working them out by hand.. can we calculate them for any $d$ dimensional space.. YES WE CAN!

### Generalization for $K$ 

To calculate the vectors that run across single dimensions its fairly easy, they are just going to move a single unit along a single dimension: $[1,0]$, $[0,0,0,0,0,1]$, $[0,1,0]$ etc...

The diagonals are the hard part, because not only are you finding diagonals across 2 dimensions, but in a 3 dimensional space, diagonals exist across every plane i.e $[0,1,1]$,$[1,1,0]$ and $[1,0,1]$ but they also exist across all 3 dimensions i.e $[1,1,1]$, $[-1,1,1]$, $[1,-1,1]$ and $[1,1,-1]$

So how many vectors do we have to check for 4 dimensions, or even 100 dimensions?

Lets have a look at all the combinations of possible vectors and try to find a pattern:

#### $K = 2$ (2 dimensions)

1. $[ 0, 0]$ - this vector goes nowhere we can remove it

1. $[ 0, 1]$ - our first vector

1. $[ 0,-1]$ - this is just the negative of the first one, so we dont need it

1. $[ 1, 0]$ - our second vector
1. $[ 1, 1]$ - the first diagonal vector
1. $[ 1,-1]$ - the second diagonal vector

1. $[-1, 0]$ - negative of 4.
1. $[-1, 1]$ - negative of 6.
1. $[-1,-1]$ - negative of 5.

#### $K = 3$ (3 dimensions)

1. $[ 0, 0, 0]$ - this vector goes nowhere we can remove it

1. $[ 0, 0, 1]$ - our first vector

1. $[ 0, 0,-1]$ - this is just the negative of the first one, so we dont need it

1. $[ 0, 1, 0]$ - our second vector
1. $[ 0, 1, 1]$ - the first diagonal vector
1. $[ 0, 1,-1]$ - the second diagonal vector

1. $[ 0,-1, 0]$ - negative of 4.
1. $[ 0,-1, 1]$ - negative of 6.
1. $[ 0,-1,-1]$ - negative of 5.

1. $[1, 0, 0]$ - all of these (10 to 18) are new vectors
1. $[1, 0, 1]$ 
1. $[1, 0,-1]$ 
1. $[1, 1, 0]$ 
1. $[1, 1, 1]$ 
1. $[1, 1,-1]$ 
1. $[1,-1, 0]$ 
1. $[1,-1, 1]$ 
1. $[1,-1,-1]$ 

1. $[-1, 0, 0]$ - all of these (19 to 27) are negatives of the vectors 10. to 18.
1. $[-1, 0, 1]$
1. $[-1, 0,-1]$ 
1. $[-1, 1, 0]$ 
1. $[-1, 1, 1]$ 
1. $[-1, 1,-1]$
1. $[-1,-1, 0]$ 
1. $[-1,-1, 1]$ 
1. $[-1,-1,-1]$ 

So this looks like there is a clear pattern that we can exploit to return the vectors for any set of dimensions. We can discard a large amount of possible vectors because they are just vectors in opposite directions. The more dimensions we add, the number of vectors we have to check will increase exponentially due to the large numbers of diagonals that need to be checked. For very large dimensions, this is going to be a slow and inefficient process, but still, we can easily go far beyond human comprehension and still have a playable game.

### Any value of $K$
If we enumerate the numbers 1 to $3^K$ (lets call this array $C$) and define a function $T(v)$ convert these numbers into ternary form (base 3), we get a remarkably similar pattern to the above lists, except $-1$ is replaced by $2$... we can just replace that in code...

Now we look for the patterns for finding unique vectors that are not just the opposite direction of other vectors.

Looking at the above lists of possible vectors:
when $K = 2$, the vectors we want are [T(1), T(3), T(4), T(5)]
when $K = 3$, the vectors we want are [T(1), T(3), T(4), T(5), T(9), T(10), ... , T(16), T(17)]

These fall into groups related to powers of 3.

* $C[3^0:3^0+3^0] = [1]$
* $C[3^1:3^1+3^1] = [3, 4, 5]$
* $C[3^2:3^2+3^2] = [9, 10, 11, 12, 13, 14, 15, 16, 17]$
* $C[3^3:3^3+3^3] = [27, 28, 29,...,53, 54]$
* ...
* $C[3^K:3^K+3^K] = [3^K, .... 2*3^K]$

$$
    \hat C = \bigcup_{i=0}^K C[3^i:3^i+3^i]
$$

Then we just need to apply our conversion $T$ to these values and we have our set of vectors $V$ to check for wins.

$$
    V = T(\hat C)
$$

### Some code that calculates $V$ for any $K$

```python
    def pre_calculate_check_line_vectors(self):
        """
        This algorithm pre-calculates vectors to check for contiguous lines of a players tokens
        We want to calculate this up-front (its very complex, at least O(n * 3^n) and re-use the generated list of vectors each time
        """

        def convert_to_vector(value, K):
            """
            Converts the value to base 3 and then swap "2" with "-1"
            :param value:
            :param K:
            :return:
            """
            vector = np.zeros(K)
            for k in range(0, K):
                base3_power = 3 ** ((K - 1) - k)

                a = int(value / base3_power)
                value = value % base3_power

                vector[k] = a if a < 2 else -1

            return np.array(vector, dtype=np.int64)

        vectors = []

        for i in range(0, self.K):

            take = 3 ** i
            for j in range(0, take):
                converted_vector = convert_to_vector(take + j, self.K)
                vectors.append(converted_vector)

        return vectors
```

## Putting it all together into an environment

I have been recently using the [OpenAI gym](https://gym.openai.com/) and I have tried to follow the environment interface, but have had make a few modifications (for allowing multiple players). If you have used the OpenAI Gym before, then the code should seem fairly familiar.

feel free to browse through the [environment code](https://github.com/Bam4d/K-dimensional-connect-N/blob/master/environment/env.py) if you are interested in how it all fits together

### Playing a random game

The following code is one of the tests in the environment, it simply plays a random game (2 players drop tokens in randomly) to a game board that has 5 dimensions: $(6,7,8,9,10)$ and 4-in-a-row will let the player win.

This example does not do anything clever or try to solve or even win the game, but is just an example of how interface with the environment.

```python

def test_sample_from_envs():
    """
    Play a game completely randomly
    :return:
    """
    env = KDimConnectN(dimension_configuration=(6,7,8,9,10), N=4)

    for i in range(0, iterations):

        env.reset()
        steps = 0
        done = False

        while not done:

            if steps % 2:
                player = -1
            else:
                player = 1

            # If valid move is returned as false, this means that the chosen location 
            # is "full" and a token cannot be placed there
            valid_move = False
            while not valid_move:
                action = env.sample_action()
                state, reward, done, valid_move = env.step(action, player)

            steps += 1
            if done:
                print("player %d, won after %d moves." % (player, steps))

```

## Part 2: Deep Q learning

This will be covered in my next blog post
