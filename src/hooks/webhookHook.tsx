export function useWebhook(): { hook: string; name: string } | undefined {
  if (localStorage.getItem("webhook") !== null) {
    let name = "DnDTome";
    if (localStorage.getItem("webhook_user") !== null)
      name = localStorage.getItem("webhook_user") + "";
    return { hook: localStorage.getItem("webhook") + "", name: name };
  } else return undefined;
}
