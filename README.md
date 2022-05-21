# Used

## Technologies

-   TypeScript;
-   Typescript React;
-   Redux;
-   Styled Components;
-   Store2;
-   Figma (design);

## React Style

-   Typescript React functional components;

# Details

## Level passwords:

1 level - JustWarmingUp;

2 level - DefinitelyWarm;

3 level - ❌;

4 level - ❌;

5 level - ❌;

6 level - ❌;

## Known limitations of your solution:

5,6 level has a bad UX experience. (No optimization issues!);

## Key design decisions made, especially if you considered multiple options:

High levels got a lot of pipes. This is hard to render this huge amount of pipes. I made chunks system to split big game fields to small zones with mini-map navigation (level 6 it could be hard to navigate);

Sometimes websocket server response time is too long. I made messages queue, so the messages are sending one-by-one synchronously;

On >2 levels it takes a lot of time to solve the puzzle. If client sync every rotation with server, it will take even more time! I store every rotation in Redux store. After submitting `verify` message, I combine all the rotations and send `rotate` to server and after it - `verify`;

Also, on the bigger levels it requires a lot of rotations to be made. If player made a lot of rotations, I split `rotate` message by chunks (to fit size `< 1 MB`);

# How to launch the solution:

https://evopipes.surge.sh/
