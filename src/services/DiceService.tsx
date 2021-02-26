export const rollCommand = (commands: string, krit?: boolean): { result: number; text: string } => {
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
  return { result: result, text: text };
};

export const rollDie = (size: number): number => {
  const min = 1;
  const max = size;
  let rand = Math.round(min + Math.random() * (max - min));
  return rand;
};
