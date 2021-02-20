export const rollCommand = (commands: string, krit?: boolean): number => {
  let result = 0;

  let newCommands = "";
  commands
    .split(" ")
    .filter((command) => /\d+/g.test(command))
    .forEach((command) => {
      newCommands += command;
    });
  newCommands = newCommands.trim();

  newCommands.split(" ").forEach((command: string) => {
    let multiplier: number = 1;
    if (!command.startsWith("d")) {
      multiplier = parseInt(command.split("d")[0]);
      command = command.split("d")[1];
    }
    command = command.replaceAll("d", "");
    if (krit) multiplier = multiplier * 2;

    if (command.includes("+")) {
      result +=
        multiplier * rollDie(parseInt(command.split("+")[0])) + parseInt(command.split("+")[1]);
    } else if (command.includes("-")) {
      result +=
        multiplier * rollDie(parseInt(command.split("-")[0])) - parseInt(command.split("-")[1]);
    } else {
      result += multiplier * rollDie(parseInt(command));
    }
  });
  return result;
};

export const rollDie = (size: number): number => {
  const min = 1;
  const max = size;
  let rand = Math.round(min + Math.random() * (max - min));
  return rand;
};
