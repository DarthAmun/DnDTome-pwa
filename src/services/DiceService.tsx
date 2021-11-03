export const rollCommand = (
  commands: string,
  krit?: boolean
): { result: number; text: string; rolls: string } => {
  let result = 0;
  let text = "";

  let newCommands = "";
  commands.split(" ").forEach((command) => {
    if (/\d+/g.test(command)) {
      newCommands += command;
    } else {
      text += " " + command;
    }
  });
  newCommands = newCommands.trim();

  let rolls: string = "(`";
  newCommands.split(" ").forEach((fullCommand: string) => {
    let commandSplits: string[] = [];
    fullCommand
      .split("+")
      .map((part, i: number) => {
        if (i > 0) return "+" + part;
        return part;
      })
      .forEach((part) => {
        let split = part.split("-").map((part, i: number) => {
          if (i > 0) return "-" + part;
          return part;
        });
        commandSplits = commandSplits.concat(split);
      });

    commandSplits.forEach((command: string) => {
      let multiplier: number = 1;
      if (command.includes("d")) {
        if (!command.startsWith("d")) {
          multiplier = parseInt(command.split("d")[0]);
          command = command.split("d")[1];
        }
        command = command.replaceAll("d", "");
        if (krit) multiplier = multiplier * 2;

        if (command.includes("+")) {
          const com = command.split("+");
          for (let i = 0; i < multiplier; i++) {
            const newRoll = rollDie(parseInt(com[0]));
            result += newRoll;
            rolls += newRoll + ",";
          }
          result += parseInt(com[1]);
        } else if (command.includes("-")) {
          const com = command.split("-");
          for (let i = 0; i < multiplier; i++) {
            const newRoll = rollDie(parseInt(com[0]));
            result += newRoll;
            rolls += newRoll + ",";
          }
          result -= parseInt(com[1]);
        } else {
          for (let i = 0; i < multiplier; i++) {
            const newRoll = rollDie(parseInt(command));
            result += newRoll;
            rolls += newRoll + ",";
          }
        }
      } else {
        rolls = rolls.slice(0, -1);
        result += parseInt(command);
        rolls += "|" + command + ",";
      }
    });
    rolls = rolls.slice(0, -1);
    if (!rolls.endsWith(")")) rolls += "`)";
  });

  return { result: result, text: text, rolls: rolls };
};

export const rollDie = (size: number): number => {
  const min = 1;
  const max = size;
  let rand = Math.round(min + Math.random() * (max - min));
  return rand;
};
