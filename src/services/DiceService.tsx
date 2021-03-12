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
  newCommands.split(" ").forEach((command: string) => {
    let multiplier: number = 1;
    if (!command.startsWith("d")) {
      multiplier = parseInt(command.split("d")[0]);
      command = command.split("d")[1];
    }
    command = command.replaceAll("d", "");
    if (krit) multiplier = multiplier * 2;

    let lastroll: number = 0;
    if (command.includes("+")) {
      const com = command.split("+");
      for (let i = 0; i < multiplier; i++) {
        result += rollDie(parseInt(com[0]));
        lastroll = result - lastroll;
        rolls += lastroll + ",";
      }
      result += parseInt(com[1]);
    } else if (command.includes("-")) {
      const com = command.split("-");
      for (let i = 0; i < multiplier; i++) {
        result += rollDie(parseInt(com[0]));
        lastroll = result - lastroll;
        rolls += lastroll + ",";
      }
      result -= parseInt(com[1]);
    } else {
      for (let i = 0; i < multiplier; i++) {
        result += rollDie(parseInt(command));
        lastroll = result - lastroll;
        rolls += lastroll + ",";
      }
    }
  });
  rolls = rolls.slice(0, -1) + "`)";
  return { result: result, text: text, rolls: rolls };
};

export const rollDie = (size: number): number => {
  const min = 1;
  const max = size;
  let rand = Math.round(min + Math.random() * (max - min));
  return rand;
};
