class Logger {
    static console(message) {
        console.log(message);
    }
}

class TimeLogger extends Logger {
    static start() {
        performance.now()
        this.console(time)
    }

    static end() {

    }
}