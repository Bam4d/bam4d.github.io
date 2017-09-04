# K Dimensional connect N - Part 1 


![alt text](../../images/connect-4.jpg "6x7 connect 4" =100x20)

## What does this title even mean....?!
I recently became fairly obsessed with a version of the popular game of "connect-4" where instead of there being a 7x6 grid, there was a 4x4x4 grid.

It's far more difficult to play, requires a fair amount of forward planning and overall is much more fun!!

![alt text](../../images/3d-connect-4.jpg "6x7 connect 4" =100x20)

So this got me thiking about some questions:

### What if the game is not limited to 4 in a row?

Would the game be more interesting/harder to play if, instead of 4 in a row, we played 3 or even 5 in a row?

### What if the game is not limited to 2 or 3 dimensions??!!

The only two dimensional configurations I have played have been 7x6 and 4x4x4. Why not 100x100, or 4x5x9x10?

Obviously for a human player, playing in more than 3 dimensions would be a struggle and would probably require visualizing projections in terms of 2d or 3d space. 5+ would be pretty much impossible.

But we have "computers" now so why not built it and then see if we can develop algorithms that can play in any number of dimensions?!

## Generalize

So the first step... we have to create the game environment, but we want to create it so that we can configure the number of dimensions $K$ or the number of "things in a row" $N$ it would take to win.

### Generalization for $N$

My first thoughts for this was that I should just try and brute force going though every line in every dimensions and every diagonal in every dimension.... However, this would be fairly computationally expensive even for small boards. In 2 dimensions, 7x6 you would have to do 6 checks horizontally $O(6x7)$ followed by 7 checks vertically $O(7x6)$ so you end up with a time complexity that is essentially $O(MN)$ for an MxN grid.

for a game environment that is any number of dimensions $K = [k_1,k_2,...,k_{d-1},k_d]$, this increases drastically to $O()$

### Generalization for $K$ 
