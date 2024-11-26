# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

Runtime: I noticed that my HK was pretty stagnant until it around 18 ish, where it really started to pop. I attempted to run bigger inputs, but they were taking various hours as the longest one I did was at 21 which took me a slight bit over an hour. The LS was much shorter on the other hand, which makes sense as HK looks to find the exact solution which is what LS sacrifices in order to have a much faster run time being that it does not find the exact solution. I ran each of these from 1X1 matrices all the way up to 21X21 which is when I reached the hour, I did try running for bigger matrices but it was taking various hours at that point. 

Lengths: HK was always shorter or equal than LS when it came to the length, I exhibited that it was only equal for about the first 4-5 matrices but it started to differ heavily after that. It is always less than LS due to the fact that Karp is much more optimal and looks to find the best path and LS is much more paths due to it exploring paths that may not be optimal being that it has to get more paths. 

Sources: 
https://github.com/COSC3020/tsp-comparison-Dhruv8806 - looked at this repo 


"I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."
