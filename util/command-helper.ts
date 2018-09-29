export default {
    EVENTS: {
        1: 'show_scoreboard',
        2: 'show_close_scores',
        3: 'show_trophies',
        4: 'show_matchups',
        5: 'show_power_rankings'
    },
    removePrefixCommand: (messageContent: string, commandLength) => {
        let msgArr = messageContent.split(' ');
        for (let i = 0; i < commandLength; i++) {
            msgArr.shift();
        }
        return msgArr.join(' ');
    }
}