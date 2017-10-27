const program = require('commander');

program.version('0.0.1');

program.registerCommand = c => {
    const theCommand = program.
        command(c.name).
        description(c.description);

    (c.options || []).forEach(o => Reflect.apply(theCommand.option, theCommand, o));

    theCommand.action(c.action);
};

module.exports = program;
