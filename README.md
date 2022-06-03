This repository is for Evolution Gaming recruitment hometask homework with the goal to make React Typescript TypeScript Javascript Canvas pipes puzzle (Pipes Puzzle) game. Task is develop a game client for a "Pipes" puzzle. The puzzle is played by connecting to the backend located at wss://hometask.eg1236.com/game-pipes/ over WebSockets and sending commands to it.

- If you really want to work in Evolution, be prepared for the technical interview. Probably you will not be asked about React, but given task could be to write some algorhitm in TypeScript. Answer fundumental questions about Node.JS. Peace!

- Manage your time and dont spend a lot to apply this job.

# Auto solver
Check repo: https://github.com/car1ot/evolution-pipes-solver

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

It is hard to render huge amount of pipes on high levels. I've coded a chunks system to split huge pipes field into a small chunks. To navigate between chunks there is a mini-map (level 6 could be hard to navigate);

Sometimes websocket server response time is too long. I've coded a queue to work with messages synchronous. Messages sent one-by-one after got response from server for previous message;

On >2 levels it takes a lot of time to solve the puzzle. If game client is going to sync every rotation with server, it will take a lot of time for user to solve the puzzle. My game client store every rotation in Redux. After user clicks verify, the game client is going to send all rotations;

Discussing about solution with rotation sync, got one more problem. On the 5, 6 levels it requires a lot of rotations to be made by user. I split `rotate` message to chunks (every chunk size is `< 1 MB`). Pipes server does not accept `rotation` in size of `> 1 MB`;

# How to launch the solution:

https://evopipes.surge.sh/
