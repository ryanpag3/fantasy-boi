export default class Command {
    message: any; // message object from discord.js

    constructor(message: any) {
        this.message = message;
    }

    test = () => {
        
    }

    help = () => {

    }
}