# Fantasy Boi - An ESPN Fantasy Football Discord Bot

_Credit to [u/dtcarls](https://github.com/dtcarls) and [ff_bot](https://github.com/dtcarls/ff_bot) for inspiration for this project._

**Fantasy Boi** [`!fb`] is a ESPN Fantasy Football native Discord bot that sends information to text channels. Currently, only one league per channel is allowed to avoid spam.

## Scheduled Events
1. **Scoreboard** | Fri,Mon,Tues 7:30 | Sun 16:00, 20:00 | Display current scores.
1. **Close Scores** | Mon 18:30 | Display games that are within 15 points of each other during Monday night game.
1. **Trophies** | Tues 7:30 | Display high score, low score, biggest win, closest win
1. **Matchups** | Thurs 19:30 | Displays this week's matchups.
1. **Power Rankings** | Tues 18:30 | Displays the weekly power rankings of teams based on points and margin of victory, weighted 20/80 respectifully.

# Commands
You can interact with **Fantasy Boi** to get updated information for your fantasy league.

**Scoreboard** | `!fb scores` or `!fb -s`

**Matchups** | `!fb matchups` or `!fb -m`

**Close Scores** | `!fb close-scores` or `!fb -cs`

**Trophies** | `!fb trophies` or `!fb -t`

## Show League Information
You can issue various commands to get league information responsively.

## Enable/Disable Events
**Fantasy Boi** allows events to be enabled or disabled per channel.
* **Enabling** - `!fb enable <id>` where <id> is the number of the scheduled event (above)
    * ex. `!fb enable 1` will enable scoreboard announcements.
    * You can also use the event code. (ex. `!fb enable show_scoreboard`) 
* **Disabling** - `!fb disable <id>`
    * Again, you can also use the event code such as `show_power_rankings`

# Developing
Contributing to **Fantasy Boi** is relatively simple.

## Environment
1. Clone the repo
2. Ensure `node` and `npm` are installed by running `node -v` and `npm -v`
3. Install dependancies with `npm i`
4. Duplicate the `config.private.template.json` file to `config.private.json` and obtain your Discord bot token using the Discord application dashboard, as well as setting your database credentials.
5. Start bot with `npm start`

**Note:** you will need to invite your bot to the server you are testing in. 

## Self-Hosting
// todo