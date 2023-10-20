export class DiscordService {
  private readonly webhookUrl = process.env.DISCORD_WEBHOOK_URL ?? "";
  constructor() {}

  async notify(message: string) {
    const body = {
      content: message,
      //   embeds: [
      //     {
      //       image: {
      //         url: "https://www.zooplus.ie/magazine/wp-content/uploads/2021/02/valentines-day-cat-gifts-1.jpeg",
      //       },
      //     },
      //   ],
    };

    const resp = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      console.error("Error sending message to Discord");
      return false;
    }

    return true;
  }
}
