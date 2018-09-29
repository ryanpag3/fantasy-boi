# Fantasy Boi - An ESPN Fantasy Football Discord Bot

_Credit to [u/dtcarls](https://github.com/dtcarls) and [ff_bot](https://github.com/dtcarls/ff_bot) for inspiration for this project._

**Fantasy Boi** [`!fb`] is a native ESPN Fantasy Football discord bot that sends information to text channels.

## Scheduled Events
1. **Power Rankings** | Tues 18:30 | Displays the weekly power rankings of teams based on points and margin of victory, weighted 20/80 respectifully.
1. **Matchups** | Thurs 19:30 | Displays this week's matchups.
1. **Close Scores** | Mon 18:30 | Display games that are within 15 points of each other during Monday night game.
1. **Trophies** | Tues 7:30 | Display high score, low score, biggest win, closest win
1. **Scoreboard** | Fri,Mon,Tues 7:30 | Sun 16:00, 20:00 | Display current scores.

# Commands
**Fantasy Boi** provides a chat interface for displaying information, and enabling/disabling bot functionality per channel.

## Show League Information


## Enable/Disable Events
**Fantasy Boi** allows events to be enabled or disabled per channel.


# Developing
Contributing to **Fantasy Boi** is relatively simple.

## Environment
1. Clone the repo
2. Ensure `node` and `npm` are installed by running `node -v` and `npm -v`
3. Install dependancies with `npm i`
4. Duplicate the `config.private.template.json` file to `config.private.json` and obtain your Discord bot token using the Discord application dashboard, as well as setting your database credentials.
5. Start bot with `npm start`

**Note:** you will need to invite your bot to the server you are testing in. 