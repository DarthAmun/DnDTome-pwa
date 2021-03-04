export const sendMessage = (
  webhook: { hook: string; name: string } | undefined,
  content: string,
  avatar?: string
) => {
  if (webhook !== undefined) {
    if (content.length >= 2000) {
      content = content.substring(0, 1997) + "...";
    }

    let request = new XMLHttpRequest();
    request.open("POST", webhook.hook);
    request.setRequestHeader("Content-type", "application/json");
    let params = {
      username: webhook.name !== "" ? webhook.name : "DnDTome",
      avatar_url: avatar !== undefined ? avatar : "",
      content: content,
    };
    request.send(JSON.stringify(params));
  }
};

export const sendEmbedMessage = (
  webhook: { hook: string; name: string } | undefined,
  params: string
) => {
  if (webhook !== undefined) {
    console.log(params);
    let request = new XMLHttpRequest();
    request.open("POST", webhook.hook);
    request.setRequestHeader("Content-type", "application/json");
    request.send(params);
  }
};

export const formatDiscordText = (text: string): string => {
  if (text.includes("[[")) {
    return text.replaceAll("[[", "*").replaceAll("]]", "*");
  } else {
    return text;
  }
};
